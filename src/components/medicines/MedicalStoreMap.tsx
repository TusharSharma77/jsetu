import React from 'react';

const MedicalStoreMap: React.FC = () => {
  return (
    <div className="w-full h-[500px] rounded-lg overflow-hidden mb-8" style={{ minHeight: 300 }}>
      <iframe
        title="Nearby Medical Stores Map"
        src="https://www.google.com/maps?q=medical+store+near+me&output=embed"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
};

export default MedicalStoreMap;
