/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        'xs': '320px',
        'sm': '375px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1440px',
        '2xl': '1920px'
      },
      spacing: {
        '18': '4.5rem',
        '112': '28rem',
        '128': '32rem',
        'safe-top': 'env(safe-area-inset-top)',
        'safe-bottom': 'env(safe-area-inset-bottom)',
        'safe-left': 'env(safe-area-inset-left)',
        'safe-right': 'env(safe-area-inset-right)'
      },
      maxWidth: {
        '8xl': '88rem',
        '9xl': '96rem',
      },
      minHeight: {
        'touch': '44px'
      },
      minWidth: {
        'touch': '44px'
      },
      fontSize: {
        'xxs': '0.625rem',
        'dynamic-sm': 'clamp(0.75rem, 1vw, 0.875rem)',
        'dynamic-base': 'clamp(0.875rem, 1.2vw, 1rem)',
        'dynamic-lg': 'clamp(1rem, 1.5vw, 1.125rem)',
        'dynamic-xl': 'clamp(1.125rem, 2vw, 1.25rem)'
      },
      height: {
        'screen-90': '90vh',
        'screen-safe': 'calc(100vh - env(safe-area-inset-top) - env(safe-area-inset-bottom))'
      },
      minHeight: {
        'screen-75': '75vh',
      },
      zIndex: {
        '60': '60',
        '70': '70',
        'modal': '100',
        'overlay': '90'
      },
      animation: {
        'fade-in': 'fadeIn 0.2s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-down': 'slideDown 0.3s ease-out'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        slideUp: {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' }
        },
        slideDown: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(0)' }
        }
      }
    },
    fontFamily: {
      sans: ['Poppins', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
    },
  },
  plugins: [
    function({ addBase, theme }) {
      addBase({
        '@supports (-webkit-touch-callout: none)': {
          'min-height': '-webkit-fill-available'
        }
      });
    }
  ],
};
