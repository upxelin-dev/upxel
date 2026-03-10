import { motion } from "framer-motion"

export function GradientButton({
  children,
  href,
  variant = "primary",
  className = "",
  onClick,
}) {
  const baseStyles = "relative inline-flex items-center justify-center font-semibold transition-all duration-300 rounded-full"
  
  const variants = {
    primary: "group overflow-hidden bg-gradient-to-r from-blue-500 via-cyan-500 to-violet-500 text-white shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 px-8 py-4 text-base",
    secondary: "border-2 border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50 px-8 py-4 text-base",
  }

  const content = (
    <>
      {variant === "primary" && (
        <div className="absolute inset-0 bg-gradient-to-r from-violet-500 via-cyan-500 to-blue-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      )}
      <span className="relative z-10 flex items-center">{children}</span>
    </>
  )

  if (href) {
    return (
      <motion.a
        href={href}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`${baseStyles} ${variants[variant]} ${className}`}
      >
        {content}
      </motion.a>
    )
  }

  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {content}
    </motion.button>
  )
}
