import React, { useEffect, useRef } from 'react';

const Cadsy = ({ children }) => {
  const videoRef = useRef(null);

  const captureAndPostFrames = async () => {
    if (videoRef.current && videoRef.current.readyState === 4) {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;

      ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

      const base64Image = canvas.toDataURL('image/jpeg');

      try {
        const response = await fetch('YOUR_API_ENDPOINT', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ image: base64Image }),
        });

        console.log('Image posted to API:', response);
      } catch (error) {
        console.error('Error posting image to API:', error);
      }
    }
  };

  useEffect(() => {
    captureAndPostFrames();
  }, [children]);

  return (
    <div>
      {React.Children.map(children, child => {
        if (child.props && child.props.id === 'video') {
          return React.cloneElement(child, { ref: videoRef });
        }
        return child;
      })}
    </div>
  );
};

export default Cadsy;
