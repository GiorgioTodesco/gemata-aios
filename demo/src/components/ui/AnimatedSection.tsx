import { motion, useInView } from 'framer-motion'
import { useRef, type ReactNode } from 'react'

interface Props { children: ReactNode; delay?: number; className?: string }

export function AnimatedSection({ children, delay = 0, className = '' }: Props) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
