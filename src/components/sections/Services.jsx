import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { AnimatedSection } from "../AnimatedSection"
import { Palette, Code, Search, Zap, ArrowUpRight, Sparkles } from "lucide-react"
import { useRef } from "react"

const services = [
  {
    icon: Palette,
    title: "UI/UX Design",
    description: "User-centered design that balances aesthetics with functionality. We create intuitive interfaces that users love.",
    features: ["User Research", "Wireframing", "Prototyping", "Design Systems"],
    color: "blue",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    icon: Code,
    title: "Landing Page Development",
    description: "High-converting landing pages built with modern technologies. Fast, responsive, and optimized for performance.",
    features: ["Next.js/React", "Performance Optimization", "A/B Testing Ready", "Analytics Integration"],
    color: "cyan",
    gradient: "from-cyan-500 to-teal-500",
  },
  {
    icon: Search,
    title: "SEO & Growth Strategy",
    description: "Data-driven strategies to increase your visibility and drive organic traffic that converts.",
    features: ["Technical SEO", "Content Strategy", "Keyword Research", "Analytics & Reporting"],
    color: "violet",
    gradient: "from-violet-500 to-purple-500",
  },
  {
    icon: Zap,
    title: "Digital Optimization",
    description: "Continuous improvement through testing, analysis, and iteration to maximize your digital performance.",
    features: ["Conversion Rate Optimization", "User Testing", "Performance Audits", "Growth Consulting"],
    color: "teal",
    gradient: "from-teal-500 to-emerald-500",
  },
]

const colorVariants = {
  blue: "from-blue-500 to-blue-600",
  cyan: "from-cyan-500 to-cyan-600",
  violet: "from-violet-500 to-violet-600",
  teal: "from-teal-500 to-teal-600",
}

const bgColorVariants = {
  blue: "bg-blue-50 group-hover:bg-blue-100",
  cyan: "bg-cyan-50 group-hover:bg-cyan-100",
  violet: "bg-violet-50 group-hover:bg-violet-100",
  teal: "bg-teal-50 group-hover:bg-teal-100",
}

const glowVariants = {
  blue: "group-hover:shadow-blue-500/20",
  cyan: "group-hover:shadow-cyan-500/20",
  violet: "group-hover:shadow-violet-500/20",
  teal: "group-hover:shadow-teal-500/20",
}

function ServiceCard({ service, index }) {
  const cardRef = useRef(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [5, -5]), { stiffness: 300, damping: 30 })
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-5, 5]), { stiffness: 300, damping: 30 })

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
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="perspective-1000"
    >
      <div 
        className={`group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-8 shadow-sm transition-all duration-500 hover:border-slate-300 hover:shadow-2xl ${glowVariants[service.color]} h-full`}
      >
        <motion.div
          className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `linear-gradient(135deg, ${service.color === 'blue' ? '#3b82f620' : service.color === 'cyan' ? '#06b6d420' : service.color === 'violet' ? '#8b5cf620' : '#14b8a620'}, transparent)`,
          }}
        />

        <motion.div
          className="absolute top-0 right-0 w-32 h-32 -translate-y-8 translate-x-8 rounded-full blur-3xl opacity-0 group-hover:opacity-30 transition-opacity duration-500"
          style={{
            background: `linear-gradient(to bottom right, ${service.color === 'blue' ? '#3b82f6' : service.color === 'cyan' ? '#06b6d4' : service.color === 'violet' ? '#8b5cf6' : '#14b8a6'}, transparent)`,
          }}
        />

        <div className="relative" style={{ transform: "translateZ(20px)" }}>
          <div className="flex items-start justify-between">
            <motion.div 
              className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${colorVariants[service.color]} shadow-lg`}
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <service.icon className="h-7 w-7 text-white" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: -45 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              whileHover={{ scale: 1.1, rotate: 45 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-400 group-hover:bg-slate-200 group-hover:text-slate-600 transition-colors"
            >
              <ArrowUpRight className="h-5 w-5" />
            </motion.div>
          </div>

          <motion.h3 
            className="mt-6 text-xl font-semibold text-slate-900"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 + index * 0.1 }}
          >
            {service.title}
          </motion.h3>
          <motion.p 
            className="mt-3 text-slate-600 leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25 + index * 0.1 }}
          >
            {service.description}
          </motion.p>

          <motion.div 
            className="mt-6 flex flex-wrap gap-2"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 + index * 0.1 }}
          >
            {service.features.map((feature, featureIndex) => (
              <motion.span
                key={feature}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.35 + index * 0.1 + featureIndex * 0.05 }}
                whileHover={{ scale: 1.05, y: -2 }}
                className={`inline-flex rounded-full px-3 py-1 text-xs font-medium transition-all ${bgColorVariants[service.color]} text-slate-700`}
              >
                {feature}
              </motion.span>
            ))}
          </motion.div>
        </div>

        <motion.div
          className={`absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r ${service.gradient} group-hover:w-full transition-all duration-500`}
        />
      </div>
    </motion.div>
  )
}

export function Services() {
  return (
    <AnimatedSection id="services" className="py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-dots-pattern opacity-30" />
      
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.4 }}
        viewport={{ once: true }}
        className="absolute top-1/4 -left-20 w-80 h-80 bg-gradient-to-br from-blue-200/40 to-cyan-200/40 rounded-full blur-3xl"
      />
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.4 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="absolute bottom-1/4 -right-20 w-80 h-80 bg-gradient-to-br from-violet-200/40 to-purple-200/40 rounded-full blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 mb-4"
          >
            <Sparkles className="h-4 w-4 text-blue-500" />
            <span className="text-sm font-semibold uppercase tracking-wider text-blue-600">
              Services
            </span>
            <Sparkles className="h-4 w-4 text-blue-500" />
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl"
          >
            Everything You Need to{" "}
            <motion.span 
              className="gradient-text inline-block"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              Grow Online
            </motion.span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-lg text-slate-600"
          >
            Comprehensive digital services tailored to elevate your brand and accelerate growth.
          </motion.p>
        </div>

        <div className="mx-auto mt-16 grid gap-6 sm:grid-cols-2 lg:mt-20">
          {services.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} />
          ))}
        </div>
      </div>
    </AnimatedSection>
  )
}
