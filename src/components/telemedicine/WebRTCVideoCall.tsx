// import React, { useRef, useState } from 'react';

// // Simple WebRTC peer-to-peer video call demo
// // Replace signaling logic with your own backend for production use

// const SIGNAL_SERVER_URL = 'wss://your-signaling-server-url'; // Replace with your signaling server

// const WebRTCVideoCall: React.FC = () => {
//   const localVideoRef = useRef<HTMLVideoElement>(null);
//   const remoteVideoRef = useRef<HTMLVideoElement>(null);
//   const [connected, setConnected] = useState(false);
//   const [ws, setWs] = useState<WebSocket | null>(null);
//   const peerRef = useRef<RTCPeerConnection | null>(null);

//   // Start local video and connect to signaling server
//   const startCall = async () => {
//     const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
//     if (localVideoRef.current) {
//       localVideoRef.current.srcObject = stream;
//     }
//     const wsConn = new WebSocket(SIGNAL_SERVER_URL);
//     setWs(wsConn);
//     wsConn.onopen = () => {
//       setConnected(true);
//       peerRef.current = new RTCPeerConnection();
//       stream.getTracks().forEach(track => peerRef.current!.addTrack(track, stream));
//       peerRef.current.onicecandidate = (event) => {
//         if (event.candidate) {
//           wsConn.send(JSON.stringify({ type: 'candidate', candidate: event.candidate }));
//         }
//       };
//       peerRef.current.ontrack = (event) => {
//         if (remoteVideoRef.current) {
//           remoteVideoRef.current.srcObject = event.streams[0];
//         }
//       };
//       wsConn.onmessage = async (msg) => {
//         const data = JSON.parse(msg.data);
//         if (data.type === 'offer') {
//           await peerRef.current!.setRemoteDescription(new RTCSessionDescription(data.offer));
//           const answer = await peerRef.current!.createAnswer();
//           await peerRef.current!.setLocalDescription(answer);
//           wsConn.send(JSON.stringify({ type: 'answer', answer }));
//         } else if (data.type === 'answer') {
//           await peerRef.current!.setRemoteDescription(new RTCSessionDescription(data.answer));
//         } else if (data.type === 'candidate') {
//           await peerRef.current!.addIceCandidate(new RTCIceCandidate(data.candidate));
//         }
//       };
//     };
//   };

//   // Initiate call (send offer)
//   const callPeer = async () => {
//     if (peerRef.current && ws) {
//       const offer = await peerRef.current.createOffer();
//       await peerRef.current.setLocalDescription(offer);
//       ws.send(JSON.stringify({ type: 'offer', offer }));
//     }
//   };

//   return (
//     <div className="relative w-full h-full flex items-center justify-center rounded-lg overflow-hidden">
//       {/* Remote Video - Main screen */}
//       <video
//         ref={remoteVideoRef}
//         autoPlay
//         playsInline
//         className="absolute inset-0 w-full h-full object-cover bg-black"
//       />
      
//       {/* Local Video - Small overlay */}
//       <div className="absolute bottom-4 right-4 w-48 h-36 border-2 border-white rounded-lg overflow-hidden z-10">
//         <video
//           ref={localVideoRef}
//           autoPlay
//           playsInline
//           muted
//           className="w-full h-full object-cover"
//         />
//       </div>

//       {/* Buttons to start the call */}
//       <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
//         {!connected ? (
//           <button
//             onClick={startCall}
//             className="px-6 py-3 bg-blue-600 text-white rounded-full font-bold shadow-lg hover:bg-blue-700 transition-colors"
//           >
//             Start Call
//           </button>
//         ) : (
//           <button
//             onClick={callPeer}
//             className="px-6 py-3 bg-green-600 text-white rounded-full font-bold shadow-lg hover:bg-green-700 transition-colors"
//           >
//             Call Peer
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default WebRTCVideoCall;




import React, { useRef, useState, useEffect } from 'react';

// This is the correct port for your signaling server.
// It is different from your front-end port (3000).
const SIGNAL_SERVER_URL = 'ws://localhost:3001'; 

const WebRTCVideoCall: React.FC = () => {
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const [roomId, setRoomId] = useState('');
  const [isCalling, setIsCalling] = useState(false);
  const [ws, setWs] = useState<WebSocket | null>(null);
  const peerRef = useRef<RTCPeerConnection | null>(null);

  const createPeerConnection = (stream: MediaStream) => {
    if (peerRef.current) return;

    peerRef.current = new RTCPeerConnection({
      iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
    });
    
    // Add local tracks to the peer connection
    stream.getTracks().forEach(track => peerRef.current!.addTrack(track, stream));
    

    // Handle ICE candidates: sent to the other peer via the signaling server
    peerRef.current.onicecandidate = (event) => {
      if (event.candidate && ws) {
        ws.send(JSON.stringify({ type: 'candidate', candidate: event.candidate, roomId }));
      }
    };

    // Handle incoming remote tracks: display them on the remote video element
    peerRef.current.ontrack = (event) => {
      console.log('Remote track received!');
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = event.streams[0];
      }
    };
  };

  const startCall = async () => {
    if (!roomId) {
      alert('Please enter a room ID.');
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }

      setIsCalling(true);
      const wsConn = new WebSocket(SIGNAL_SERVER_URL);
      setWs(wsConn);

      wsConn.onopen = () => {
        console.log('Connected to signaling server');
        wsConn.send(JSON.stringify({ type: 'join', roomId }));
      };

      wsConn.onmessage = async (msg) => {
        const data = JSON.parse(msg.data);

        if (data.roomId && data.roomId !== roomId) return;

        if (data.type === 'ready') {
          createPeerConnection(stream);
          const offer = await peerRef.current!.createOffer();
          await peerRef.current!.setLocalDescription(offer);
          wsConn.send(JSON.stringify({ type: 'offer', offer, roomId }));
        } else if (data.type === 'offer') {
          if (!peerRef.current) createPeerConnection(stream);
          await peerRef.current!.setRemoteDescription(new RTCSessionDescription(data.offer));
          const answer = await peerRef.current!.createAnswer();
          await peerRef.current!.setLocalDescription(answer);
          wsConn.send(JSON.stringify({ type: 'answer', answer, roomId }));
        } else if (data.type === 'answer') {
          await peerRef.current!.setRemoteDescription(new RTCSessionDescription(data.answer));
        } else if (data.type === 'candidate') {
          try {
            await peerRef.current!.addIceCandidate(new RTCIceCandidate(data.candidate));
          } catch (e) {
            console.error('Error adding received ICE candidate', e);
          }
        }
      };

    } catch (error) {
      console.error("Error starting call:", error);
      setIsCalling(false);
    }
  };

  return (
    <div className="relative w-full h-full flex items-center justify-center rounded-lg overflow-hidden">
      <video ref={remoteVideoRef} autoPlay playsInline className="absolute inset-0 w-full h-full object-cover bg-black" />
      
      <div className="absolute bottom-4 right-4 w-48 h-36 border-2 border-white rounded-lg overflow-hidden z-10">
        <video ref={localVideoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
      </div>

      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 space-y-4 text-center">
        {!isCalling ? (
          <div className="flex flex-col items-center">
            <input
              type="text"
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
              placeholder="Enter a room ID"
              className="px-4 py-2 text-sm rounded-md border dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white mb-2"
            />
            <button
              onClick={startCall}
              className="px-6 py-3 bg-blue-600 text-white rounded-full font-bold shadow-lg hover:bg-blue-700 transition-colors"
            >
              Start Call
            </button>
          </div>
        ) : (
          <p className="text-white text-lg font-bold">Waiting for peer to join room...</p>
        )}
      </div>
    </div>
  );
};

export default WebRTCVideoCall;