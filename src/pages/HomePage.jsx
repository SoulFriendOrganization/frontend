import { motion, AnimatePresence } from "motion/react"
import { useState, useRef, useEffect } from "react";
import { RenderNameForm, RenderUserAgreement, RenderWebcam } from "../components/organisms";

function HomePage() {
  const [name, setName] = useState("");
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [isUserAgreed, setIsUserAgreed] = useState(false);
  const [isVideoLoading, setIsVideoLoading] = useState(false);
  const [videoError, setVideoError] = useState(null);
  const videoRef = useRef(null);

  

  const currentScreen = !isFormSubmitted ? 'nameForm' : 
                        (isFormSubmitted && !isUserAgreed) ? 'userAgreement' : 
                        (isUserAgreed ? 'webcam' : 'nameForm');

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
        
        navigator.mediaDevices.getUserMedia({video: true, audio: false})
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
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [isUserAgreed]); 

  return (    
    <div className="w-full min-h-svh bg-[#FFEBC8] flex flex-col items-center justify-center overflow-hidden">
      <AnimatePresence mode="wait">
        {currentScreen === 'nameForm' && <RenderNameForm handleSubmit={handleSubmit} setName={setName} name={name}/>}
        {currentScreen === 'userAgreement' && <RenderUserAgreement name={name} setIsUserAgreed={setIsUserAgreed}/>}
        {currentScreen === 'webcam' && <RenderWebcam isVideoLoading={isVideoLoading} videoError={videoError} videoRef={videoRef}/>}
      </AnimatePresence>
    </div>
  );    
}

export default HomePage;