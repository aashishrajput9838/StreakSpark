"use client"

import type React from "react"
import { useState } from "react"
import { motion, AnimatePresence, Variants } from "framer-motion"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { useAuthContext } from "@/contexts/AuthContext"
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
  LogIn,
  UserPlus,
} from "lucide-react"

const AnimatedNavbar: React.FC = () => {
  const { user, logout, loading } = useAuthContext()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true)
      await logout()
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

  const authNavItems = [
    { path: "/login", label: "Login", icon: LogIn },
    { path: "/signup", label: "Sign Up", icon: UserPlus },
  ]

  const isActivePath = (path: string) => location.pathname === path

  const navbarVariants: Variants = {
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

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  }

  const mobileMenuVariants: Variants = {
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

  const mobileItemVariants: Variants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.3 },
    },
  }

  // Enhanced button animation variants
  const buttonVariants: Variants = {
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

  const iconVariants: Variants = {
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

  const navButtonVariants: Variants = {
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

  const logoutButtonVariants: Variants = {
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

  const mobileButtonVariants: Variants = {
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
              {user ? (
                <>
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
                          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 border ${
                            isActivePath(item.path)
                              ? "bg-purple-500/20 text-purple-300 shadow-inner border-purple-500/50"
                              : "border-gray-600 text-gray-300 hover:bg-gray-700/50 hover:text-white hover:border-purple-400"
                          }`}
                        >
                          <item.icon className={`w-4 h-4 transition-transform duration-300 ${isActivePath(item.path) ? 'rotate-6' : ''}`} />
                          <span className="text-sm font-medium">{item.label}</span>
                        </Link>
                      </motion.div>
                    </motion.div>
                  ))}
                  <motion.div variants={itemVariants}>
                    <motion.button
                      onClick={handleLogout}
                      disabled={isLoggingOut}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-red-400 bg-red-500/10 hover:bg-red-500/20 transition-all duration-300 disabled:opacity-50"
                      variants={logoutButtonVariants}
                      initial="idle"
                      whileHover="hover"
                      whileTap="tap"
                    >
                      {isLoggingOut ? "Logging out..." : "Logout"}
                      <LogOut className="w-4 h-4" />
                    </motion.button>
                  </motion.div>
                </>
              ) : (
                !loading && (
                  <>
                    {authNavItems.map((item) => (
                      <motion.div key={item.path} variants={itemVariants}>
                        <motion.div
                          variants={navButtonVariants}
                          initial="idle"
                          whileHover="hover"
                          whileTap="tap"
                        >
                          <Link
                            to={item.path}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 border ${
                              isActivePath(item.path)
                                ? "bg-purple-500/20 text-purple-300 shadow-inner border-purple-500/50"
                                : "border-gray-600 text-gray-300 hover:bg-gray-700/50 hover:text-white hover:border-purple-400"
                            }`}
                          >
                            <item.icon className="w-4 h-4" />
                            <span className="text-sm font-medium">{item.label}</span>
                          </Link>
                        </motion.div>
                      </motion.div>
                    ))}
                  </>
                )
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
                {user ? (
                  <>
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
                            className={`flex items-center gap-4 p-4 rounded-xl text-lg transition-all duration-300 border ${
                              isActivePath(item.path)
                                ? "bg-purple-500/30 text-white border-purple-500/80"
                                : "border-gray-700 text-gray-300 hover:bg-gray-800 hover:border-gray-600"
                            }`}
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            <item.icon className="w-6 h-6" />
                            {item.label}
                          </Link>
                        </motion.div>
                      </motion.div>
                    ))}
                    <motion.div variants={mobileItemVariants}>
                      <motion.button
                        onClick={handleLogout}
                        disabled={isLoggingOut}
                        className="w-full flex items-center gap-4 p-4 rounded-xl text-lg text-red-400 bg-red-500/10 hover:bg-red-500/20 transition-all duration-300 disabled:opacity-50"
                        variants={mobileButtonVariants}
                        initial="idle"
                        whileHover="hover"
                        whileTap="tap"
                      >
                        <LogOut className="w-6 h-6" />
                        {isLoggingOut ? "Logging out..." : "Logout"}
                      </motion.button>
                    </motion.div>
                  </>
                ) : (
                  !loading && (
                    <>
                      {authNavItems.map((item) => (
                        <motion.div key={item.path} variants={mobileItemVariants}>
                          <motion.div
                            variants={mobileButtonVariants}
                            initial="idle"
                            whileHover="hover"
                            whileTap="tap"
                          >
                            <Link
                              to={item.path}
                              className={`flex items-center gap-4 p-4 rounded-xl text-lg transition-all duration-300 border ${
                                isActivePath(item.path)
                                  ? "bg-purple-500/30 text-white border-purple-500/80"
                                  : "border-gray-700 text-gray-300 hover:bg-gray-800 hover:border-gray-600"
                              }`}
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              <item.icon className="w-6 h-6" />
                              {item.label}
                            </Link>
                          </motion.div>
                        </motion.div>
                      ))}
                    </>
                  )
                )}

                {user && (
                  <motion.div
                    variants={mobileItemVariants}
                    className="flex items-center gap-3"
                  >
                    <User className="w-8 h-8 p-1.5 bg-gray-700 rounded-full" />
                    <div>
                      <div className="font-semibold">{user.displayName}</div>
                      <div className="text-sm text-gray-400">{user.email}</div>
                    </div>
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