import { motion, useInView, useMotionValue, useSpring, useTransform, useScroll } from "framer-motion"
import { useRef, useEffect, useState } from "react"
import { AnimatedSection } from "../AnimatedSection"
import { TrendingUp, Users, Zap, Award, ArrowUpRight, Sparkles, Star } from "lucide-react"

const metrics = [
  {
    icon: TrendingUp,
    value: 300,
    suffix: "%",
    label: "Average Conversion Uplift",
    description: "Our clients see significant improvements in conversion rates within the first 90 days.",
    color: "blue",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    icon: Users,
    value: 20,
    suffix: "+",
    label: "Projects Delivered",
    description: "Successfully completed projects for startups, agencies, and enterprise clients.",
    color: "cyan",
    gradient: "from-cyan-500 to-teal-500",
  },
  {
    icon: Zap,
    value: 98,
    suffix: "%",
    label: "Client Satisfaction",
    description: "Our commitment to excellence reflects in our near-perfect satisfaction score.",
    color: "violet",
    gradient: "from-violet-500 to-purple-500",
  },
  {
    icon: Award,
    value: 3,
    suffix: " Years",
    label: "Industry Experience",
    description: "Half a decade of crafting digital experiences that drive business growth.",
    color: "teal",
    gradient: "from-teal-500 to-emerald-500",
  },
]

function AnimatedCounter({ value, suffix }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const motionValue = useMotionValue(0)
  const springValue = useSpring(motionValue, { duration: 2500, bounce: 0.2 })

  useEffect(() => {
    if (isInView) {
      motionValue.set(value)
    }
  }, [isInView, value, motionValue])

  useEffect(() => {
    const unsubscribe = springValue.on("change", (latest) => {
      setCount(Math.floor(latest))
    })
    return unsubscribe
  }, [springValue])

  return (
    <span ref={ref} className="tabular-nums">
      {count}{suffix}
    </span>
  )
}

function MetricCard({ metric, index }) {
  const cardRef = useRef(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [12, -12]), { stiffness: 200, damping: 20 })
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-12, 12]), { stiffness: 200, damping: 20 })
  const glowX = useSpring(useTransform(mouseX, [-0.5, 0.5], [0, 100]), { stiffness: 200, damping: 20 })
  const glowY = useSpring(useTransform(mouseY, [-0.5, 0.5], [0, 100]), { stiffness: 200, damping: 20 })

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

  const colors = {
    blue: { bg: "rgba(59, 130, 246, 0.1)", glow: "rgba(59, 130, 246, 0.4)" },
    cyan: { bg: "rgba(6, 182, 212, 0.1)", glow: "rgba(6, 182, 212, 0.4)" },
    violet: { bg: "rgba(139, 92, 246, 0.1)", glow: "rgba(139, 92, 246, 0.4)" },
    teal: { bg: "rgba(20, 184, 166, 0.1)", glow: "rgba(20, 184, 166, 0.4)" },
  }

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 60, scale: 0.85, rotateX: 20 }}
      whileInView={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ delay: index * 0.12, duration: 0.7, type: "spring", stiffness: 100 }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="perspective-1000"
    >
      <div className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white/90 backdrop-blur-sm p-6 text-center shadow-sm transition-all duration-500 hover:border-slate-300 hover:shadow-2xl h-full">
        <motion.div
          className="absolute -top-20 -right-20 w-40 h-40 rounded-full blur-3xl opacity-0 group-hover:opacity-40 transition-all duration-700"
          style={{ background: `linear-gradient(135deg, ${colors[metric.color].glow}, transparent)` }}
        />

        <div className="relative" style={{ transform: "translateZ(40px)" }}>
          <motion.div
            className={`mx-auto inline-flex h-18 w-18 items-center justify-center rounded-2xl bg-gradient-to-br ${metric.gradient} shadow-xl relative overflow-hidden`}
            whileHover={{ scale: 1.15, rotate: 8 }}
            transition={{ type: "spring", stiffness: 400 }}
            style={{ width: 72, height: 72 }}
          >
            <metric.icon className="h-9 w-9 text-white relative z-10" />
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              animate={{ x: [-80, 80] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3, delay: index * 0.5 }}
            />
          </motion.div>

          <motion.div
            className="mt-6"
            initial={{ scale: 0.5, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.12 + 0.3, type: "spring", stiffness: 150 }}
          >
            <motion.div
              className={`text-5xl font-extrabold bg-gradient-to-r ${metric.gradient} bg-clip-text text-transparent`}
              whileHover={{ scale: 1.05 }}
            >
              <AnimatedCounter value={metric.value} suffix={metric.suffix} />
            </motion.div>
          </motion.div>

          <motion.h3
            className="mt-4 text-lg font-bold text-slate-800"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.12 + 0.4 }}
          >
            {metric.label}
          </motion.h3>

          <motion.p
            className="mt-2 text-sm text-slate-500 leading-relaxed"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.12 + 0.5 }}
          >
            {metric.description}
          </motion.p>
        </div>

        <motion.div
          className={`absolute bottom-0 left-0 h-1.5 bg-gradient-to-r ${metric.gradient}`}
          initial={{ width: 0 }}
          whileHover={{ width: "100%" }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />

        <motion.div
          className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300"
          initial={{ scale: 0.5, rotate: -45 }}
          whileHover={{ scale: 1.2, rotate: 0 }}
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100/80 backdrop-blur-sm">
            <ArrowUpRight className="h-4 w-4 text-slate-500" />
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export function Results() {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -150])
  const orbScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.3, 0.8])

  return (
    <AnimatedSection id="results" className="relative py-24 lg:py-32 overflow-hidden">
      <motion.div
        style={{ y: backgroundY }}
        className="absolute inset-0 bg-gradient-to-b from-white via-slate-50/80 to-white"
      />

      <motion.div
        style={{ scale: orbScale }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.5 }}
        viewport={{ once: true }}
        className="absolute top-1/4 -right-40 w-[500px] h-[500px] bg-gradient-to-br from-blue-200/50 via-cyan-200/30 to-transparent rounded-full blur-3xl"
      />
      <motion.div
        style={{ scale: orbScale }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.5 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="absolute bottom-1/4 -left-40 w-[400px] h-[400px] bg-gradient-to-br from-violet-200/50 via-purple-200/30 to-transparent rounded-full blur-3xl"
      />

      <div className="absolute inset-0 bg-dots-pattern opacity-30" />

      <div ref={sectionRef} className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-3 mb-6"
          >
            <motion.div
              className="h-px w-12 bg-gradient-to-r from-transparent via-blue-500 to-blue-500"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            />
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="h-5 w-5 text-blue-500" />
            </motion.div>
            <span className="text-sm font-bold uppercase tracking-widest text-blue-600">
              Results
            </span>
            <motion.div
              animate={{ rotate: [360, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="h-5 w-5 text-blue-500" />
            </motion.div>
            <motion.div
              className="h-px w-12 bg-gradient-to-r from-blue-500 via-blue-500 to-transparent"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.8 }}
            className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl"
          >
            Numbers That{" "}
            <motion.span
              className="text-gradient-animate inline-block"
            >
              Speak
            </motion.span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mt-4 text-lg text-slate-600"
          >
            Real outcomes from real projects. Here's the impact we create for our clients.
          </motion.p>
        </div>

        <div className="mx-auto mt-16 grid gap-6 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4">
          {metrics.map((metric, index) => (
            <MetricCard key={metric.label} metric={metric} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, type: "spring" }}
          className="mt-16 text-center"
        >
          <motion.div
            whileHover={{ scale: 1.03, y: -5, boxShadow: "0 30px 60px rgba(59, 130, 246, 0.2)" }}
            className="inline-flex items-center gap-5 px-10 py-6 rounded-3xl bg-gradient-to-r from-blue-50 via-cyan-50 to-violet-50 border border-slate-200/80 shadow-xl"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="h-14 w-14 rounded-2xl bg-gradient-to-r from-blue-500 via-cyan-500 to-violet-500 flex items-center justify-center shadow-lg"
            >
              <TrendingUp className="h-7 w-7 text-white" />
            </motion.div>
            <div className="text-left">
              <motion.div
                className="text-sm text-slate-500 mb-1"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8 }}
              >
                Average ROI for our clients
              </motion.div>
              <motion.div
                className="text-3xl font-bold text-gradient-animate"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.9 }}
              >
                340% within 6 months
              </motion.div>
            </div>
            <motion.div
              className="flex gap-1"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 1 }}
            >
              {[1, 2, 3, 4, 5].map((i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 1 + i * 0.1, type: "spring" }}
                >
                  <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </AnimatedSection>
  )
}
