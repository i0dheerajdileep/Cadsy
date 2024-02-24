import React, { useEffect, useRef } from 'react';
import axios from 'axios';

const Cadsy = ({ children }) => {
  const videoRef = useRef(null);

  const captureAndPostFrames = async () => {
    if (videoRef.current && videoRef.current.readyState === 4) {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;

      ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

      const image = canvas.toDataURL('image/jpeg');

      try {
        // Perform two API requests concurrently
        const [response1, response2] = await Promise.all([
            axios({
                method: "POST",
                url: "https://detect.roboflow.com/boobsdetector/1",
                params: {
                    api_key: 'sZFjx8Fimj7ZtIWfDnwo'
                },
                data: image,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            }),
            axios({
                method: "POST",
                url: "https://detect.roboflow.com/dickdetector/3",
                params: {
                    api_key: '4WvQYKCiiFjRFkdUHdWw'
                },
                data: image,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            }),
        ]);

        console.log('Image posted to API 1:', response1);
        console.log('Image posted to API 2:', response2);
      } catch (error) {
        console.error('Error posting images to APIs:', error);
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
