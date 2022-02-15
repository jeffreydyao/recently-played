import { motion } from "framer-motion";


export default function Sandbox() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="w-3/4 h-2 rounded-full bg-emerald-700 overflow-clip">
        <motion.div animate={{scaleX: 1}} initial={{scaleX: 0, originX:0}} transition={{duration: 10, ease: "linear"}} >
          <div className="w-full h-2 bg-emerald-400" /> 

        </motion.div>
      </div>
    </div>
  )
}