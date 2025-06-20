"use client"

import type React from "react"
import { motion } from "framer-motion"
import { Twitter, Instagram, Linkedin, Mouse, Sparkles, Target, Users, TrendingUp, Award, Heart } from "lucide-react"

const AnimatedAboutPage: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  }

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8, x: -50 },
    visible: {
      opacity: 1,
      scale: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  }

  const textVariants = {
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

  const socialIconVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4, ease: "backOut" },
    },
    hover: {
      scale: 1.2,
      rotate: 5,
      transition: { duration: 0.2 },
    },
  }

  const features = [
    {
      icon: Target,
      title: "Personalized Tracking",
      description: "AI-powered habit recommendations tailored to your lifestyle",
    },
    {
      icon: TrendingUp,
      title: "Progress Analytics",
      description: "Detailed insights and visualizations of your habit journey",
    },
    {
      icon: Users,
      title: "Community Support",
      description: "Connect with like-minded individuals for accountability",
    },
    {
      icon: Award,
      title: "Achievement System",
      description: "Celebrate milestones with our gamified reward system",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white flex flex-col items-center pt-8 pb-16 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 10,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.05, 0.15, 0.05],
          }}
          transition={{
            duration: 12,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 4,
          }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl"
        />
      </div>

      {/* Main Content Area */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-7xl bg-white/5 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/10 relative z-10"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
          {/* Left Column - Image */}
          <motion.div
            variants={imageVariants}
            className="bg-white/5 backdrop-blur-sm flex items-center justify-center p-8 lg:p-12"
          >
            <div className="relative">
              <motion.div
                className="absolute -inset-4 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl blur-xl"
                animate={{
                  scale: [1, 1.05, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: 4,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              />
              <motion.img
                src="/placeholder.svg?height=500&width=400"
                alt="StreakSpark Team"
                className="relative w-full h-auto object-cover max-h-[500px] shadow-2xl rounded-2xl border border-white/20"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              />
              <motion.div
                className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              />
              <motion.div
                className="absolute -bottom-4 -left-4 w-6 h-6 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"
                animate={{
                  scale: [1.2, 1, 1.2],
                  rotate: [360, 180, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                  delay: 1,
                }}
              />
            </div>
          </motion.div>

          {/* Right Column - About Content */}
          <motion.div
            variants={textVariants}
            className="p-8 md:p-12 lg:p-16 flex flex-col justify-center bg-white/5 backdrop-blur-sm border-l border-white/10"
          >
            <motion.div variants={itemVariants} className="mb-6">
              <motion.div
                className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 px-4 py-2 rounded-full border border-purple-500/30 mb-4"
                whileHover={{ scale: 1.05 }}
              >
                <Sparkles className="w-4 h-4 text-purple-400" />
                <span className="text-sm font-medium text-purple-300">About StreakSpark</span>
              </motion.div>
              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent leading-tight">
                STREAKSPARK
              </h1>
              <motion.h2
                variants={itemVariants}
                className="text-lg font-semibold text-purple-300 uppercase tracking-wide mt-2"
              >
                Your Habit Tracking Companion
              </motion.h2>
            </motion.div>

            <motion.section variants={itemVariants} className="space-y-8 text-gray-300 leading-relaxed mb-8">
              <motion.div
                variants={itemVariants}
                className="p-6 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm"
                whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.08)" }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-purple-500/20 rounded-lg">
                    <Heart className="w-5 h-5 text-purple-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white">Our Mission</h3>
                </div>
                <p>
                  At StreakSpark, we're dedicated to helping people build lasting habits that transform their lives. We
                  believe that small, consistent actions lead to significant changes over time.
                </p>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="p-6 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm"
                whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.08)" }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-blue-500/20 rounded-lg">
                    <Target className="w-5 h-5 text-blue-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white">What We Offer</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {features.map((feature, index) => (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      className="flex items-start gap-3 p-3 bg-white/5 rounded-xl border border-white/5"
                      whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
                    >
                      <div className="p-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg">
                        <feature.icon className="w-4 h-4 text-purple-300" />
                      </div>
                      <div>
                        <h4 className="font-medium text-white text-sm">{feature.title}</h4>
                        <p className="text-xs text-gray-400 mt-1">{feature.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="p-6 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm"
                whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.08)" }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-green-500/20 rounded-lg">
                    <Users className="w-5 h-5 text-green-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white">Our Story</h3>
                </div>
                <p>
                  StreakSpark was born from a simple idea: making habit formation accessible and enjoyable for everyone.
                  Our team of habit formation experts and developers came together to create a platform that combines
                  behavioral science with modern technology to help you achieve your goals.
                </p>
              </motion.div>
            </motion.section>

            {/* Social Icons */}
            <motion.div variants={itemVariants} className="flex space-x-4 mb-8">
              <motion.a
                href="#"
                variants={socialIconVariants}
                whileHover="hover"
                className="w-12 h-12 bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white text-sm font-bold border border-purple-500/30 hover:border-purple-400/50 transition-colors duration-200"
              >
                Bē
              </motion.a>
              <motion.a
                href="#"
                variants={socialIconVariants}
                whileHover="hover"
                className="w-12 h-12 bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white border border-purple-500/30 hover:border-purple-400/50 transition-colors duration-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="m19.5 8.5-7.5 7.5-4.5-4.5" />
                </svg>
              </motion.a>
              <motion.a
                href="#"
                variants={socialIconVariants}
                whileHover="hover"
                className="w-12 h-12 bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white border border-purple-500/30 hover:border-purple-400/50 transition-colors duration-200"
              >
                <Twitter size={20} />
              </motion.a>
              <motion.a
                href="#"
                variants={socialIconVariants}
                whileHover="hover"
                className="w-12 h-12 bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white border border-purple-500/30 hover:border-purple-400/50 transition-colors duration-200"
              >
                <Instagram size={20} />
              </motion.a>
              <motion.a
                href="#"
                variants={socialIconVariants}
                whileHover="hover"
                className="w-12 h-12 bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white border border-purple-500/30 hover:border-purple-400/50 transition-colors duration-200"
              >
                <Linkedin size={20} />
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="mt-12 mb-8"
      >
        <motion.div
          animate={{
            y: [0, 10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          className="p-4 bg-white/5 backdrop-blur-sm rounded-full border border-white/10"
        >
          <Mouse size={32} className="text-purple-300" />
        </motion.div>
      </motion.div>

      {/* Stats Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.8 }}
        className="w-full max-w-4xl mt-8 grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        {[
          { number: "10K+", label: "Active Users" },
          { number: "50K+", label: "Habits Tracked" },
          { number: "95%", label: "Success Rate" },
          { number: "24/7", label: "Support" },
        ].map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 2.2 + index * 0.1, duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
            className="text-center p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10"
          >
            <motion.div
              className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: index * 0.5 }}
            >
              {stat.number}
            </motion.div>
            <div className="text-sm text-gray-400 mt-1">{stat.label}</div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

export default AnimatedAboutPage
