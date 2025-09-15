import React, { useRef, useState } from 'react';

// Simple WebRTC peer-to-peer video call demo
// Replace signaling logic with your own backend for production use

const SIGNAL_SERVER_URL = 'wss://your-signaling-server-url'; // Replace with your signaling server

const WebRTCVideoCall: React.FC = () => {
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const [connected, setConnected] = useState(false);
  const [ws, setWs] = useState<WebSocket | null>(null);
  const peerRef = useRef<RTCPeerConnection | null>(null);

  // Start local video and connect to signaling server
  const startCall = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    if (localVideoRef.current) {
      localVideoRef.current.srcObject = stream;
    }
    const wsConn = new WebSocket(SIGNAL_SERVER_URL);
    setWs(wsConn);
    wsConn.onopen = () => {
      setConnected(true);
      peerRef.current = new RTCPeerConnection();
      stream.getTracks().forEach(track => peerRef.current!.addTrack(track, stream));
      peerRef.current.onicecandidate = (event) => {
        if (event.candidate) {
          wsConn.send(JSON.stringify({ type: 'candidate', candidate: event.candidate }));
        }
      };
      peerRef.current.ontrack = (event) => {
        if (remoteVideoRef.current) {
          remoteVideoRef.current.srcObject = event.streams[0];
        }
      };
      wsConn.onmessage = async (msg) => {
        const data = JSON.parse(msg.data);
        if (data.type === 'offer') {
          await peerRef.current!.setRemoteDescription(new RTCSessionDescription(data.offer));
          const answer = await peerRef.current!.createAnswer();
          await peerRef.current!.setLocalDescription(answer);
          wsConn.send(JSON.stringify({ type: 'answer', answer }));
        } else if (data.type === 'answer') {
          await peerRef.current!.setRemoteDescription(new RTCSessionDescription(data.answer));
        } else if (data.type === 'candidate') {
          await peerRef.current!.addIceCandidate(new RTCIceCandidate(data.candidate));
        }
      };
    };
  };

  // Initiate call (send offer)
  const callPeer = async () => {
    if (peerRef.current && ws) {
      const offer = await peerRef.current.createOffer();
      await peerRef.current.setLocalDescription(offer);
      ws.send(JSON.stringify({ type: 'offer', offer }));
    }
  };

  return (
    <div className="relative w-full h-full flex items-center justify-center rounded-lg overflow-hidden">
      {/* Remote Video - Main screen */}
      <video
        ref={remoteVideoRef}
        autoPlay
        playsInline
        className="absolute inset-0 w-full h-full object-cover bg-black"
      />
      
      {/* Local Video - Small overlay */}
      <div className="absolute bottom-4 right-4 w-48 h-36 border-2 border-white rounded-lg overflow-hidden z-10">
        <video
          ref={localVideoRef}
          autoPlay
          playsInline
          muted
          className="w-full h-full object-cover"
        />
      </div>

      {/* Buttons to start the call */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
        {!connected ? (
          <button
            onClick={startCall}
            className="px-6 py-3 bg-blue-600 text-white rounded-full font-bold shadow-lg hover:bg-blue-700 transition-colors"
          >
            Start Call
          </button>
        ) : (
          <button
            onClick={callPeer}
            className="px-6 py-3 bg-green-600 text-white rounded-full font-bold shadow-lg hover:bg-green-700 transition-colors"
          >
            Call Peer
          </button>
        )}
      </div>
    </div>
  );
};

export default WebRTCVideoCall;