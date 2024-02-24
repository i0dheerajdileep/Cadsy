import axios from "axios";

const Cadsy = ({ children }) => {
  
  const findVideoElement = () => {
    return document.getElementById('cadsyvideo');
  };

  const captureAndPostFrames = async () => {
    // console.log(videoElement,"videoelement from capture and post frame")
    const canvas = document.createElement('canvas');
    const ready = document.getElementById("cadsyvideo")

    const videoElement = document.querySelector('#cadsyvideo video');
    // Ensure the video element is present and ready
    if (!videoElement || videoElement.readyState !== 4) {
        console.log("Video element not ready, please wait.");
        return;
    }

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

      console.log('Image posted to API 1:', response1.data);
      console.log('Image posted to API 2:', response2.data);
    } catch (error) {
      console.error('Error posting images to APIs:', error);
    }
  };

  const processVideo = () => {
    // console.log('setInterval is running...'); // Log message when setInterval runs
    const videoElement = findVideoElement();
    if (videoElement) {
        // console.log(videoElement,"videoelementttttttt")
      captureAndPostFrames();
    }
  };

  // Set interval to call processVideo every 5 seconds (5000 milliseconds)
  setInterval(processVideo, 5000);

  return children;
};

export default Cadsy
