/* eslint-disable no-unused-vars */
import { motion } from "motion/react"
import StreamText from "./StreamText"


function RenderUserAgreement({name, setIsUserAgreed}) {
    return (  
    <motion.div 
      key="agreement-form"
      className="flex flex-col items-center justify-center gap-4 sm:gap-6 p-4 sm:p-6 md:p-8 w-full max-w-md mx-auto"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 50, damping: 15 }}
    >      
    <motion.label 
        className="font-bold text-xl sm:text-2xl md:text-4xl text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <StreamText text={`Selamat datang, ${name}. yuk kita lihat mood kamu hari ini😊.`} speed={50} autoNext={true} setNext={setIsUserAgreed}/>
      </motion.label>
    </motion.div>
  
    )
}

export default RenderUserAgreement;