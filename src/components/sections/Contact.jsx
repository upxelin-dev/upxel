import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"
import { useState, useRef } from "react"
import { AnimatedSection } from "../AnimatedSection"
import { Send, CheckCircle, Loader2, Sparkles, Mail, MessageSquare, User, ArrowRight, Zap } from "lucide-react"

export function Contact() {
  const [formState, setFormState] = useState("idle")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [focusedField, setFocusedField] = useState(null)
  
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -100])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setFormState("loading")
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setFormState("success")
    setFormData({ name: "", email: "", message: "" })
  }

  const inputFields = [
    { id: "name", label: "Name", type: "text", placeholder: "Your name", icon: User },
    { id: "email", label: "Email", type: "email", placeholder: "you@company.com", icon: Mail },
  ]

  return (
    <AnimatedSection id="contact" className="relative py-24 lg:py-32 overflow-hidden">
      <motion.div 
        style={{ y: backgroundY }}
        className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-violet-50" 
      />
      <div 
        className="absolute inset-0 opacity-60" 
        style={{ background: "var(--gradient-mesh)" }}
      />
      
      <motion.div
        className="absolute top-20 left-10 w-80 h-80 bg-gradient-to-br from-blue-300/30 to-cyan-300/20 rounded-full blur-3xl"
        animate={{ 
          scale: [1, 1.3, 1],
          x: [0, 50, 0],
          y: [0, -30, 0],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-violet-300/30 to-purple-300/20 rounded-full blur-3xl"
        animate={{ 
          scale: [1.3, 1, 1.3],
          x: [0, -50, 0],
          y: [0, 30, 0],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-cyan-300/20 to-teal-300/10 rounded-full blur-3xl"
        animate={{ 
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />
      
      <div ref={sectionRef} className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-3 mb-6"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="h-5 w-5 text-blue-500" />
            </motion.div>
            <motion.div
              className="px-4 py-1.5 rounded-full bg-blue-100/80 border border-blue-200/80"
              whileHover={{ scale: 1.05 }}
            >
              <span className="text-sm font-bold uppercase tracking-widest text-blue-600">
                Get Started
              </span>
            </motion.div>
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="h-5 w-5 text-blue-500" />
            </motion.div>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.8 }}
            className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl"
          >
            Let's Scale{" "}
            <span className="text-gradient-animate">Your Brand</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mt-4 text-lg text-slate-600"
          >
            Ready to transform your digital presence? Get a free audit and discover how we can accelerate your growth.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.7, type: "spring" }}
          className="mx-auto mt-14 max-w-xl"
        >
          <div className="relative overflow-hidden rounded-3xl p-1">
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-blue-500 via-cyan-500 to-violet-500 opacity-70"
              animate={{ 
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{ duration: 5, repeat: Infinity }}
              style={{ backgroundSize: "200% 200%" }}
            />
            
            <div className="relative overflow-hidden rounded-[22px] bg-white/95 backdrop-blur-xl p-8 shadow-2xl lg:p-10">
              <motion.div 
                className="absolute -top-32 -right-32 h-64 w-64 rounded-full bg-gradient-to-br from-blue-400/20 via-cyan-400/20 to-violet-400/20 blur-3xl"
                animate={{ scale: [1, 1.3, 1], rotate: [0, 180, 360] }}
                transition={{ duration: 10, repeat: Infinity }}
              />
              <motion.div 
                className="absolute -bottom-32 -left-32 h-64 w-64 rounded-full bg-gradient-to-br from-violet-400/20 via-cyan-400/20 to-blue-400/20 blur-3xl"
                animate={{ scale: [1.3, 1, 1.3], rotate: [360, 180, 0] }}
                transition={{ duration: 10, repeat: Infinity }}
              />

              <AnimatePresence mode="wait">
                {formState === "success" ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.8, y: 30 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8, y: -30 }}
                    className="relative flex flex-col items-center py-10 text-center"
                  >
                    <motion.div 
                      className="flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br from-green-400 to-emerald-500 shadow-2xl"
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.5, type: "spring" }}
                      >
                        <CheckCircle className="h-12 w-12 text-white" />
                      </motion.div>
                    </motion.div>
                    
                    <motion.h3 
                      className="mt-8 text-2xl font-bold text-slate-900"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      Message Sent!
                    </motion.h3>
                    
                    <motion.p 
                      className="mt-3 text-slate-600 max-w-xs"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      Thanks for reaching out. We'll get back to you within 24 hours.
                    </motion.p>
                    
                    <motion.button
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                      onClick={() => setFormState("idle")}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 transition-colors"
                    >
                      <MessageSquare className="h-4 w-4" />
                      Send another message
                    </motion.button>
                  </motion.div>
                ) : (
                  <motion.form 
                    key="form"
                    onSubmit={handleSubmit} 
                    className="relative space-y-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {inputFields.map((field, i) => (
                      <motion.div
                        key={field.id}
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 + i * 0.1, type: "spring" }}
                      >
                        <label htmlFor={field.id} className="block text-sm font-semibold text-slate-700 mb-2">
                          {field.label}
                        </label>
                        <motion.div 
                          className="relative"
                          animate={focusedField === field.id ? { scale: 1.02 } : { scale: 1 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <motion.div
                            className="absolute left-4 top-1/2 -translate-y-1/2"
                            animate={focusedField === field.id ? { scale: 1.1, color: "#3b82f6" } : { scale: 1, color: "#94a3b8" }}
                          >
                            <field.icon className="h-5 w-5" />
                          </motion.div>
                          <input
                            type={field.type}
                            id={field.id}
                            required
                            value={formData[field.id]}
                            onChange={(e) => setFormData({ ...formData, [field.id]: e.target.value })}
                            onFocus={() => setFocusedField(field.id)}
                            onBlur={() => setFocusedField(null)}
                            className="block w-full rounded-xl border-2 border-slate-200 bg-white pl-12 pr-4 py-4 text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/20 transition-all duration-300"
                            placeholder={field.placeholder}
                          />
                          <motion.div
                            className="absolute inset-0 rounded-xl pointer-events-none"
                            animate={focusedField === field.id ? { boxShadow: "0 0 0 4px rgba(59, 130, 246, 0.15)" } : { boxShadow: "0 0 0 0px rgba(59, 130, 246, 0)" }}
                            transition={{ duration: 0.2 }}
                          />
                        </motion.div>
                      </motion.div>
                    ))}

                    <motion.div
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3, type: "spring" }}
                    >
                      <label htmlFor="message" className="block text-sm font-semibold text-slate-700 mb-2">
                        Message
                      </label>
                      <motion.div
                        animate={focusedField === "message" ? { scale: 1.02 } : { scale: 1 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <textarea
                          id="message"
                          required
                          rows={4}
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          onFocus={() => setFocusedField("message")}
                          onBlur={() => setFocusedField(null)}
                          className="block w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-4 text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/20 transition-all duration-300 resize-none"
                          placeholder="Tell us about your project..."
                        />
                      </motion.div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4 }}
                    >
                      <motion.button
                        type="submit"
                        disabled={formState === "loading"}
                        whileHover={{ scale: formState === "loading" ? 1 : 1.03, y: formState === "loading" ? 0 : -3 }}
                        whileTap={{ scale: formState === "loading" ? 1 : 0.97 }}
                        className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-blue-500 via-cyan-500 to-violet-500 px-8 py-5 text-base font-bold text-white shadow-xl shadow-blue-500/30 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/40 disabled:cursor-not-allowed disabled:opacity-70"
                      >
                        <motion.div 
                          className="absolute inset-0 bg-gradient-to-r from-violet-500 via-cyan-500 to-blue-500"
                          initial={{ x: "100%" }}
                          whileHover={{ x: 0 }}
                          transition={{ duration: 0.4 }}
                        />
                        <span className="relative z-10 flex items-center justify-center gap-3">
                          {formState === "loading" ? (
                            <>
                              <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                              >
                                <Loader2 className="h-5 w-5" />
                              </motion.div>
                              Sending...
                            </>
                          ) : (
                            <>
                              <motion.span
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                              >
                                <Zap className="h-5 w-5" />
                              </motion.span>
                              Get Free Audit
                              <motion.span
                                animate={{ x: [0, 5, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                              >
                                <ArrowRight className="h-5 w-5" />
                              </motion.span>
                            </>
                          )}
                        </span>
                      </motion.button>
                    </motion.div>

                    <motion.p 
                      className="text-center text-xs text-slate-500 mt-4"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 }}
                    >
                      <motion.span
                        className="inline-flex items-center gap-1"
                      >
                        <motion.span
                          className="h-2 w-2 rounded-full bg-green-500"
                          animate={{ scale: [1, 1.3, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                        Usually responds within 24 hours
                      </motion.span>
                    </motion.p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-8 text-center"
        >
          {[
            { label: "Free Consultation", icon: "🎯" },
            { label: "No Commitment", icon: "✓" },
            { label: "Expert Insights", icon: "💡" },
          ].map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7 + i * 0.1 }}
              whileHover={{ scale: 1.05, y: -3 }}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-slate-200/80 shadow-sm"
            >
              <span>{item.icon}</span>
              <span className="text-sm font-medium text-slate-700">{item.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </AnimatedSection>
  )
}
