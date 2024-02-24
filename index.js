// Cadsy.js
const axios = require('axios');

const Cadsy = ({ children }) => {
  const findVideoElement = (element) => {
    if (element.id === 'cadsyvideo') {
      return element;
    }

    const children = element.children || [];

    for (let i = 0; i < children.length; i++) {
      const foundElement = findVideoElement(children[i]);
      if (foundElement) {
        return foundElement;
      }
    }

    return null;
  };

  const captureAndPostFrames = async (videoElement) => {
    if (!videoElement || videoElement.readyState !== 4) {
      return;
    }

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = videoElement.videoWidth;
    canvas.height = videoElement.videoHeight;

    ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);

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
  };

  const processChildren = (element) => {
    const children = Array.isArray(element) ? element : [element];

    return children.map(child => {
      if (child.props && child.props.id === 'cadsyvideo') {
        const videoRefCallback = videoRef => {
          if (videoRef) {
            videoRef.addEventListener('canplay', () => captureAndPostFrames(videoRef));
          }
        };

        return React.cloneElement(child, { ref: videoRefCallback });
      } else if (child.props && child.props.children) {
        const processedChild = processChildren(child.props.children);
        return React.cloneElement(child, {}, processedChild);
      }

      return child;
    });
  };

  const processedChildren = processChildren(children);

  return processedChildren;
};

module.exports = Cadsy;
