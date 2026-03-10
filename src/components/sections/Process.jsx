import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import { useRef } from "react"
import { AnimatedSection } from "../AnimatedSection"
import { Lightbulb, PenTool, Rocket, TrendingUp, ChevronRight, ArrowDown } from "lucide-react"

const steps = [
  {
    number: "01",
    icon: Lightbulb,
    title: "Discover",
    description: "We dive deep into your business goals, target audience, and competitive landscape to understand what success looks like for you.",
    color: "blue",
    gradient: "from-blue-500 to-cyan-500",
    glowColor: "rgba(59, 130, 246, 0.3)",
  },
  {
    number: "02",
    icon: PenTool,
    title: "Design",
    description: "Strategic wireframes and high-fidelity designs crafted to align with your brand while maximizing user engagement and conversion.",
    color: "cyan",
    gradient: "from-cyan-500 to-teal-500",
    glowColor: "rgba(6, 182, 212, 0.3)",
  },
  {
    number: "03",
    icon: Rocket,
    title: "Build",
    description: "Clean, performant code that brings designs to life. We build with scalability and maintainability in mind.",
    color: "violet",
    gradient: "from-violet-500 to-purple-500",
    glowColor: "rgba(139, 92, 246, 0.3)",
  },
  {
    number: "04",
    icon: TrendingUp,
    title: "Scale",
    description: "Launch is just the beginning. We optimize continuously based on real user data to drive ongoing growth.",
    color: "teal",
    gradient: "from-teal-500 to-emerald-500",
    glowColor: "rgba(20, 184, 166, 0.3)",
  },
]

export function Process() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const lineProgress = useSpring(useTransform(scrollYProgress, [0.1, 0.7], [0, 1]), { stiffness: 100, damping: 30 })
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -100])

  return (
    <AnimatedSection id="process" className="relative py-24 lg:py-32 overflow-hidden">
      <motion.div 
        style={{ y: backgroundY }}
        className="absolute inset-0 bg-gradient-to-b from-slate-50 via-white to-slate-50" 
      />
      
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.4 }}
        viewport={{ once: true }}
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-gradient-radial from-blue-100/60 via-cyan-100/30 to-transparent rounded-full blur-3xl"
      />

      <div className="absolute inset-0 bg-grid-pattern opacity-40" />
      
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-3 mb-6"
          >
            <motion.div 
              className="h-px w-16 bg-gradient-to-r from-transparent via-blue-500 to-blue-500"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            />
            <motion.div
              className="px-4 py-1.5 rounded-full bg-blue-100/80 border border-blue-200/80"
              whileHover={{ scale: 1.05 }}
            >
              <span className="text-sm font-bold uppercase tracking-widest text-blue-600">
                Our Process
              </span>
            </motion.div>
            <motion.div 
              className="h-px w-16 bg-gradient-to-r from-blue-500 via-blue-500 to-transparent"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            />
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.8 }}
            className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl"
          >
            From Concept to{" "}
            <span className="text-gradient-animate">Conversion</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mt-4 text-lg text-slate-600"
          >
            A proven methodology that transforms ideas into high-performing digital experiences.
          </motion.p>
        </div>

        <div ref={containerRef} className="relative mt-20 lg:mt-28">
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-2 -translate-y-1/2">
            <div className="h-full bg-slate-200/80 rounded-full overflow-hidden">
              <motion.div
                style={{ scaleX: lineProgress }}
                className="h-full bg-gradient-to-r from-blue-500 via-cyan-500 via-violet-500 to-teal-500 origin-left rounded-full"
              />
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-4 lg:gap-6">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 80, scale: 0.8 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ 
                  duration: 0.8, 
                  delay: index * 0.15, 
                  type: "spring", 
                  stiffness: 80 
                }}
                className="relative lg:px-2"
              >
                <div className="group relative flex flex-col items-center text-center">
                  <div className="relative z-10 mb-8">
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      whileInView={{ scale: 1, rotate: 0 }}
                      viewport={{ once: true }}
                      transition={{ 
                        duration: 0.8, 
                        delay: index * 0.15 + 0.2, 
                        type: "spring", 
                        stiffness: 150 
                      }}
                      whileHover={{ scale: 1.15, rotate: 10 }}
                      className={`relative flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br ${step.gradient} shadow-2xl`}
                      style={{ boxShadow: `0 20px 40px ${step.glowColor}` }}
                    >
                      <step.icon className="h-12 w-12 text-white" />
                      
                      <motion.div
                        className="absolute inset-0 rounded-3xl bg-white/20"
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                      
                      <motion.div
                        className="absolute inset-0 rounded-3xl"
                        animate={{ 
                          boxShadow: [
                            `0 0 0 0 ${step.glowColor}`,
                            `0 0 0 15px transparent`,
                          ]
                        }}
                        transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                      />

                      <motion.div
                        className="absolute inset-0 rounded-3xl bg-gradient-to-r from-transparent via-white/30 to-transparent"
                        animate={{ x: [-100, 100] }}
                        transition={{ duration: 3, repeat: Infinity, repeatDelay: 2, delay: index * 0.5 }}
                      />
                    </motion.div>
                    
                    <motion.div
                      initial={{ scale: 0, y: 10 }}
                      whileInView={{ scale: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.15 + 0.5, type: "spring", stiffness: 300 }}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="absolute -top-4 -right-4 flex h-10 w-10 items-center justify-center rounded-xl bg-white text-sm font-bold text-slate-700 shadow-xl border border-slate-100"
                    >
                      {step.number}
                    </motion.div>

                    <motion.div
                      className="absolute -bottom-2 left-1/2 -translate-x-1/2 h-8 w-1 bg-gradient-to-b from-slate-300 to-transparent lg:hidden"
                      initial={{ scaleY: 0 }}
                      whileInView={{ scaleY: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.15 + 0.6 }}
                    />
                  </div>

                  <motion.h3 
                    className="text-2xl font-bold text-slate-900"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.15 + 0.4 }}
                  >
                    {step.title}
                  </motion.h3>
                  
                  <motion.p 
                    className="mt-4 text-slate-600 leading-relaxed max-w-xs"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.15 + 0.5 }}
                  >
                    {step.description}
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.15 + 0.6 }}
                    className={`mt-4 px-4 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r ${step.gradient} text-white`}
                  >
                    Step {index + 1}
                  </motion.div>
                </div>

                {index < steps.length - 1 && (
                  <>
                    <div className="lg:hidden mx-auto my-8 flex flex-col items-center gap-2">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          initial={{ scale: 0, opacity: 0 }}
                          whileInView={{ scale: 1, opacity: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.15 + 0.7 + i * 0.1 }}
                          className={`h-3 w-3 rounded-full bg-gradient-to-r ${step.gradient}`}
                        />
                      ))}
                      <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.15 + 0.9 }}
                      >
                        <ArrowDown className="h-5 w-5 text-slate-400" />
                      </motion.div>
                    </div>
                    
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.15 + 0.5, type: "spring" }}
                      className="hidden lg:flex absolute top-[48px] right-0 translate-x-1/2 z-20 items-center justify-center w-10 h-10 rounded-full bg-white shadow-xl border border-slate-100"
                    >
                      <motion.div
                        animate={{ x: [0, 3, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        <ChevronRight className="h-5 w-5 text-slate-500" />
                      </motion.div>
                    </motion.div>
                  </>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="mt-20 text-center"
        >
          <motion.div
            className="inline-flex items-center gap-4 px-8 py-5 rounded-2xl bg-white/80 backdrop-blur-sm border border-slate-200/80 shadow-xl"
            whileHover={{ scale: 1.03, y: -3, boxShadow: "0 25px 60px rgba(0,0,0,0.12)" }}
          >
            <motion.div
              className="h-3 w-3 rounded-full bg-green-500"
              animate={{ scale: [1, 1.3, 1], boxShadow: ["0 0 0 0 rgba(34, 197, 94, 0.4)", "0 0 0 10px rgba(34, 197, 94, 0)", "0 0 0 0 rgba(34, 197, 94, 0.4)"] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <div className="text-left">
              <span className="text-sm text-slate-600">
                Average project timeline:{" "}
              </span>
              <motion.span 
                className="font-bold text-gradient-animate"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 1 }}
              >
                4-8 weeks
              </motion.span>
            </div>
            <motion.div
              className="h-8 w-px bg-slate-200"
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 1.1 }}
            />
            <div className="text-left">
              <span className="text-sm text-slate-600">
                Satisfaction rate:{" "}
              </span>
              <motion.span 
                className="font-bold text-green-600"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 1.2 }}
              >
                98%
              </motion.span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </AnimatedSection>
  )
}
