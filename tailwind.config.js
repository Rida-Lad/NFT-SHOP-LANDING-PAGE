module.exports = {
    theme: {
      extend: {
        animation: {
          wave: 'wave 2s ease-in-out infinite',
          underline: 'underline 1.5s ease-in-out infinite',
          shimmer: 'shimmer 3s linear infinite',
        },
        keyframes: {
          wave: {
            '0%, 100%': { transform: 'translateY(0)' },
            '50%': { transform: 'translateY(-10px)' },
          },
          underline: {
            '0%, 100%': { transform: 'scaleX(0)' },
            '50%': { transform: 'scaleX(1)' },
          },
          shimmer: {
            '0%': { transform: 'translateX(-100%)' },
            '100%': { transform: 'translateX(100%)' },
          },
        },
      },
    },
  };