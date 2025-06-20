"use client"

import type React from "react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Mail, Phone, User, ArrowRight, CheckCircle, Loader2, Send, MapPin, Clock } from "lucide-react"

const AnimatedContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    message: "",
    privacyAccepted: false,
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [focusedField, setFocusedField] = useState<string | null>(null)

  const MESSAGE_MAX_LENGTH = 300

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.privacyAccepted) {
      alert("Please agree to the Privacy Policy terms.")
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    console.log("Form submitted:", formData)
    setIsSubmitted(true)
    setIsSubmitting(false)

    // Reset form after success animation
    setTimeout(() => {
      setFormData({
        fullName: "",
        email: "",
        phoneNumber: "",
        message: "",
        privacyAccepted: false,
      })
      setIsSubmitted(false)
    }, 3000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type, checked } = e.target as HTMLInputElement
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  const formVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.1,
      },
    },
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse delay-500" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 bg-white/5 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/10 relative z-10"
      >
        {/* Left Section - Text Content */}
        <motion.div variants={itemVariants} className="p-8 md:p-12 lg:p-16 flex flex-col justify-center relative">
          <motion.span
            variants={itemVariants}
            className="inline-block bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-semibold px-4 py-2 rounded-full mb-6 w-fit"
          >
            Contact Us
          </motion.span>

          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-6xl font-bold leading-tight mb-6 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent"
          >
            Let's Get In Touch.
          </motion.h1>

          <motion.p variants={itemVariants} className="text-gray-300 text-lg mb-8 leading-relaxed">
            Ready to start your next project? Drop us a line and let's create something amazing together.
          </motion.p>

          <motion.div variants={itemVariants} className="space-y-4">
            <div className="flex items-center gap-3 text-gray-300">
              <div className="p-2 bg-purple-500/20 rounded-lg">
                <Mail className="w-5 h-5 text-purple-400" />
              </div>
              <a href="mailto:hello@slothui.com" className="hover:text-purple-300 transition-colors">
                hello@slothui.com
              </a>
            </div>

            <div className="flex items-center gap-3 text-gray-300">
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <MapPin className="w-5 h-5 text-blue-400" />
              </div>
              <span>San Francisco, CA</span>
            </div>

            <div className="flex items-center gap-3 text-gray-300">
              <div className="p-2 bg-green-500/20 rounded-lg">
                <Clock className="w-5 h-5 text-green-400" />
              </div>
              <span>Response within 24 hours</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Section - Contact Form */}
        <motion.div
          variants={formVariants}
          className="bg-white/5 backdrop-blur-sm p-8 md:p-12 lg:p-16 border-l border-white/10"
        >
          <AnimatePresence mode="wait">
            {isSubmitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="flex flex-col items-center justify-center h-full text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mb-6"
                >
                  <CheckCircle className="w-10 h-10 text-green-400" />
                </motion.div>
                <h3 className="text-2xl font-bold mb-4">Message Sent!</h3>
                <p className="text-gray-300">Thank you for reaching out. We'll get back to you soon.</p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                className="space-y-6"
                initial={{ opacity: 1 }}
                animate={{ opacity: 1 }}
              >
                {/* Full Name */}
                <motion.div variants={itemVariants}>
                  <label htmlFor="fullName" className="block text-sm font-medium text-gray-300 mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <motion.div
                      animate={{
                        scale: focusedField === "fullName" ? 1.05 : 1,
                        color: focusedField === "fullName" ? "#a855f7" : "#9ca3af",
                      }}
                      className="absolute left-3 top-1/2 -translate-y-1/2 transition-colors"
                    >
                      <User size={20} />
                    </motion.div>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      onFocus={() => setFocusedField("fullName")}
                      onBlur={() => setFocusedField(null)}
                      placeholder="Enter your full name..."
                      className="w-full px-4 py-4 pl-12 rounded-xl bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 text-white placeholder-gray-400 transition-all duration-300 backdrop-blur-sm"
                      required
                    />
                  </div>
                </motion.div>

                {/* Email Address */}
                <motion.div variants={itemVariants}>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <motion.div
                      animate={{
                        scale: focusedField === "email" ? 1.05 : 1,
                        color: focusedField === "email" ? "#a855f7" : "#9ca3af",
                      }}
                      className="absolute left-3 top-1/2 -translate-y-1/2 transition-colors"
                    >
                      <Mail size={20} />
                    </motion.div>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onFocus={() => setFocusedField("email")}
                      onBlur={() => setFocusedField(null)}
                      placeholder="Enter your email address..."
                      className="w-full px-4 py-4 pl-12 rounded-xl bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 text-white placeholder-gray-400 transition-all duration-300 backdrop-blur-sm"
                      required
                    />
                  </div>
                </motion.div>

                {/* Phone Number */}
                <motion.div variants={itemVariants}>
                  <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-300 mb-2">
                    Phone Number
                  </label>
                  <div className="relative">
                    <motion.div
                      animate={{
                        scale: focusedField === "phoneNumber" ? 1.05 : 1,
                        color: focusedField === "phoneNumber" ? "#a855f7" : "#9ca3af",
                      }}
                      className="absolute left-3 top-1/2 -translate-y-1/2 transition-colors"
                    >
                      <Phone size={20} />
                    </motion.div>
                    <input
                      type="text"
                      id="phoneNumber"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      onFocus={() => setFocusedField("phoneNumber")}
                      onBlur={() => setFocusedField(null)}
                      placeholder="+1 (555) 000-0000"
                      className="w-full px-4 py-4 pl-12 rounded-xl bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 text-white placeholder-gray-400 transition-all duration-300 backdrop-blur-sm"
                    />
                  </div>
                </motion.div>

                {/* Message */}
                <motion.div variants={itemVariants}>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                    Message
                  </label>
                  <div className="relative">
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      onFocus={() => setFocusedField("message")}
                      onBlur={() => setFocusedField(null)}
                      rows={5}
                      maxLength={MESSAGE_MAX_LENGTH}
                      placeholder="Tell us about your project..."
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 resize-none transition-all duration-300 backdrop-blur-sm"
                      required
                    />
                    <motion.div
                      animate={{
                        color: formData.message.length > MESSAGE_MAX_LENGTH * 0.8 ? "#ef4444" : "#9ca3af",
                      }}
                      className="text-right text-sm mt-2 transition-colors"
                    >
                      {formData.message.length}/{MESSAGE_MAX_LENGTH}
                    </motion.div>
                  </div>
                </motion.div>

                {/* Privacy Policy Checkbox */}
                <motion.div variants={itemVariants} className="flex items-start gap-3">
                  <div className="relative">
                    <input
                      type="checkbox"
                      id="privacyAccepted"
                      name="privacyAccepted"
                      checked={formData.privacyAccepted}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <motion.div
                      onClick={() => setFormData((prev) => ({ ...prev, privacyAccepted: !prev.privacyAccepted }))}
                      className={`w-5 h-5 rounded border-2 cursor-pointer flex items-center justify-center transition-all duration-300 ${
                        formData.privacyAccepted
                          ? "bg-purple-500 border-purple-500"
                          : "border-white/30 hover:border-purple-500/50"
                      }`}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <AnimatePresence>
                        {formData.privacyAccepted && (
                          <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <CheckCircle className="w-3 h-3 text-white" />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  </div>
                  <label htmlFor="privacyAccepted" className="text-sm text-gray-300 leading-relaxed">
                    I hereby agree to our{" "}
                    <a href="#" className="text-purple-400 hover:text-purple-300 underline transition-colors">
                      Privacy Policy
                    </a>{" "}
                    terms.
                  </label>
                </motion.div>

                {/* Submit Button */}
                <motion.div variants={itemVariants}>
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:from-gray-500 disabled:to-gray-600 text-white font-semibold py-4 px-6 rounded-xl flex items-center justify-center transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:ring-offset-2 focus:ring-offset-transparent shadow-lg hover:shadow-xl disabled:cursor-not-allowed"
                    whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                    whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                  >
                    <AnimatePresence mode="wait">
                      {isSubmitting ? (
                        <motion.div
                          key="loading"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex items-center"
                        >
                          <Loader2 className="mr-2 animate-spin" size={20} />
                          Sending...
                        </motion.div>
                      ) : (
                        <motion.div
                          key="submit"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex items-center"
                        >
                          <Send className="mr-2" size={20} />
                          Send Message
                          <ArrowRight className="ml-2" size={20} />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.button>
                </motion.div>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default AnimatedContactPage
