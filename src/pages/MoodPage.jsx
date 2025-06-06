/* eslint-disable no-unused-vars */
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { RenderWebcam } from "../components";
import cv from "@techstark/opencv-js";
import { Link, useNavigate } from "react-router";
import { IoReturnDownBack } from "react-icons/io5";
import useMoodStore from "../utils/moodStore";

window.cv = cv;

function MoodPage() {
  const navigate = useNavigate();
  const [isVideoLoading, setIsVideoLoading] = useState(false);
  const [videoError, setVideoError] = useState(null);
  const [imageSent, setImageSent] = useState(false);
  const videoRef = useRef(null);
  const [userExpression, setUserExpression] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const setGlobalUserExpression = useMoodStore((state) => state.setUserExpression);
  
  const currentScreen = errorMessage ? "error" : "webcam";
  useEffect(() => {
    let stream = null;

    setTimeout(() => {
      setIsVideoLoading(true);
      setVideoError(null);

      navigator.mediaDevices.getUserMedia({ video: true, audio: false })
        .then((mediaStream) => {
          stream = mediaStream;
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        })
        .catch((error) => {
          setVideoError("Tidak dapat mengakses webcam. Pastikan izin kamera diaktifkan.");
        })
        .finally(() => {
          setIsVideoLoading(false);
        });
    }, 1000);

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);    
  
  useEffect(() => {
    if (imageSent && userExpression) {
      navigate('/chatbot');
    }
  }, [imageSent, userExpression, navigate]);

  return (    
  <div className="w-full min-h-svh bg-[#FFEBC8] flex flex-col items-center justify-center overflow-hidden">
      <Link to="/home">
          <IoReturnDownBack className="absolute top-4 sm:top-6 md:top-10 left-4 sm:left-6 md:left-10 cursor-pointer w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10"/>
      </Link> 
      <AnimatePresence mode="wait">
        {currentScreen === "webcam" && (
          <motion.div
            key="webcam-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center gap-4 p-4"
          >
            <h2 className="text-2xl font-bold text-[#D4A017] mb-2">Deteksi Mood</h2>
            <p className="text-center mb-4">Silakan lihat ke kamera untuk mendeteksi mood Anda</p>            
            <RenderWebcam
              isVideoLoading={isVideoLoading}
              videoError={videoError}
              videoRef={videoRef}
              imageSent={imageSent}
              setImageSent={setImageSent}
              setUserExpression={setUserExpression}
              pageType="mood"
              setErrorMessage={setErrorMessage}
              setGlobalUserExpression={setGlobalUserExpression}
            />
          </motion.div>
        )}
        {currentScreen === "error" && (
          <motion.div
            key="error-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center gap-4 p-8 max-w-md"
          >
            <div className="text-center p-6">
              <h2 className="text-2xl font-bold text-[#D4A017] mb-4">Informasi</h2>
              <p className="text-lg mb-6">{errorMessage}</p>
              <Link to="/home">
                <button className="px-6 py-2 bg-[#D4A017] text-white rounded-full hover:bg-[#C09016] transition-colors cursor-pointer">
                  Kembali ke Beranda
                </button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default MoodPage;