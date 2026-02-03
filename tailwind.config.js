/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        noir: "#050607",
        ink: "#0b0d11",
        midnight: "#12151c",
        slate: "#1b1f2a",
        ivory: "#f5efe4",
        champagne: "#e5cfa4",
        bronze: "#c59a5b",
        ember: "#f0b37a",
        jade: "#7fb2a1",
        sapphire: "#6aa4b9"
      },
      boxShadow: {
        halo: "0 0 40px rgba(197, 154, 91, 0.25)",
        deep: "0 30px 80px rgba(4, 6, 10, 0.75)",
        glass: "0 18px 50px rgba(4, 6, 10, 0.55)"
      },
      backgroundImage: {
        "hero-weave": "radial-gradient(circle at 15% 20%, rgba(197,154,91,0.25), transparent 55%), radial-gradient(circle at 85% 15%, rgba(106,164,185,0.22), transparent 50%), linear-gradient(120deg, rgba(10,12,16,0.98), rgba(10,12,16,0.8))",
        "gold-sheen": "linear-gradient(110deg, rgba(229,207,164,0.7), rgba(197,154,91,0.5), rgba(229,207,164,0.7))",
        "panel": "linear-gradient(140deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02))"
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" }
        },
        floatSoft: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" }
        },
        driftSlow: {
          "0%": { transform: "translate3d(0,0,0)" },
          "50%": { transform: "translate3d(12px,-10px,0)" },
          "100%": { transform: "translate3d(-8px,8px,0)" }
        },
        glowPulse: {
          "0%, 100%": { boxShadow: "0 0 0 rgba(197,154,91,0.0)" },
          "50%": { boxShadow: "0 0 40px rgba(197,154,91,0.35)" }
        },
        sweep: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" }
        },
        shimmer: {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "100% 50%" }
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" }
        },
      },
      animation: {
        float: "float 8s ease-in-out infinite",
        shimmer: "shimmer 10s ease-in-out infinite",
        fadeUp: "fadeUp 0.9s ease-out both",
        fadeIn: "fadeIn 1.2s ease-out both",
        floatSoft: "floatSoft 6s ease-in-out infinite",
        driftSlow: "driftSlow 18s ease-in-out infinite",
        glowPulse: "glowPulse 4.5s ease-in-out infinite",
        sweep: "sweep 5s linear infinite"
      }
    }
  },
  plugins: []
};
