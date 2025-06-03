// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { RenderNameForm, RenderUserAgreement, RenderWebcam, RenderChatbot } from "../components";
import cv from "@techstark/opencv-js";
import { Link } from "react-router";
import { IoReturnDownBack } from "react-icons/io5";

window.cv = cv;

function OverviewPage() {
  const [name, setName] = useState("");
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [isUserAgreed, setIsUserAgreed] = useState(false);
  const [isVideoLoading, setIsVideoLoading] = useState(false);
  const [videoError, setVideoError] = useState(null);
  const [imageSent, setImageSent] = useState(false);
  const videoRef = useRef(null);
  const [userExpression, setUserExpression] = useState("");

  const currentScreen = !isFormSubmitted
    ? "nameForm"
    : !isUserAgreed
    ? "userAgreement"
    : imageSent && userExpression
    ? "chatbot"
    : "webcam";

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      setIsFormSubmitted(true);
    }
  };

  useEffect(() => {
    let stream = null;

    if (isUserAgreed) {
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
      }, 2000);
    }

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [isUserAgreed]);  return (
    <div className="w-full min-h-svh bg-[#FFEBC8] flex flex-col items-center justify-center overflow-hidden px-4 sm:px-6 md:px-8">
      <Link to="/">
        <IoReturnDownBack className="absolute top-4 sm:top-6 md:top-10 left-4 sm:left-6 md:left-10 cursor-pointer w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10"/>
      </Link>
      <AnimatePresence mode="wait">
        {currentScreen === "nameForm" && (
          <RenderNameForm handleSubmit={handleSubmit} setName={setName} name={name} />
        )}
        {currentScreen === "userAgreement" && (
          <RenderUserAgreement name={name} setIsUserAgreed={setIsUserAgreed} />
        )}
        {currentScreen === "webcam" && (          
          <RenderWebcam
            isVideoLoading={isVideoLoading}
            videoError={videoError}
            videoRef={videoRef}
            imageSent={imageSent}
            setImageSent={setImageSent}
            setUserExpression={setUserExpression}
            pageType="overview"
          />
        )}        
        {currentScreen === "chatbot" && (
          <RenderChatbot 
            name={name}
            userExpression={userExpression}
            isTrial={true}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default OverviewPage;