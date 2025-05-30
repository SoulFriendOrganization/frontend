import { motion } from "motion/react"

function RenderWebcam({isVideoLoading, videoError, videoRef}) {
    return (
    <motion.div 
      key="greeting"
      className="flex flex-col items-center justify-center gap-6 p-8"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 50, damping: 15 }}
    >
      <motion.div className="w-2xl h-xl rounded-lg overflow-hidden border-2 border-[#D4A017] bg-slate-100 relative">
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
          muted
          playsInline
          onLoadedMetadata={(e) => e.target.play()}
        />
      </motion.div>
    </motion.div>
    )
}

export default RenderWebcam;