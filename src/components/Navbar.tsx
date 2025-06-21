"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { auth } from "../firebaseConfig"
import { onAuthStateChanged, signOut } from "firebase/auth"
import { Link, useNavigate, useLocation } from "react-router-dom"
import {
  Menu,
  X,
  User,
  LogOut,
  Sparkles,
  Target,
  Info,
  Mail,
  BarChart3,
} from "lucide-react"

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
    { path: "/", label: "Dashboard", icon: BarChart3 },
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
    hidden: { opacity: 0, scale: 0.95, y: -20 },
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
      transition: { duration: 0.2, ease: "easeIn" },
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

  // Enhanced button animation variants
  const buttonVariants = {
    idle: { scale: 1, y: 0 },
    hover: { 
      scale: 1.05, 
      y: -2,
      transition: { 
        type: "spring", 
        stiffness: 400, 
        damping: 17 
      }
    },
    tap: { 
      scale: 0.98, 
      y: 0,
      transition: { 
        duration: 0.1 
      }
    }
  }

  const iconVariants = {
    idle: { rotate: 0, scale: 1 },
    hover: { 
      rotate: 5, 
      scale: 1.1,
      transition: { 
        type: "spring", 
        stiffness: 400, 
        damping: 17 
      }
    },
    tap: { 
      rotate: -2, 
      scale: 0.95,
      transition: { 
        duration: 0.1 
      }
    }
  }

  const navButtonVariants = {
    idle: { scale: 1, x: 0 },
    hover: { 
      scale: 1.02, 
      x: 3,
      transition: { 
        type: "spring", 
        stiffness: 400, 
        damping: 17 
      }
    },
    tap: { 
      scale: 0.98, 
      x: 0,
      transition: { 
        duration: 0.1 
      }
    }
  }

  const logoutButtonVariants = {
    idle: { scale: 1, rotate: 0 },
    hover: { 
      scale: 1.05, 
      rotate: -1,
      transition: { 
        type: "spring", 
        stiffness: 400, 
        damping: 17 
      }
    },
    tap: { 
      scale: 0.95, 
      rotate: 1,
      transition: { 
        duration: 0.1 
      }
    }
  }

  const mobileButtonVariants = {
    idle: { scale: 1, x: 0 },
    hover: { 
      scale: 1.02, 
      x: 5,
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 20 
      }
    },
    tap: { 
      scale: 0.98, 
      x: 0,
      transition: { 
        duration: 0.1 
      }
    }
  }

  return (
    <>
      {/* Navbar */}
      <motion.nav
        variants={navbarVariants}
        initial="hidden"
        animate="visible"
        className="fixed top-0 left-0 right-0 z-50 bg-gray-900/95 backdrop-blur-xl border-b border-gray-700/50 text-white shadow-xl"
      >
        <div className="container mx-auto px-6 py-3">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <motion.div variants={itemVariants}>
              <Link to="/" className="flex items-center gap-2 group">
                <motion.div
                  className="p-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl border border-purple-500/30"
                  variants={buttonVariants}
                  initial="idle"
                  whileHover="hover"
                  whileTap="tap"
                >
                  <motion.div variants={iconVariants}>
                    <Sparkles className="w-6 h-6 text-purple-400" />
                  </motion.div>
                </motion.div>
                <motion.span
                  className="text-2xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  StreakSpark
                </motion.span>
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-2">
              {navItems.map((item) => (
                <motion.div key={item.path} variants={itemVariants}>
                  <motion.div
                    variants={navButtonVariants}
                    initial="idle"
                    whileHover="hover"
                    whileTap="tap"
                  >
                    <Link
                      to={item.path}
                      className={`relative flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 font-medium ${
                        isActivePath(item.path)
                          ? "bg-gradient-to-r from-purple-500/50 to-pink-500/50 text-white border border-purple-400/70 shadow-lg"
                          : "text-white hover:text-white hover:bg-gray-700/50 border border-transparent hover:border-gray-600/50"
                      }`}
                    >
                      <motion.div
                        variants={iconVariants}
                        initial="idle"
                        whileHover="hover"
                        whileTap="tap"
                      >
                        <item.icon className="w-4 h-4" />
                      </motion.div>
                      <span className="text-sm">{item.label}</span>
                      {isActivePath(item.path) && (
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg -z-10"
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ type: "spring", stiffness: 400, damping: 17 }}
                        />
                      )}
                    </Link>
                  </motion.div>
                </motion.div>
              ))}

              {/* User Section */}
              {!isLoading && user && (
                <div className="flex items-center gap-3 ml-4 pl-4 border-l border-gray-600/50">
                  {/* User Info */}
                  <motion.div 
                    className="flex items-center gap-2 px-3 py-2 bg-gray-800/50 rounded-lg border border-gray-600/50 backdrop-blur-sm"
                    whileHover={{ scale: 1.02, y: -1 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <motion.div 
                      className="w-7 h-7 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center"
                      whileHover={{ rotate: 5, scale: 1.1 }}
                      whileTap={{ rotate: -5, scale: 0.95 }}
                      transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    >
                      <User className="w-3 h-3 text-white" />
                    </motion.div>
                    <span className="text-sm text-gray-200 hidden lg:block max-w-24 truncate">
                      {user.displayName || user.email?.split("@")[0]}
                    </span>
                  </motion.div>

                  {/* Logout Button */}
                  <motion.button
                    onClick={handleLogout}
                    disabled={isLoggingOut}
                    className="flex items-center gap-2 px-4 py-2 bg-red-500/20 hover:bg-red-500/40 text-red-200 hover:text-white rounded-lg border border-red-500/50 hover:border-red-400/70 transition-all duration-300 disabled:opacity-50 font-medium shadow-lg"
                    variants={logoutButtonVariants}
                    initial="idle"
                    whileHover="hover"
                    whileTap="tap"
                  >
                    <motion.div
                      animate={isLoggingOut ? { rotate: 360 } : { rotate: 0 }}
                      transition={isLoggingOut ? { duration: 1, repeat: Infinity, ease: "linear" } : { duration: 0.2 }}
                    >
                      {isLoggingOut ? (
                        <div className="w-4 h-4 border-2 border-red-300 border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <LogOut className="w-4 h-4" />
                      )}
                    </motion.div>
                    <span className="text-sm">Logout</span>
                  </motion.button>
                </div>
              )}

              {!isLoading && !user && (
                <motion.div
                  variants={buttonVariants}
                  initial="idle"
                  whileHover="hover"
                  whileTap="tap"
                >
                  <Link
                    to="/login"
                    className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-lg font-medium transition-all duration-300 shadow-lg hover:shadow-xl border border-purple-400/30"
                  >
                    <motion.div
                      variants={iconVariants}
                      initial="idle"
                      whileHover="hover"
                      whileTap="tap"
                    >
                      <User className="w-4 h-4" />
                    </motion.div>
                    <span className="text-sm">Login</span>
                  </Link>
                </motion.div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              variants={itemVariants}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 bg-gray-800/50 rounded-xl border border-gray-600/50 hover:bg-gray-700/50 transition-colors backdrop-blur-sm"
              whileHover={{ scale: 1.05, rotate: 2 }}
              whileTap={{ scale: 0.95, rotate: -2 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
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
                    <X className="w-6 h-6 text-white" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="w-6 h-6 text-white" />
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
              className="fixed top-20 left-4 right-4 bg-gray-900/95 backdrop-blur-xl rounded-2xl border border-gray-700/50 z-50 md:hidden overflow-hidden shadow-2xl"
            >
              <div className="p-6 space-y-4">
                {navItems.map((item) => (
                  <motion.div key={item.path} variants={mobileItemVariants}>
                    <motion.div
                      variants={mobileButtonVariants}
                      initial="idle"
                      whileHover="hover"
                      whileTap="tap"
                    >
                      <Link
                        to={item.path}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 font-medium ${
                          isActivePath(item.path)
                            ? "bg-gradient-to-r from-purple-500/50 to-pink-500/50 text-white border border-purple-400/70"
                            : "text-white hover:text-white hover:bg-gray-700/50 border border-transparent hover:border-gray-600/50"
                        }`}
                      >
                        <motion.div
                          whileHover={{ rotate: 5, scale: 1.1 }}
                          whileTap={{ rotate: -5, scale: 0.95 }}
                          transition={{ type: "spring", stiffness: 400, damping: 17 }}
                        >
                          <item.icon className="w-5 h-5" />
                        </motion.div>
                        <span>{item.label}</span>
                      </Link>
                    </motion.div>
                  </motion.div>
                ))}

                {!isLoading && user && (
                  <motion.div variants={mobileItemVariants} className="pt-4 border-t border-gray-600/50">
                    <motion.div 
                      className="flex items-center gap-3 px-4 py-3 bg-gray-800/50 rounded-xl border border-gray-600/50 mb-4"
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    >
                      <motion.div 
                        className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center"
                        whileHover={{ rotate: 5, scale: 1.05 }}
                        whileTap={{ rotate: -5, scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                      >
                        <User className="w-5 h-5 text-white" />
                      </motion.div>
                      <div>
                        <div className="text-white font-medium">
                          {user.displayName || user.email?.split("@")[0]}
                        </div>
                        <div className="text-xs text-gray-400">{user.email}</div>
                      </div>
                    </motion.div>

                    <motion.button
                      onClick={() => {
                        handleLogout()
                        setIsMobileMenuOpen(false)
                      }}
                      disabled={isLoggingOut}
                      className="w-full flex items-center gap-3 px-4 py-3 bg-red-500/20 hover:bg-red-500/40 text-red-200 hover:text-white rounded-xl border border-red-500/50 hover:border-red-400/70 transition-all duration-300 disabled:opacity-50 font-medium"
                      variants={mobileButtonVariants}
                      initial="idle"
                      whileHover="hover"
                      whileTap="tap"
                    >
                      <motion.div
                        animate={isLoggingOut ? { rotate: 360 } : { rotate: 0 }}
                        transition={isLoggingOut ? { duration: 1, repeat: Infinity, ease: "linear" } : { duration: 0.2 }}
                      >
                        {isLoggingOut ? (
                          <div className="w-5 h-5 border-2 border-red-300 border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <LogOut className="w-5 h-5" />
                        )}
                      </motion.div>
                      <span>Logout</span>
                    </motion.button>
                  </motion.div>
                )}

                {!isLoading && !user && (
                  <motion.div variants={mobileItemVariants}>
                    <motion.div
                      variants={mobileButtonVariants}
                      initial="idle"
                      whileHover="hover"
                      whileTap="tap"
                    >
                      <Link
                        to="/login"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-xl font-medium transition-all duration-300 shadow-lg"
                      >
                        <motion.div
                          whileHover={{ rotate: 5, scale: 1.1 }}
                          whileTap={{ rotate: -5, scale: 0.95 }}
                          transition={{ type: "spring", stiffness: 400, damping: 17 }}
                        >
                          <User className="w-5 h-5" />
                        </motion.div>
                        Login
                      </Link>
                    </motion.div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Spacer for navbar */}
      <div className="h-20" />
    </>
  )
}

export default AnimatedNavbar