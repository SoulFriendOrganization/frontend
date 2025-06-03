// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { RenderWebcam, RenderChatbot } from "../components";
import cv from "@techstark/opencv-js";
import { Link } from "react-router";
import { IoReturnDownBack } from "react-icons/io5";

window.cv = cv;

function MoodPage() {
  const [isVideoLoading, setIsVideoLoading] = useState(false);
  const [videoError, setVideoError] = useState(null);
  const [imageSent, setImageSent] = useState(false);
  const videoRef = useRef(null);
  const [userExpression, setUserExpression] = useState("");  const [name, setName] = useState("Teman");
  const [userId, setUserId] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const storedName = localStorage.getItem("userName");
    const storedUserId = localStorage.getItem("userId");
    
    if (storedName) {
      setName(storedName);
    }
    
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  const currentScreen = errorMessage ? "error" : (imageSent && userExpression ? "chatbot" : "webcam");

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
          console.error("Error accessing webcam:", error);
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
  return (    
  <div className="w-full min-h-svh bg-[#FFEBC8] flex flex-col items-center justify-center overflow-hidden">
      <Link to="/home">
        <IoReturnDownBack className="absolute top-10 left-10 cursor-pointer w-10 h-10"/>
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
            />
          </motion.div>
        )}          {currentScreen === "chatbot" && (
          <RenderChatbot 
            name={name}
            userId={userId}
            userExpression={userExpression}
            isTrial={false}
          />
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