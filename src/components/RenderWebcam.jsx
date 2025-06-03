// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import { loadHaarFaceModels, detectHaarFace } from "../utils";
import { checkMoodTrialService, checkMoodService } from "../services";

const FRAMES_REQUIRED = 10;
const CAPTURE_INTERVAL_MS = 100;

function RenderWebcam({ 
  isVideoLoading, 
  videoError, 
  videoRef, 
  imageSent, 
  setImageSent, 
  setUserExpression,
  pageType = "overview",
  setErrorMessage
}) {
  const [faceDetectedFrameCount, setFaceDetectedFrameCount] = useState(0);

  useEffect(() => {
    loadHaarFaceModels();
  }, []);
  
  const sendImageToBackend = useCallback(async (imageData) => {
    if (pageType === "mood") {
      await checkMoodService(imageData, setUserExpression, setErrorMessage);
    } else {
      await checkMoodTrialService(imageData, setUserExpression);
    }
  }, [pageType, setUserExpression, setErrorMessage]);

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
      const canvas = document.createElement("canvas");
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      canvas.getContext("2d").drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

      img = window.cv.imread(canvas);
      if (!img || img.empty()) {
        return;
      }

      haarFaces = detectHaarFace(img);
      const facesDetected = haarFaces.faces && haarFaces.faces.size() > 0;

      if (facesDetected && !imageSent) {
        setFaceDetectedFrameCount((prev) => {
          const newCount = prev + 1;
          if (newCount >= FRAMES_REQUIRED) {
            const imageData = canvas.toDataURL("image/jpeg");
            setTimeout(() => {
              setImageSent(true);
              sendImageToBackend(imageData);
            }, 0);
            return 0;
          }
          return newCount;
        });
      } else if (!facesDetected && faceDetectedFrameCount > 0) {
        setTimeout(() => {
          setFaceDetectedFrameCount(0);
        }, 0);
      }
    } catch (error) {
      console.error("Error processing frame:", error);
    } finally {
      if (img) img.delete();
      if (haarFaces) {
        if (haarFaces.image) haarFaces.image.delete();
        if (haarFaces.faces) haarFaces.faces.delete();
      }
    }
  }, [videoRef, imageSent, faceDetectedFrameCount, setImageSent, sendImageToBackend]);

  useEffect(() => {
    let captureInterval = null;

    if (!imageSent) {
      captureInterval = setInterval(processFrame, CAPTURE_INTERVAL_MS);
    }

    return () => {
      if (captureInterval) clearInterval(captureInterval);
    };
  }, [imageSent, processFrame]);
  
  useEffect(() => {
    const stopCamera = () => {
      if (videoRef.current?.srcObject) {
        const stream = videoRef.current.srcObject;
        const tracks = stream.getTracks();
        tracks.forEach(track => {
          track.stop();
        });
        videoRef.current.srcObject = null;
      }
    };

    if (imageSent) {
      stopCamera();
    }

    return () => {
      stopCamera();
    };
  }, [imageSent, videoRef]);
  return (
    <motion.div
      key="webcam"
      className="flex flex-col items-center justify-center gap-4 sm:gap-6 p-4 sm:p-6 md:p-8 w-full"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 50, damping: 15 }}
    >
      <motion.div className="w-full max-w-md sm:max-w-lg md:max-w-xl h-[250px] sm:h-[300px] md:h-[350px] rounded-lg overflow-hidden relative">
        {isVideoLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-slate-100/80 z-10">
            <div className="w-6 h-6 sm:w-8 sm:h-8 border-3 sm:border-4 border-[#D4A017] border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
        {videoError && (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
            <p className="text-red-500 text-sm sm:text-base">{videoError}</p>
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