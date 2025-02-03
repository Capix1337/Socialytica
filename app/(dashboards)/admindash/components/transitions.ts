import { type MotionProps } from "framer-motion"

export const fadeIn: MotionProps = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.3 }
}

export const slideIn: MotionProps = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 },
  transition: { duration: 0.3 }
}

export const refreshAnimation: MotionProps = {
  initial: { opacity: 0.3 },
  animate: { opacity: 1 },
  transition: { duration: 0.2 }
}

export const staggerChildren = {
  initial: { opacity: 0 },
  animate: { 
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}