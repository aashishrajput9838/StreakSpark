import React from 'react';
import { Github, Twitter, Linkedin, Mail, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const productLinks = [
    { name: 'Features', path: '/features' },
    { name: 'Analytics', path: '/analytics' },
    { name: 'Goals', path: '/goals' },
  ];

  const companyLinks = [
    { name: 'Blog', path: '/blog' },
    { name: 'Careers', path: '/careers' },
  ];

  const supportLinks = [
    { name: 'Help Center', path: '/help' },
    { name: 'Privacy Policy', path: '/privacy' },
    { name: 'Terms of Service', path: '/terms' },
    { name: 'FAQ', path: '/faq' },
  ];

  const socialLinks = [
    { icon: Github, label: 'GitHub', href: 'https://github.com/aashishrajput9838' },
    { icon: Twitter, label: 'Twitter', href: 'https://x.com/aashish9838' },
    { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/aashishrajput9838/' },
    { icon: Mail, label: 'Email', href: 'mailto:aashishrajput9838@gmail.com' }
  ];

  return (
    <footer className="relative bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-20 h-20 bg-blue-400 rounded-full animate-pulse"></div>
        <div className="absolute top-32 right-20 w-16 h-16 bg-purple-400 rounded-full animate-bounce delay-75"></div>
        <div className="absolute bottom-20 left-1/3 w-12 h-12 bg-pink-400 rounded-full animate-ping delay-150"></div>
        <div className="absolute bottom-32 right-1/4 w-8 h-8 bg-cyan-400 rounded-full animate-pulse delay-300"></div>
      </div>

      <div className="relative container mx-auto px-6 py-12">
        {/* Main content */}
        <div className="text-center mb-8">
          <div className="text-3xl font-bold mb-2 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-fade-in">
            StreakSpark
          </div>
          <p className="text-slate-300 text-lg animate-fade-in delay-75">
            Ignite your potential, one streak at a time
          </p>
        </div>

        {/* Social links */}
        <div className="flex justify-center space-x-6 mb-8">
          {socialLinks.map(({ icon: Icon, label, href }, index) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative p-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 hover:border-white/40 transition-all duration-300 hover:scale-110 hover:bg-white/20 animate-fade-in"
              style={{ animationDelay: `${index * 100 + 150}ms` }}
              aria-label={label}
            >
              <Icon className="w-5 h-5 text-slate-300 group-hover:text-white transition-colors duration-300" />
              <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                {label}
              </div>
            </a>
          ))}
        </div>

        {/* Links section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 text-center md:text-left">
          <div className="animate-fade-in delay-300">
            <h3 className="text-lg font-semibold mb-4 text-blue-300">Product</h3>
            <ul className="space-y-2">
              {productLinks.map((item) => (
                <li key={item.name}>
                  <Link to={item.path} className="text-slate-400 hover:text-white transition-colors duration-300 hover:underline">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="animate-fade-in delay-500">
            <h3 className="text-lg font-semibold mb-4 text-purple-300">Company</h3>
            <ul className="space-y-2">
              {companyLinks.map((item) => (
                <li key={item.name}>
                  <Link to={item.path} className="text-slate-400 hover:text-white transition-colors duration-300 hover:underline">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="animate-fade-in delay-700">
            <h3 className="text-lg font-semibold mb-4 text-pink-300">Support</h3>
            <ul className="space-y-2">
              {supportLinks.map((item) => (
                <li key={item.name}>
                  <Link to={item.path} className="text-slate-400 hover:text-white transition-colors duration-300 hover:underline">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t border-white/20 pt-8 text-center">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-slate-400 animate-fade-in delay-900">
              © 2025 StreakSpark. All rights reserved.
            </div>
            <div className="flex items-center space-x-2 text-slate-400 animate-fade-in delay-1000">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-400 animate-pulse" />
              <span>for habit builders</span>
            </div>
          </div>
        </div>
      </div>

      {/* Subtle bottom glow */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent"></div>
    </footer>
  );
};

export default Footer;