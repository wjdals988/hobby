import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./hooks/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: "#07111f",
        panel: "#0f1c32",
        pulse: "#9ef01a",
        ember: "#ff5a5f",
        sky: "#59c3ff",
        mist: "#e6f3ff",
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(255,255,255,0.06), 0 24px 60px rgba(6, 17, 32, 0.45)",
      },
      fontFamily: {
        display: ['"Space Grotesk"', '"Pretendard Variable"', '"Segoe UI"', "sans-serif"],
        body: ['"Satoshi"', '"Pretendard Variable"', '"Segoe UI"', "sans-serif"],
      },
      backgroundImage: {
        "hero-grid":
          "radial-gradient(circle at top, rgba(89,195,255,0.18), transparent 32%), linear-gradient(135deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
      },
      backgroundSize: {
        grid: "100% 100%, 28px 28px",
      },
    },
  },
  plugins: [],
};

export default config;
