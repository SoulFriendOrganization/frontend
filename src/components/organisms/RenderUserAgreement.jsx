import { motion } from "motion/react"
import {StreamText} from "../atoms";

function RenderUserAgreement({name, setIsUserAgreed}) {
    return (  
    <motion.div 
      key="agreement-form"
      className="flex flex-col items-center justify-center gap-6 p-8"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 50, damping: 15 }}
    >      
    <motion.label 
        className="font-bold text-4xl"
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