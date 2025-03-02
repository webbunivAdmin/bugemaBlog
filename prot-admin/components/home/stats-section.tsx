"use client"

import { useEffect, useRef } from "react"
import { motion, useInView, useMotionValue, useSpring } from "framer-motion"

interface Stat {
  id: number
  name: string
  value: string
}

interface StatsProps {
  stats: Stat[]
}

function AnimatedValue({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })
  const numberValue = parseInt(value.replace(/[^0-9]/g, ""))
  const motionValue = useMotionValue(0)
  const springValue = useSpring(motionValue, {
    damping: 50,
    stiffness: 100,
  })

  useEffect(() => {
    if (inView) {
      motionValue.set(numberValue)
    }
  }, [inView, motionValue, numberValue])

  useEffect(() => {
    return springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = `${Math.floor(latest)}${value.replace(/[0-9]/g, "")}`
      }
    })
  }, [springValue, value])

  return <span ref={ref}>{value}</span>
}

export default function StatsSection({ stats }: StatsProps) {
  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-b from-muted/50 to-muted/30 py-16 md:py-24 lg:py-32">
      {/* Decorative elements */}
      <div className="absolute inset-0 grid grid-cols-6 -space-x-52 opacity-[0.15]" aria-hidden="true">
        <div className="h-32 animate-pulse bg-gradient-to-br from-primary to-purple-400 blur-xl"></div>
        <div className="h-32 animate-pulse animation-delay-1000 bg-gradient-to-r from-cyan-400 to-sky-300 blur-xl"></div>
        <div className="h-32 animate-pulse animation-delay-2000 bg-gradient-to-r from-primary to-indigo-400 blur-xl"></div>
        <div className="h-32 animate-pulse animation-delay-3000 bg-gradient-to-r from-purple-400 to-primary blur-xl"></div>
        <div className="h-32 animate-pulse animation-delay-4000 bg-gradient-to-r from-cyan-400 to-sky-300 blur-xl"></div>
        <div className="h-32 animate-pulse animation-delay-5000 bg-gradient-to-r from-primary to-purple-400 blur-xl"></div>
      </div>

      <div className="container relative px-4 md:px-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="group relative"
            >
              <div className="relative overflow-hidden rounded-lg border bg-background/60 p-8 backdrop-blur-sm transition-all duration-300 hover:bg-background/80">
                {/* Decorative corner gradients */}
                <div className="absolute -left-2 -top-2 h-16 w-16 rotate-45 bg-gradient-to-r from-primary/20 to-transparent blur-2xl transition-all duration-500 group-hover:rotate-90"></div>
                <div className="absolute -bottom-2 -right-2 h-16 w-16 rotate-45 bg-gradient-to-l from-primary/20 to-transparent blur-2xl transition-all duration-500 group-hover:-rotate-90"></div>

                <div className="relative flex flex-col items-center justify-center space-y-4 text-center">
                  <div className="text-4xl font-bold tracking-tighter text-foreground md:text-5xl lg:text-6xl">
                    <AnimatedValue value={stat.value} />
                  </div>
                  <div className="text-sm font-medium text-muted-foreground md:text-base lg:text-lg">
                    {stat.name}
                  </div>
                  
                  {/* Decorative line */}
                  <div className="h-1 w-12 rounded-full bg-gradient-to-r from-primary/60 via-primary to-primary/60 transition-all duration-300 group-hover:w-24"></div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Global styles for animation delays */}
      <style jsx global>{`
        .animation-delay-1000 {
          animation-delay: 1s;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-3000 {
          animation-delay: 3s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .animation-delay-5000 {
          animation-delay: 5s;
        }
      `}</style>
    </section>
  )
}
