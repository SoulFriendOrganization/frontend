import React, { useEffect, useRef } from "react";
import cv from "@techstark/opencv-js";
import { loadHaarFaceModels, detectHaarFace } from "../utils/detectHaarFace";

window.cv = cv;

const TestPage = () => {
  const haarFaceImgRef = useRef(null);
    const videoRef = useRef(null);

  useEffect(() => {
    loadHaarFaceModels();
  }, []);

  const processImage = (videoElement) => {
    try {
      // Create a canvas to capture the current video frame
      const cap = document.createElement('canvas');
      cap.width = videoElement.videoWidth;
      cap.height = videoElement.videoHeight;
      const ctx = cap.getContext('2d');
      
      ctx.drawImage(videoElement, 0, 0, cap.width, cap.height);
      
      const img = cv.imread(cap);

      // detect faces using Haar-cascade Detection
      const haarFaces = detectHaarFace(img);
      cv.imshow(haarFaceImgRef.current, haarFaces);

      haarFaces.delete();
    } catch (error) {
      console.error("Error processing image:", error);
    }
  };useEffect(() => {
  let stream = null;
  let captureInterval = null;
  
  const startWebcam = async () => {
    try {
      stream = await navigator.mediaDevices.getUserMedia({video: true, audio: false});
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => {
          // Start processing video frames after the video is loaded
          captureInterval = setInterval(() => {
            if (videoRef.current) {
              processImage(videoRef.current);
            }
          }, 100); // Process frame every 100ms
        };
      }
    } catch (error) {
      console.error("Error accessing webcam:", error);
    }
  };

  startWebcam();
      
  return () => {
    if (captureInterval) {
      clearInterval(captureInterval);
    }
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }
  };
  }, []); 
  return (
    <div>
      <div style={{ marginTop: "30px" }}>        
        <video 
          ref={videoRef} 
          width="640"
          height="480"
          className="w-full h-full object-cover" 
          style={{ position: 'absolute', opacity: 0, pointerEvents: 'none' }}
          autoPlay 
          muted
          playsInline
        />
        <div className="image-card" style={{ marginTop: "20px" }}>
          <div style={{ margin: "10px" }}>
            Haar-cascade Face Detection Result
          </div>
          <canvas ref={haarFaceImgRef} />
        </div>
      </div>
    </div>
  );
};

export default TestPage;