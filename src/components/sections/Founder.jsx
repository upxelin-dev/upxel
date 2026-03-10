import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { AnimatedSection } from "../AnimatedSection"
import { BadgeCheck, Linkedin, Twitter, Mail, Sparkles, Award, Star } from "lucide-react"

const achievements = [
  { label: "Years Experience", value: "5+", icon: Award },
  { label: "Projects Completed", value: "50+", icon: Star },
  { label: "Happy Clients", value: "40+", icon: BadgeCheck },
]

const skills = ["UI/UX Design", "Front-end Dev", "React/Next.js", "Design Systems", "User Research", "SEO"]

export function Founder() {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const imageY = useTransform(scrollYProgress, [0, 1], [80, -80])
  const contentY = useTransform(scrollYProgress, [0, 1], [50, -50])
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -150])
  const orbScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.2, 0.8])

  return (
    <AnimatedSection id="founder" className="py-24 lg:py-32 overflow-hidden relative">
      <motion.div 
        style={{ y: backgroundY }}
        className="absolute inset-0 bg-gradient-to-b from-slate-50 via-white to-slate-50" 
      />
      
      <motion.div
        style={{ scale: orbScale }}
        className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-blue-100/40 via-cyan-100/30 to-transparent rounded-full blur-3xl"
      />
      <motion.div
        style={{ scale: orbScale }}
        className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-br from-violet-100/40 via-purple-100/30 to-transparent rounded-full blur-3xl"
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
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="h-5 w-5 text-blue-500" />
            </motion.div>
            <span className="text-sm font-bold uppercase tracking-widest text-blue-600">
              Meet the Founder
            </span>
            <motion.div
              animate={{ rotate: -360 }}
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
            The Mind Behind{" "}
            <span className="text-gradient-animate">Upxel</span>
          </motion.h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8, type: "spring" }}
          className="mx-auto mt-16 max-w-5xl"
        >
          <div className="relative overflow-hidden rounded-3xl p-1">
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-blue-500 via-cyan-500 to-violet-500 opacity-60"
              animate={{ 
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{ duration: 6, repeat: Infinity }}
              style={{ backgroundSize: "200% 200%" }}
            />
            
            <div className="relative bg-white/95 backdrop-blur-xl rounded-[22px] p-8 lg:p-12 shadow-2xl">
              <motion.div 
                className="absolute top-0 right-0 h-80 w-80 translate-x-20 -translate-y-20 rounded-full bg-gradient-to-br from-blue-400/15 via-cyan-400/10 to-violet-400/15 blur-3xl"
                animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
                transition={{ duration: 10, repeat: Infinity }}
              />
              <motion.div 
                className="absolute bottom-0 left-0 h-64 w-64 -translate-x-20 translate-y-20 rounded-full bg-gradient-to-br from-violet-400/15 via-cyan-400/10 to-blue-400/15 blur-3xl"
                animate={{ scale: [1.2, 1, 1.2], rotate: [0, -90, 0] }}
                transition={{ duration: 10, repeat: Infinity }}
              />
              
              <div className="relative flex flex-col items-center gap-10 lg:flex-row lg:gap-14">
                <motion.div 
                  style={{ y: imageY }}
                  className="relative shrink-0"
                >
                  <motion.div 
                    className="relative h-60 w-60 overflow-hidden rounded-3xl p-1 lg:h-72 lg:w-72"
                    initial={{ scale: 0.8, opacity: 0, rotate: -10 }}
                    whileInView={{ scale: 1, opacity: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.3, type: "spring" }}
                  >
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-br from-blue-500 via-cyan-500 to-violet-500 rounded-3xl"
                      animate={{ 
                        backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
                      }}
                      transition={{ duration: 5, repeat: Infinity }}
                      style={{ backgroundSize: "200% 200%" }}
                    />
                    <div className="relative h-full w-full overflow-hidden rounded-[20px] bg-gradient-to-br from-blue-100 via-cyan-50 to-violet-100">
                      <motion.div 
                        className="flex h-full w-full items-center justify-center"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.4 }}
                      >
                        <motion.span 
                          className="text-8xl font-black text-gradient-animate"
                          initial={{ opacity: 0, scale: 0.5 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.6, type: "spring" }}
                        >
                          NJ
                        </motion.span>
                      </motion.div>
                    </div>
                  </motion.div>
                  
                  <motion.div
                    initial={{ scale: 0, opacity: 0, y: 20 }}
                    whileInView={{ scale: 1, opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.7, type: "spring", stiffness: 200 }}
                    whileHover={{ scale: 1.08, y: -3 }}
                    className="absolute -bottom-4 -right-4 flex items-center gap-2 rounded-2xl bg-white px-5 py-3 shadow-2xl border border-slate-100"
                  >
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    >
                      <BadgeCheck className="h-6 w-6 text-blue-500" />
                    </motion.div>
                    <span className="text-sm font-bold text-slate-700">Google Certified</span>
                  </motion.div>

                  {[
                    { top: "-8px", left: "-8px", size: 16, color: "blue", delay: 0 },
                    { top: "20%", right: "-16px", size: 12, color: "cyan", delay: 0.5 },
                    { bottom: "30%", left: "-12px", size: 14, color: "violet", delay: 1 },
                    { bottom: "-8px", right: "30%", size: 10, color: "teal", delay: 1.5 },
                  ].map((dot, i) => (
                    <motion.div
                      key={i}
                      className={`absolute rounded-full ${
                        dot.color === 'blue' ? 'bg-blue-400' :
                        dot.color === 'cyan' ? 'bg-cyan-400' :
                        dot.color === 'violet' ? 'bg-violet-400' :
                        'bg-teal-400'
                      }`}
                      style={{ 
                        width: dot.size, 
                        height: dot.size,
                        top: dot.top,
                        left: dot.left,
                        right: dot.right,
                        bottom: dot.bottom,
                      }}
                      animate={{ 
                        scale: [1, 1.5, 1], 
                        opacity: [0.6, 1, 0.6],
                      }}
                      transition={{ duration: 3, repeat: Infinity, delay: dot.delay }}
                    />
                  ))}
                </motion.div>

                <motion.div 
                  style={{ y: contentY }}
                  className="flex-1 text-center lg:text-left"
                >
                  <motion.h3 
                    className="text-4xl font-bold text-slate-900 lg:text-5xl"
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4, type: "spring" }}
                  >
                    Naman Joshi
                  </motion.h3>
                  
                  <motion.p 
                    className="mt-3 text-lg font-semibold text-gradient-animate"
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                  >
                    Google Certified UX Professional & Full Stack Developer
                  </motion.p>
                  
                  <motion.p 
                    className="mt-6 text-slate-600 leading-relaxed"
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.55 }}
                  >
                    With expertise spanning user experience design and front-end development, I bridge the gap between beautiful design and functional code. My approach combines data-driven insights with creative problem-solving to build digital experiences that don't just look great—they drive real business results.
                  </motion.p>
                  
                  <motion.p 
                    className="mt-4 text-slate-600 leading-relaxed"
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6 }}
                  >
                    At Upxel, I've helped businesses across industries transform their digital presence, consistently delivering measurable improvements in conversion rates and user engagement.
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.65 }}
                    className="mt-6 flex flex-wrap justify-center gap-2 lg:justify-start"
                  >
                    {skills.map((skill, i) => (
                      <motion.span
                        key={skill}
                        initial={{ opacity: 0, scale: 0.5 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.7 + i * 0.05, type: "spring" }}
                        whileHover={{ scale: 1.1, y: -2 }}
                        className="px-3 py-1.5 rounded-full text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200"
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.75 }}
                    className="mt-8 flex flex-wrap justify-center gap-6 lg:justify-start"
                  >
                    {achievements.map((achievement, i) => (
                      <motion.div
                        key={achievement.label}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.8 + i * 0.1, type: "spring" }}
                        whileHover={{ scale: 1.1, y: -5 }}
                        className="text-center px-4 py-3 rounded-2xl bg-slate-50/80 border border-slate-100"
                      >
                        <motion.div
                          animate={{ rotate: [0, 10, -10, 0] }}
                          transition={{ duration: 4, repeat: Infinity, delay: i * 0.5 }}
                        >
                          <achievement.icon className="h-5 w-5 mx-auto text-blue-500 mb-1" />
                        </motion.div>
                        <div className="text-2xl font-bold text-gradient-animate">{achievement.value}</div>
                        <div className="text-xs text-slate-500">{achievement.label}</div>
                      </motion.div>
                    ))}
                  </motion.div>

                  <motion.div 
                    className="mt-8 flex items-center justify-center gap-3 lg:justify-start"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.9 }}
                  >
                    {[
                      { icon: Linkedin, label: "LinkedIn", color: "from-blue-500 to-blue-600" },
                      { icon: Twitter, label: "Twitter", color: "from-cyan-500 to-cyan-600" },
                      { icon: Mail, label: "Email", color: "from-violet-500 to-violet-600" },
                    ].map((social, i) => (
                      <motion.a
                        key={social.label}
                        whileHover={{ scale: 1.15, y: -5, rotate: 5 }}
                        whileTap={{ scale: 0.9 }}
                        initial={{ opacity: 0, y: 20, rotate: -10 }}
                        whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.95 + i * 0.1, type: "spring" }}
                        href="#"
                        className="group relative flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-600 transition-all overflow-hidden"
                      >
                        <motion.div
                          className={`absolute inset-0 bg-gradient-to-br ${social.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                        />
                        <social.icon className="h-5 w-5 relative z-10 group-hover:text-white transition-colors" />
                      </motion.a>
                    ))}
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatedSection>
  )
}
