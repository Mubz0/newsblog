/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Scylax Brand Colors
        scylax: {
          cyan: '#00f0ff',
          purple: '#7b2cff',
          pink: '#ff00aa',
          dark: '#0a0a0f',
          darker: '#050508',
        },
        // Legacy mappings for compatibility
        primary: '#00f0ff',
        secondary: '#7b2cff',
        accent: '#ff00aa',
      },
      fontFamily: {
        display: ['Orbitron', 'system-ui', 'sans-serif'],
        sans: ['Space Grotesk', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'SF Mono', 'monospace'],
      },
      backgroundImage: {
        // Primary gradient (buttons, text)
        'scylax-gradient': 'linear-gradient(135deg, #00f0ff, #7b2cff, #ff00aa)',
        // Button gradient
        'button-gradient': 'linear-gradient(to right, #00f0ff, #7b2cff)',
        // Reverse gradient
        'scylax-gradient-reverse': 'linear-gradient(135deg, #ff00aa, #7b2cff, #00f0ff)',
        // Subtle gradients
        'hero-glow': 'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(0, 240, 255, 0.3), transparent)',
        'card-glow': 'radial-gradient(ellipse at center, rgba(123, 44, 255, 0.15), transparent 70%)',
        'mesh-gradient': 'radial-gradient(at 0% 0%, rgba(0, 240, 255, 0.15) 0px, transparent 50%), radial-gradient(at 100% 0%, rgba(123, 44, 255, 0.15) 0px, transparent 50%), radial-gradient(at 100% 100%, rgba(255, 0, 170, 0.1) 0px, transparent 50%)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'fade-in-up': 'fadeInUp 0.6s ease-out',
        'fade-in-down': 'fadeInDown 0.6s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-in-right': 'slideInRight 0.5s ease-out',
        'glow': 'glow 3s ease-in-out infinite',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 8s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out infinite 2s',
        'spin-slow': 'spin 20s linear infinite',
        'pulse-slow': 'pulse 4s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'gradient': 'gradient 8s ease infinite',
        'border-flow': 'borderFlow 3s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(-20px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        glow: {
          '0%, 100%': { opacity: '0.5' },
          '50%': { opacity: '1' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(0, 240, 255, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(0, 240, 255, 0.6)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-20px) rotate(2deg)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        borderFlow: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
      },
      boxShadow: {
        'glow-cyan': '0 0 20px rgba(0, 240, 255, 0.4)',
        'glow-cyan-lg': '0 0 40px rgba(0, 240, 255, 0.5)',
        'glow-purple': '0 0 20px rgba(123, 44, 255, 0.4)',
        'glow-purple-lg': '0 0 40px rgba(123, 44, 255, 0.5)',
        'glow-pink': '0 0 20px rgba(255, 0, 170, 0.4)',
        'card': '0 4px 20px rgba(0, 0, 0, 0.4)',
        'card-hover': '0 8px 40px rgba(0, 240, 255, 0.2)',
        'glass': '0 8px 32px rgba(0, 0, 0, 0.4)',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
