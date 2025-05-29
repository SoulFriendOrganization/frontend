import { motion, AnimatePresence } from "motion/react"
import { IoEnterOutline } from "react-icons/io5";
import { useState } from "react";
import { FaSmile } from "react-icons/fa";

function HomePage() {
  const [name, setName] = useState("");
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      setIsFormSubmitted(true);
    }
  };

  return (    
    <div className="w-full min-h-svh bg-[#FFEBC8] flex flex-col items-center justify-center overflow-hidden">
      <AnimatePresence mode="wait">
        {!isFormSubmitted ? (
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
              Halo, Siapa Namamu?
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
                className="absolute right-1 bg-[#D4A017] text-white p-3 rounded-full hover:bg-[#C39316] transition-colors"
              >
                <IoEnterOutline size={22} />
              </button>
            </motion.div>
          </motion.form>
        ) : (
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
            
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
            >
              <FaSmile size={60} className="text-[#D4A017]" />
            </motion.div>
            
            <motion.button
              className="mt-2 px-6 py-2 bg-[#D4A017] text-white rounded-full hover:bg-[#C39316] transition-colors"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              onClick={() => setIsFormSubmitted(false)}
            >
              Kembali
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );    
}

export default HomePage;