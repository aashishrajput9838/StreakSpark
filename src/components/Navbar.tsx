"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { auth } from "../firebaseConfig"
import { onAuthStateChanged, signOut } from "firebase/auth"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { Menu, X, User, LogOut, Sparkles, Target, Info, Mail, BarChart3 } from "lucide-react"

const AnimatedNavbar: React.FC = () => {
  const [user, setUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
      setIsLoading(false)
    })
    return () => unsubscribe()
  }, [])

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true)
      await signOut(auth)
      navigate("/login")
    } catch (error: any) {
      console.error(error.message)
    } finally {
      setIsLoggingOut(false)
    }
  }

  const navItems = [
    { path: "/habits", label: "Habits", icon: Target },
    { path: "/index", label: "Dashboard", icon: BarChart3 },
    { path: "/about", label: "About", icon: Info },
    { path: "/contact", label: "Contact", icon: Mail },
  ]

  const isActivePath = (path: string) => location.pathname === path

  const navbarVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  }

  const mobileMenuVariants = {
    hidden: {
      opacity: 0,
      scale: 0.95,
      y: -20,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut",
        staggerChildren: 0.05,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      y: -20,
      transition: {
        duration: 0.2,
        ease: "easeIn",
      },
    },
  }

  const mobileItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.3 },
    },
  }

  return (
    <>
      <motion.nav
        variants={navbarVariants}
        initial="hidden"
        animate="visible"
        className="fixed top-0 left-0 right-0 z-50 bg-white/5 backdrop-blur-xl border-b border-white/10 text-white"
      >
        <div className="container mx-auto px-6 py-3">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <motion.div variants={itemVariants}>
              <Link to="/" className="flex items-center gap-2 group">
                <motion.div
                  className="p-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl border border-purple-500/30"
                  whileHover={{ scale: 1.05, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Sparkles className="w-6 h-6 text-purple-400" />
                </motion.div>
                <motion.span
                  className="text-2xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent"
                  whileHover={{ scale: 1.05 }}
                >
                  StreakSpark
                </motion.span>
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-2">
              <AnimatePresence mode="wait">
                {isLoading ? (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2 px-4 py-2"
                  >
                    <div className="w-4 h-4 bg-purple-500/50 rounded-full animate-pulse" />
                    <span className="text-sm text-gray-300">Loading...</span>
                  </motion.div>
                ) : user ? (
                  <motion.div
                    key="authenticated"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="flex items-center space-x-2"
                  >
                    {/* Navigation Items */}
                    <div className="flex items-center space-x-1">
                      {navItems.map((item) => (
                        <motion.div key={item.path} variants={itemVariants}>
                          <Link
                            to={item.path}
                            className={`relative flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-300 ${
                              isActivePath(item.path)
                                ? "bg-gradient-to-r from-purple-500/30 to-pink-500/30 text-white border border-purple-500/50"
                                : "text-gray-300 hover:text-white hover:bg-white/10"
                            }`}
                          >
                            <item.icon className="w-4 h-4" />
                            <span className="font-medium text-sm">{item.label}</span>
                          </Link>
                        </motion.div>
                      ))}
                    </div>

                    {/* User Section */}
                    <div className="flex items-center gap-3 ml-4 pl-4 border-l border-white/20">
                      {/* User Info */}
                      <div className="flex items-center gap-2 px-3 py-2 bg-white/5 rounded-lg border border-white/10">
                        <div className="w-7 h-7 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                          <User className="w-3 h-3 text-white" />
                        </div>
                        <span className="text-sm text-gray-300 hidden lg:block max-w-24 truncate">
                          {user.displayName || user.email?.split("@")[0]}
                        </span>
                      </div>

                      {/* Logout Button */}
                      <motion.button
                        onClick={handleLogout}
                        disabled={isLoggingOut}
                        className="flex items-center gap-2 px-3 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-300 hover:text-red-200 rounded-lg border border-red-500/30 hover:border-red-500/50 transition-all duration-300 disabled:opacity-50"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {isLoggingOut ? (
                          <div className="w-4 h-4 border-2 border-red-300 border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <LogOut className="w-4 h-4" />
                        )}
                        <span className="font-medium text-sm">Logout</span>
                      </motion.button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="unauthenticated"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    variants={itemVariants}
                  >
                    <Link
                      to="/login"
                      className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-lg font-medium transition-all duration-300 shadow-lg hover:shadow-xl"
                    >
                      <User className="w-4 h-4" />
                      <span className="text-sm">Login</span>
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              variants={itemVariants}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 bg-white/10 rounded-xl border border-white/20 hover:bg-white/20 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="w-6 h-6" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="w-6 h-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed top-20 left-4 right-4 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 z-50 md:hidden overflow-hidden"
            >
              <div className="p-6 space-y-4">
                {!isLoading && user && (
                  <>
                    {navItems.map((item) => (
                      <motion.div key={item.path} variants={mobileItemVariants}>
                        <Link
                          to={item.path}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                            isActivePath(item.path)
                              ? "bg-gradient-to-r from-purple-500/30 to-pink-500/30 text-white border border-purple-500/50"
                              : "text-gray-300 hover:text-white hover:bg-white/10"
                          }`}
                        >
                          <item.icon className="w-5 h-5" />
                          <span className="font-medium">{item.label}</span>
                        </Link>
                      </motion.div>
                    ))}

                    <motion.div variants={mobileItemVariants} className="pt-4 border-t border-white/20">
                      <div className="flex items-center gap-3 px-4 py-3 bg-white/5 rounded-xl border border-white/10 mb-4">
                        <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                          <User className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <div className="text-white font-medium">{user.displayName || user.email?.split("@")[0]}</div>
                          <div className="text-xs text-gray-400">{user.email}</div>
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          handleLogout()
                          setIsMobileMenuOpen(false)
                        }}
                        disabled={isLoggingOut}
                        className="w-full flex items-center gap-3 px-4 py-3 bg-red-500/20 hover:bg-red-500/30 text-red-300 hover:text-red-200 rounded-xl border border-red-500/30 hover:border-red-500/50 transition-all duration-300 disabled:opacity-50"
                      >
                        {isLoggingOut ? (
                          <div className="w-5 h-5 border-2 border-red-300 border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <LogOut className="w-5 h-5" />
                        )}
                        <span className="font-medium">Logout</span>
                      </button>
                    </motion.div>
                  </>
                )}

                {!isLoading && !user && (
                  <motion.div variants={mobileItemVariants}>
                    <Link
                      to="/login"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-xl font-medium transition-all duration-300"
                    >
                      <User className="w-5 h-5" />
                      Login
                    </Link>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Spacer for fixed navbar */}
      <div className="h-20" />
    </>
  )
}

export default AnimatedNavbar
