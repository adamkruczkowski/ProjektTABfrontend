import { nextui } from "@nextui-org/theme";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/components/(button|card|input|navbar|ripple|spinner).js",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [
    nextui({
      layout: {
        // disabledOpacity: "0.3", // opacity-[0.3]
        radius: {
          // small: "2px", // rounded-small
          // medium: "4px", // rounded-medium
          // large: "6px", // rounded-large
        },
        borderWidth: {
          // small: "1px", // border-small
          // medium: "1px", // border-medium
          // large: "2px", // border-large
        },
      },
      themes: {
        light: {
          colors: {
            primary: "#ff0000",
            background: "#f1f1f1",
            // default: "",
          },
        },
        dark: {},
      },
    }),
  ],
};
export default config;
