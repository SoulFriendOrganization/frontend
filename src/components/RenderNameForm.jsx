/* eslint-disable no-unused-vars */
import { motion } from "motion/react"
import StreamText from "./StreamText"
import { IoEnterOutline } from "react-icons/io5";

function RenderNameForm({handleSubmit, setName, name}) {
    return (
    <motion.form 
      key="name-form"
      className="flex flex-col items-center justify-center gap-4 sm:gap-6 p-4 sm:p-6 md:p-8 w-full max-w-md"
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      transition={{ type: "spring", stiffness: 50, damping: 15, duration: 0.8 }}
      onSubmit={handleSubmit}
    >            
      <motion.label 
        className="font-bold text-2xl sm:text-3xl md:text-4xl text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <StreamText text="Halo, Siapa Namamu?" speed={50} />
      </motion.label>
      
      <motion.div 
        className="flex items-center w-full relative"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <input 
          type="text" 
          className="ring-2 ring-[#D4A017] rounded-full w-full focus:outline-none px-3 sm:px-4 md:px-5 py-2 sm:py-3 pr-12 sm:pr-14 text-sm sm:text-base md:text-lg"
          placeholder="Ketik nama Anda di sini..."
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button 
          type="submit"
          className="absolute right-1 bg-[#D4A017] text-white p-2 sm:p-3 rounded-full hover:bg-[#C39316] transition-colors cursor-pointer"
        >
          <IoEnterOutline className="w-4 h-4 sm:w-5 sm:h-5 md:w-[22px] md:h-[22px]" />
        </button>
      </motion.div>
    </motion.form>
    )
}

export default RenderNameForm;