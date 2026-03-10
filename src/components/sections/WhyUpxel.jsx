import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion"
import { useRef } from "react"
import { AnimatedSection, AnimatedCard } from "../AnimatedSection"
import { TrendingUp, BarChart3, Target, Layers, ArrowUpRight, Sparkles } from "lucide-react"

const features = [
  {
    icon: TrendingUp,
    title: "Growth-Focused UX",
    description: "Every design decision is optimized for business outcomes. We build interfaces that guide users toward conversion naturally.",
    gradient: "from-blue-500 to-cyan-500",
    bgGradient: "from-blue-50 to-cyan-50",
    stat: "3x",
    statLabel: "Conversion Rate",
    delay: 0,
  },
  {
    icon: BarChart3,
    title: "Data-Driven Design",
    description: "We combine user research with analytics to create designs backed by real insights, not assumptions.",
    gradient: "from-cyan-500 to-teal-500",
    bgGradient: "from-cyan-50 to-teal-50",
    stat: "98%",
    statLabel: "Data Accuracy",
    delay: 0.1,
  },
  {
    icon: Target,
    title: "Conversion Optimization",
    description: "Strategic placement, compelling CTAs, and friction-free flows that turn visitors into customers.",
    gradient: "from-violet-500 to-purple-500",
    bgGradient: "from-violet-50 to-purple-50",
    stat: "40%",
    statLabel: "Uplift Average",
    delay: 0.2,
  },
  {
    icon: Layers,
    title: "Scalable Systems",
    description: "Design systems and component libraries that grow with your business and maintain consistency at scale.",
    gradient: "from-indigo-500 to-blue-500",
    bgGradient: "from-indigo-50 to-blue-50",
    stat: "∞",
    statLabel: "Scalability",
    delay: 0.3,
  },
]

function FeatureCard({ feature, index }) {
  const cardRef = useRef(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), { stiffness: 200, damping: 20 })
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), { stiffness: 200, damping: 20 })

  function handleMouseMove(e) {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    mouseX.set(x)
    mouseY.set(y)
  }

  function handleMouseLeave() {
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 60, rotateX: 20, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ delay: feature.delay, duration: 0.7, type: "spring", stiffness: 100 }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="perspective-1000"
    >
      <AnimatedCard
        className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-8 shadow-sm transition-all duration-500 hover:border-slate-300 hover:shadow-2xl h-full"
      >
        <motion.div
          className={`absolute inset-0 bg-gradient-to-br ${feature.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
        />
        
        <motion.div
          className="absolute top-0 right-0 h-48 w-48 translate-x-16 -translate-y-16 rounded-full blur-3xl opacity-0 group-hover:opacity-30 transition-all duration-700"
          style={{ background: `linear-gradient(135deg, var(--tw-gradient-stops))` }}
        />

        <motion.div
          className="absolute -bottom-20 -left-20 h-40 w-40 rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-all duration-700"
          style={{ background: `linear-gradient(135deg, var(--tw-gradient-stops))` }}
        />

        <div className="relative" style={{ transform: "translateZ(30px)" }}>
          <div className="flex items-start justify-between">
            <motion.div 
              className={`inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${feature.gradient} shadow-lg relative overflow-hidden`}
              whileHover={{ scale: 1.15, rotate: 8 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <feature.icon className="h-8 w-8 text-white relative z-10" />
              <motion.div
                className="absolute inset-0 bg-white/20"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.5 }}
              />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.5, x: 20 }}
              whileInView={{ opacity: 1, scale: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: feature.delay + 0.3, type: "spring" }}
              className="text-right"
            >
              <motion.div 
                className={`text-3xl font-bold bg-gradient-to-r ${feature.gradient} bg-clip-text text-transparent`}
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 3, repeat: Infinity, delay: index * 0.5 }}
              >
                {feature.stat}
              </motion.div>
              <div className="text-xs text-slate-500 mt-1">{feature.statLabel}</div>
            </motion.div>
          </div>
          
          <motion.h3 
            className="mt-6 text-xl font-bold text-slate-900"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: feature.delay + 0.2 }}
          >
            {feature.title}
          </motion.h3>
          
          <motion.p 
            className="mt-3 text-slate-600 leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: feature.delay + 0.3 }}
          >
            {feature.description}
          </motion.p>

          <motion.div
            className="mt-6 flex items-center gap-2 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-3 group-hover:translate-y-0"
            style={{ color: index === 0 ? '#3b82f6' : index === 1 ? '#06b6d4' : index === 2 ? '#8b5cf6' : '#6366f1' }}
          >
            <span>Learn more</span>
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <ArrowUpRight className="h-4 w-4" />
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          className={`absolute bottom-0 left-0 h-1.5 bg-gradient-to-r ${feature.gradient}`}
          initial={{ width: 0 }}
          whileHover={{ width: "100%" }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />

        <motion.div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: "radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(59, 130, 246, 0.1), transparent 50%)",
          }}
        />
      </AnimatedCard>
    </motion.div>
  )
}

export function WhyUpxel() {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -150])
  const orbScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.2, 0.8])
  const orbOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 0.6, 0.6, 0])

  return (
    <AnimatedSection className="relative py-24 lg:py-32 overflow-hidden">
      <motion.div 
        style={{ y: backgroundY }}
        className="absolute inset-0 bg-gradient-to-b from-white via-slate-50/80 to-white" 
      />
      
      <motion.div
        style={{ scale: orbScale, opacity: orbOpacity }}
        className="absolute top-20 right-0 w-[500px] h-[500px] bg-gradient-to-br from-blue-200/40 via-cyan-200/30 to-transparent rounded-full blur-3xl"
      />
      <motion.div
        style={{ scale: orbScale, opacity: orbOpacity }}
        className="absolute bottom-20 left-0 w-[400px] h-[400px] bg-gradient-to-br from-violet-200/40 via-purple-200/30 to-transparent rounded-full blur-3xl"
      />

      <div className="absolute inset-0 bg-dots-pattern opacity-30" />
      
      <div ref={sectionRef} className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, type: "spring" }}
            className="mb-4 inline-flex items-center gap-3"
          >
            <motion.div 
              className="h-px w-12 bg-gradient-to-r from-transparent via-blue-500 to-blue-500"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="h-4 w-4 text-blue-500" />
            </motion.div>
            <span className="text-sm font-bold uppercase tracking-widest text-blue-600">
              Why Upxel
            </span>
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="h-4 w-4 text-blue-500" />
            </motion.div>
            <motion.div 
              className="h-px w-12 bg-gradient-to-r from-blue-500 via-blue-500 to-transparent"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.8 }}
            className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl"
          >
            Design That{" "}
            <span className="relative inline-block">
              <span className="text-gradient-animate">Delivers Results</span>
              <motion.svg
                className="absolute -bottom-2 left-0 w-full h-3"
                viewBox="0 0 200 8"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, duration: 1 }}
              >
                <motion.path
                  d="M0 4 Q50 0 100 4 Q150 8 200 4"
                  fill="none"
                  stroke="url(#underlineGradient)"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                <defs>
                  <linearGradient id="underlineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="50%" stopColor="#06b6d4" />
                    <stop offset="100%" stopColor="#8b5cf6" />
                  </linearGradient>
                </defs>
              </motion.svg>
            </span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mt-6 text-lg text-slate-600 leading-relaxed"
          >
            We don&apos;t just make things look good. We engineer digital experiences that drive measurable business growth.
          </motion.p>
        </div>

        <div className="mx-auto mt-16 grid max-w-5xl gap-6 sm:grid-cols-2 lg:mt-20 perspective-1000">
          {features.map((feature, index) => (
            <FeatureCard key={feature.title} feature={feature} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-16 text-center"
        >
          <motion.div
            className="inline-flex items-center gap-4 px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-50 via-cyan-50 to-violet-50 border border-slate-200/80 shadow-lg"
            whileHover={{ scale: 1.02, y: -3, boxShadow: "0 20px 50px rgba(59, 130, 246, 0.15)" }}
          >
            <motion.div
              className="flex -space-x-2"
            >
              {[1, 2, 3, 4].map((i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.8 + i * 0.1 }}
                  className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-400 to-cyan-400 border-2 border-white flex items-center justify-center text-white text-xs font-bold"
                >
                  {String.fromCharCode(65 + i - 1)}
                </motion.div>
              ))}
            </motion.div>
            <div className="text-left">
              <motion.div 
                className="text-sm font-bold text-slate-900"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 1.2 }}
              >
                Trusted by 50+ businesses
              </motion.div>
              <motion.div 
                className="text-xs text-slate-500"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 1.3 }}
              >
                From startups to enterprises
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </AnimatedSection>
  )
}
