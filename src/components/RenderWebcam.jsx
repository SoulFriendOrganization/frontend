// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import { loadHaarFaceModels, detectHaarFace } from "../utils";

const FRAMES_REQUIRED = 10;
const CAPTURE_INTERVAL_MS = 100;

function RenderWebcam({ isVideoLoading, videoError, videoRef, imageSent, setImageSent }) {
  const [faceDetectedFrameCount, setFaceDetectedFrameCount] = useState(0);

  // Load Haar face detection models on component mount
  useEffect(() => {
    loadHaarFaceModels();
  }, []);  // Send captured image to backend (placeholder)
  const sendImageToBackend = async (imageData) => {
    console.log("Sending image to backend:", imageData.substring(0, 50));
  };

  // Process video frames to detect faces
  const processFrame = useCallback(() => {
    if (
      !videoRef.current ||
      videoRef.current.readyState < 2 ||
      videoRef.current.videoWidth === 0 ||
      videoRef.current.videoHeight === 0 ||
      imageSent
    ) {
      return;
    }

    let img = null;
    let haarFaces = null;

    try {
      // Capture frame from video
      const canvas = document.createElement("canvas");
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      canvas.getContext("2d").drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

      img = window.cv.imread(canvas);
      if (!img || img.empty()) {
        return;
      }

      // Detect faces
      haarFaces = detectHaarFace(img);
      const facesDetected = haarFaces.faces && haarFaces.faces.size() > 0;

      if (facesDetected && !imageSent) {
        setFaceDetectedFrameCount((prev) => {
          const newCount = prev + 1;
          if (newCount >= FRAMES_REQUIRED) {
            const imageData = canvas.toDataURL("image/jpeg");
            // Move setImageSent outside to avoid state updates during render
            setTimeout(() => {
              setImageSent(true);
              sendImageToBackend(imageData);
            }, 0);
            return 0;
          }
          return newCount;
        });
      } else if (!facesDetected && faceDetectedFrameCount > 0) {
        // Use setTimeout to avoid state updates during render
        setTimeout(() => {
          setFaceDetectedFrameCount(0);
        }, 0);
      }
    } catch (error) {
      console.error("Error processing frame:", error);
    } finally {
      // Clean up OpenCV resources
      if (img) img.delete();
      if (haarFaces) {
        if (haarFaces.image) haarFaces.image.delete();
        if (haarFaces.faces) haarFaces.faces.delete();
      }
    }
  }, [videoRef, imageSent, faceDetectedFrameCount, setImageSent]);
  // Process frames at regular intervals until image is sent
  useEffect(() => {
    let captureInterval = null;

    if (!imageSent) {
      captureInterval = setInterval(processFrame, CAPTURE_INTERVAL_MS);
    }

    return () => {
      if (captureInterval) clearInterval(captureInterval);
    };
  }, [imageSent, processFrame]);

  // Stop video stream when image is sent
  useEffect(() => {
    if (imageSent && videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject;
      stream.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
  }, [imageSent, videoRef]);

  return (
    <motion.div
      key="webcam"
      className="flex flex-col items-center justify-center gap-6 p-8"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 50, damping: 15 }}
    >
      <motion.div className="w-2xl h-xl rounded-lg overflow-hidden border-2 border-[#D4A017] bg-slate-100 relative">
        {isVideoLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-slate-100/80 z-10">
            <div className="w-8 h-8 border-4 border-[#D4A017] border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
        {videoError && (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
            <p className="text-red-500">{videoError}</p>
          </div>
        )}
        {!imageSent && (
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            autoPlay
            muted
            playsInline
          />
        )}
      </motion.div>
    </motion.div>
  );
}

export default RenderWebcam;