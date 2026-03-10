import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion"
import { GradientButton } from "../GradientButton"
import { ArrowRight, Sparkles, Play, Zap, Star } from "lucide-react"
import { useRef, useEffect, useState } from "react"

const floatingShapes = [
  { size: 80, top: "10%", left: "5%", delay: 0, color: "blue", blur: 2 },
  { size: 60, top: "20%", right: "10%", delay: 0.5, color: "cyan", blur: 1 },
  { size: 70, bottom: "25%", left: "8%", delay: 1, color: "violet", blur: 2 },
  { size: 50, bottom: "15%", right: "5%", delay: 1.5, color: "teal", blur: 1 },
  { size: 40, top: "45%", left: "15%", delay: 2, color: "blue", blur: 0 },
  { size: 45, top: "55%", right: "20%", delay: 2.5, color: "cyan", blur: 1 },
  { size: 35, top: "70%", left: "25%", delay: 3, color: "violet", blur: 0 },
  { size: 55, top: "35%", right: "30%", delay: 3.5, color: "teal", blur: 2 },
]

const particles = Array.from({ length: 30 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 4 + 2,
  delay: Math.random() * 5,
  duration: Math.random() * 3 + 4,
}))

function useMousePosition() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  
  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", updateMousePosition)
    return () => window.removeEventListener("mousemove", updateMousePosition)
  }, [])
  
  return mousePosition
}

export function Hero() {
  const containerRef = useRef(null)
  const mousePosition = useMousePosition()
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, 300])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9])
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 5])
  const blurValue = useTransform(scrollYProgress, [0, 0.5], [0, 10])
  
  const springConfig = { stiffness: 150, damping: 30 }
  const springX = useSpring(mouseX, springConfig)
  const springY = useSpring(mouseY, springConfig)

  useEffect(() => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect()
      mouseX.set((mousePosition.x - rect.left - rect.width / 2) / 50)
      mouseY.set((mousePosition.y - rect.top - rect.height / 2) / 50)
    }
  }, [mousePosition, mouseX, mouseY])

  const headline = "Upgrade Your"
  const gradientText = "Digital Growth"

  return (
    <section ref={containerRef} className="relative min-h-screen overflow-hidden pt-20">
      <div className="absolute inset-0 grid-pattern" />
      <div className="absolute inset-0 bg-noise pointer-events-none" />
      <div 
        className="absolute inset-0" 
        style={{ background: "var(--gradient-mesh)" }}
      />
      
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-blue-400/30"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, 15, 0],
            opacity: [0.2, 0.6, 0.2],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut",
          }}
        />
      ))}
      
      {floatingShapes.map((shape, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0, rotate: -180 }}
          animate={{ opacity: 0.7, scale: 1, rotate: 0 }}
          transition={{ delay: shape.delay * 0.3, duration: 1.2, type: "spring" }}
          className="absolute"
          style={{
            width: shape.size,
            height: shape.size,
            top: shape.top,
            left: shape.left,
            right: shape.right,
            bottom: shape.bottom,
            filter: `blur(${shape.blur}px)`,
          }}
        >
          <motion.div 
            className={`h-full w-full animate-morph ${
              shape.color === 'blue' ? 'bg-gradient-to-br from-blue-400/30 to-blue-600/20' :
              shape.color === 'cyan' ? 'bg-gradient-to-br from-cyan-400/30 to-cyan-600/20' :
              shape.color === 'violet' ? 'bg-gradient-to-br from-violet-400/30 to-violet-600/20' :
              'bg-gradient-to-br from-teal-400/30 to-teal-600/20'
            }`}
            animate={{
              y: [0, -20, 0],
              x: [0, 10, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 8 + index,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>
      ))}

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2 }}
        className="absolute -top-40 -right-40 h-[700px] w-[700px] rounded-full bg-gradient-to-br from-blue-400/25 via-cyan-400/15 to-transparent blur-3xl"
        style={{ x: springX, y: springY }}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2, delay: 0.3 }}
        className="absolute -bottom-40 -left-40 h-[600px] w-[600px] rounded-full bg-gradient-to-tr from-violet-400/25 via-cyan-400/15 to-transparent blur-3xl"
        style={{ x: useTransform(springX, v => -v), y: useTransform(springY, v => -v) }}
      />

      {[800, 600, 400].map((size, i) => (
        <motion.div
          key={size}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.1 - i * 0.02, scale: 1, rotate: 360 }}
          transition={{ duration: 40 + i * 10, repeat: Infinity, ease: "linear", delay: i * 0.3 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border"
          style={{
            width: size,
            height: size,
            borderColor: i === 0 ? 'rgba(59, 130, 246, 0.2)' : i === 1 ? 'rgba(6, 182, 212, 0.2)' : 'rgba(139, 92, 246, 0.2)',
          }}
        />
      ))}

      <motion.div 
        style={{ y, opacity, scale, filter: useTransform(blurValue, v => `blur(${v}px)`) }}
        className="relative mx-auto max-w-7xl px-6 pt-24 pb-20 lg:px-8 lg:pt-32"
      >
        <motion.div style={{ rotateX: rotate }} className="mx-auto max-w-4xl text-center perspective-1000">
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1, type: "spring" }}
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-blue-200/80 bg-blue-50/90 px-5 py-2.5 backdrop-blur-sm shadow-lg shadow-blue-500/10"
          >
            <motion.div
              animate={{ rotate: 360, scale: [1, 1.2, 1] }}
              transition={{ rotate: { duration: 4, repeat: Infinity, ease: "linear" }, scale: { duration: 2, repeat: Infinity } }}
            >
              <Sparkles className="h-4 w-4 text-blue-500" />
            </motion.div>
            <span className="text-sm font-semibold text-blue-700">
              Google Certified UX Studio
            </span>
            <motion.div 
              className="h-2 w-2 rounded-full bg-green-500"
              animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1], boxShadow: ["0 0 0 0 rgba(34, 197, 94, 0.4)", "0 0 0 8px rgba(34, 197, 94, 0)", "0 0 0 0 rgba(34, 197, 94, 0.4)"] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>

          <h1 className="text-balance text-5xl font-extrabold tracking-tight text-slate-900 sm:text-6xl lg:text-7xl overflow-hidden">
            <span className="inline-block">
              {headline.split("").map((char, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 80, rotateX: 90 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{ delay: i * 0.04 + 0.3, duration: 0.6, type: "spring", stiffness: 100 }}
                  className="inline-block"
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </span>{" "}
            <span className="inline-block gradient-text relative">
              {gradientText.split("").map((char, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 80, rotateX: 90, scale: 0.5 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
                  transition={{ delay: i * 0.04 + headline.length * 0.04 + 0.3, duration: 0.6, type: "spring", stiffness: 100 }}
                  className="inline-block"
                  whileHover={{ scale: 1.1, color: "#3b82f6" }}
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
              <motion.div
                className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-blue-500 via-cyan-500 to-violet-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: 1.5, duration: 0.8, ease: "easeOut" }}
              />
            </span>
          </h1>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="mx-auto mt-8 max-w-2xl flex flex-wrap items-center justify-center gap-3"
          >
            {["UI/UX Design", "Landing Pages", "SEO", "Digital Strategy"].map((item, i) => (
              <motion.span
                key={item}
                initial={{ opacity: 0, scale: 0.5, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 1.1 + i * 0.1, type: "spring", stiffness: 200 }}
                whileHover={{ scale: 1.1, y: -3, boxShadow: "0 10px 30px rgba(59, 130, 246, 0.2)" }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-slate-200/80 text-sm font-medium text-slate-700 shadow-sm cursor-default transition-shadow"
              >
                <motion.div
                  className={`h-2 w-2 rounded-full ${
                    i === 0 ? 'bg-blue-500' : i === 1 ? 'bg-cyan-500' : i === 2 ? 'bg-violet-500' : 'bg-teal-500'
                  }`}
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                />
                {item}
              </motion.span>
            ))}
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="mx-auto mt-6 max-w-xl text-base text-slate-500 leading-relaxed"
          >
            We transform businesses through strategic design and data-driven digital experiences that convert visitors into loyal customers.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.6 }}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <GradientButton href="#contact">
                <motion.span
                  animate={{ opacity: [1, 0.7, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Zap className="mr-2 h-4 w-4" />
                </motion.span>
                Get Free Audit
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight className="ml-2 h-4 w-4" />
                </motion.span>
              </GradientButton>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <GradientButton href="#results" variant="secondary">
                <Play className="mr-2 h-4 w-4 fill-current" />
                View Work
              </GradientButton>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.8 }}
            className="mt-14 flex flex-wrap items-center justify-center gap-6"
          >
            {[
              { icon: <div className="h-2.5 w-2.5 rounded-full bg-green-500 animate-pulse" />, value: "", label: "Available for projects" },
              { icon: <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />, value: "50+", label: "Projects delivered" },
              { icon: <Zap className="h-4 w-4 text-blue-500" />, value: "3x", label: "Avg. conversion uplift" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 1.9 + i * 0.15, type: "spring" }}
                whileHover={{ scale: 1.08, y: -5, boxShadow: "0 15px 40px rgba(0,0,0,0.1)" }}
                className="flex items-center gap-2.5 px-5 py-3 rounded-2xl bg-white/90 backdrop-blur-sm border border-slate-200/80 shadow-sm cursor-default"
              >
                <motion.div
                  animate={stat.value ? { rotate: [0, 10, -10, 0] } : {}}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {stat.icon}
                </motion.div>
                {stat.value && <span className="font-bold text-slate-800">{stat.value}</span>}
                <span className="text-sm text-slate-600">{stat.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 80, rotateX: 20 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 1.2, delay: 2, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto mt-20 max-w-5xl perspective-1000"
        >
          <motion.div 
            className="absolute -inset-6 rounded-3xl bg-gradient-to-r from-blue-500/30 via-cyan-500/30 to-violet-500/30 blur-2xl"
            animate={{ 
              opacity: [0.4, 0.7, 0.4],
              scale: [1, 1.03, 1],
              rotate: [0, 1, 0],
            }}
            transition={{ duration: 5, repeat: Infinity }}
          />
          
          <motion.div 
            className="relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white/95 shadow-2xl shadow-slate-900/15 backdrop-blur-xl"
            whileHover={{ y: -8, scale: 1.02, rotateX: 2 }}
            transition={{ duration: 0.4 }}
          >
            <div className="flex items-center gap-2 border-b border-slate-100 px-4 py-3 bg-slate-50/50">
              {['bg-red-400', 'bg-yellow-400', 'bg-green-400'].map((color, i) => (
                <motion.div 
                  key={color}
                  whileHover={{ scale: 1.4 }}
                  className={`h-3 w-3 rounded-full ${color}`}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 2.2 + i * 0.1 }}
                />
              ))}
              <motion.span 
                className="ml-4 text-xs text-slate-400 font-mono"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.5 }}
              >
                upxel-dashboard.app
              </motion.span>
              <motion.div 
                className="ml-auto flex items-center gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.6 }}
              >
                <span className="text-xs text-green-600 font-medium">Live</span>
                <motion.div 
                  className="h-2 w-2 rounded-full bg-green-500"
                  animate={{ opacity: [1, 0.4, 1], scale: [1, 0.8, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              </motion.div>
            </div>
            
            <div className="p-8">
              <div className="grid grid-cols-3 gap-6">
                {[
                  { from: "#3b82f6", to: "#06b6d4", label: "Conversions", value: "+127%" },
                  { from: "#06b6d4", to: "#14b8a6", label: "Traffic", value: "+89%" },
                  { from: "#8b5cf6", to: "#a855f7", label: "Revenue", value: "+156%" },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 30, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ delay: 2.4 + i * 0.15, type: "spring" }}
                    className="space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-500 font-medium">{item.label}</span>
                      <motion.span 
                        className="text-xs font-bold text-green-600"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 2.6 + i * 0.15 }}
                      >
                        {item.value}
                      </motion.span>
                    </div>
                    <motion.div 
                      className="h-24 rounded-xl relative overflow-hidden"
                      style={{ background: `linear-gradient(135deg, ${item.from}20, ${item.to}20)` }}
                      whileHover={{ scale: 1.03 }}
                    >
                      <motion.div
                        className="absolute bottom-0 left-0 right-0 rounded-lg"
                        style={{ background: `linear-gradient(to top, ${item.from}, ${item.to})` }}
                        initial={{ height: 0 }}
                        animate={{ height: `${60 + i * 15}%` }}
                        transition={{ delay: 2.8 + i * 0.2, duration: 1, ease: "easeOut" }}
                      />
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                        animate={{ x: [-100, 200] }}
                        transition={{ duration: 2, repeat: Infinity, repeatDelay: 2, delay: 3 + i * 0.3 }}
                      />
                    </motion.div>
                  </motion.div>
                ))}
              </div>
              
              <motion.div 
                className="mt-6 flex items-center gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 3 }}
              >
                <motion.div 
                  className="h-12 flex-1 rounded-xl bg-slate-100 relative overflow-hidden"
                  animate={{ opacity: [0.5, 0.8, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <motion.div
                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-200 to-cyan-200"
                    initial={{ width: 0 }}
                    animate={{ width: "75%" }}
                    transition={{ delay: 3.2, duration: 1.5, ease: "easeOut" }}
                  />
                </motion.div>
                <motion.div 
                  className="h-12 w-36 rounded-xl bg-gradient-to-r from-blue-500 via-cyan-500 to-violet-500 relative overflow-hidden flex items-center justify-center"
                  whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(59, 130, 246, 0.3)" }}
                >
                  <span className="text-white text-sm font-semibold relative z-10">Launch</span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    animate={{ x: [-150, 150] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                  />
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center gap-3 text-slate-400"
          >
            <motion.span 
              className="text-xs font-medium tracking-wide"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Scroll to explore
            </motion.span>
            <div className="h-10 w-6 rounded-full border-2 border-slate-300 p-1.5 relative overflow-hidden">
              <motion.div
                animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="h-2 w-full rounded-full bg-gradient-to-b from-blue-500 to-cyan-500"
              />
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}
