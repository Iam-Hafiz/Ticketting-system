"use client"
import { motion } from "framer-motion"
import { animationsProps } from "../_lib/animations"

export default function Note() {
  return (
    <motion.div className=" col-span-12 col-start-5 col-end-9 p-4 bg-slate-200 dark:bg-slate-900 mb-4 shadow-xl"
    initial={animationsProps.initial}
    animate={animationsProps.animate}
    transition={{ delay: 2, duration: 1.5}}
    >
        <h2 className=" font-bold text-red-600">NOTE</h2>
        <p className=" pl-1">Hey there, you can still login as a guest if you don't want to create your own account, here are the credentials email: <small>judy.ferguson@example.com</small>, Password: <small> aaaaaaaa</small>, Please do <strong>NOT</strong>  post any inappropriate content, thank you </p>
    </motion.div>
  )
}
