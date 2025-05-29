import { motion, AnimatePresence } from "motion/react"
import { IoEnterOutline } from "react-icons/io5";
import { useState, useRef, useEffect } from "react";
import { StreamText } from "../components/atoms";

function HomePage() {
  // State declarations
  const [name, setName] = useState("");
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [isUserAgreed, setIsUserAgreed] = useState(false);
  const [isVideoLoading, setIsVideoLoading] = useState(false);
  const [videoError, setVideoError] = useState(null);
  const videoRef = useRef(null);
  
  // Create a variable to manage rendering states
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

  const renderNameForm = () => (
    <motion.form 
      key="name-form"
      className="flex flex-col items-center justify-center gap-6 p-8"
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      transition={{ type: "spring", stiffness: 50, damping: 15, duration: 0.8 }}
      onSubmit={handleSubmit}
    >            
      <motion.label 
        className="font-bold text-4xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <StreamText text="Halo, Siapa Namamu?" speed={50} />
      </motion.label>
      
      <motion.div 
        className="flex items-center w-xl relative"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <input 
          type="text" 
          className="ring-2 ring-[#D4A017] rounded-full w-full focus:outline-none px-5 py-3 pr-14 text-lg"
          placeholder="Ketik nama Anda di sini..."
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button 
          type="submit"
          className="absolute right-1 bg-[#D4A017] text-white p-3 rounded-full hover:bg-[#C39316] transition-colors cursor-pointer"
        >
          <IoEnterOutline size={22} />
        </button>
      </motion.div>
    </motion.form>
  );

  const renderUserAgreement = () => (
    <motion.div 
      key="agreement-form"
      className="flex flex-col items-center justify-center gap-6 p-8"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 50, damping: 15 }}
    >
      <p>test</p>
      <motion.button 
        className="bg-[#D4A017] text-white px-4 py-2 rounded-full hover:bg-[#C39316] transition-colors"
        onClick={() => setIsUserAgreed(true)}
      >
        Submit
      </motion.button>
    </motion.div>
  );

  const renderWebcam = () => (
    <motion.div 
      key="greeting"
      className="flex flex-col items-center justify-center gap-6 p-8"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 50, damping: 15 }}
    >
      <motion.h2 
        className="font-bold text-4xl text-[#D4A017]"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        Hai, {name}!
      </motion.h2>
      <motion.div className="w-60 h-60 rounded-lg overflow-hidden border-2 border-[#D4A017] bg-slate-100 relative">
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
        
        <video 
          ref={videoRef} 
          className="w-full h-full object-cover" 
          autoPlay 
          playsInline
          onLoadedMetadata={(e) => e.target.play()}
        />
      </motion.div>
      <motion.button
        className="mt-2 px-6 py-2 bg-[#D4A017] text-white rounded-full hover:bg-[#C39316] transition-colors"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        onClick={() => {
          setIsFormSubmitted(false);
          setIsUserAgreed(false);
        }}
      >
        Kembali
      </motion.button>
    </motion.div>
  );

  return (    
    <div className="w-full min-h-svh bg-[#FFEBC8] flex flex-col items-center justify-center overflow-hidden">
      <AnimatePresence mode="wait">
        {currentScreen === 'nameForm' && renderNameForm()}
        {currentScreen === 'userAgreement' && renderUserAgreement()}
        {currentScreen === 'webcam' && renderWebcam()}
      </AnimatePresence>
    </div>
  );    
}

export default HomePage;