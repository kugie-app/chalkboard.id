import type { Config } from "tailwindcss";
import flowbite from "flowbite-react/tailwind";
const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",

    // Flowbite content
    flowbite.content(),
  ],
  theme: {
    extend: {
      boxShadow: {
        md: "0px 2px 4px -1px rgba(175, 182, 201, 0.2);",
        lg: "0 1rem 3rem rgba(0, 0, 0, 0.175)",
        "dark-md":
          "rgba(145, 158, 171, 0.3) 0px 0px 2px 0px, rgba(145, 158, 171, 0.02) 0px 12px 24px -4px",
        sm: "0 6px 24.2px -10px rgba(41, 52, 61, .22)",
        "btn-shadow": "box-shadow: rgba(0, 0, 0, .05) 0 9px 17.5px",
        tw:"rgba(175, 182, 201, 0.2) 0px 2px 4px -1px",
        btnshdw: "0 17px 20px -8px rgba(77, 91, 236, .231372549)",
        elevation1:"0px 12px 30px -2px rgba(58,75,116,0.14);",
        elevation2:"0px 24px 24px -12px rgba(0,0,0,0.05);",
        elevation3:"0px 24px 24px -12px rgba(99,91,255,0.15);",
        elevation4:"0px 12px 12px -6px rgba(0,0,0,0.15);"
      },
      borderRadius: {
        sm: "6px",
        md: "9px",
        lg: "24px",
        tw: "12px",
        bb: "20px",
      },
      container: {
        center: true,
        padding: "20px",
      },
      letterSpacing: {
        tightest: "-.075em",
        tighter: "-.05em",
        tight: "-.025em",
        normal: "0",
        wide: ".025em",
        wider: ".05em",
        widest: "1.5px",
      },
      gap: {
        "30": "30px",
      },
      padding: {
        "30": "30px",
      },
      margin: {
        "30": "30px",
      },
      fontSize: {
        "15": "15px",
        "17": "17px",
        "13": "13px",
        "22": "22px",
        "28": "28px",
        "34": "34px",
        "40": "40px",
        "44": "44px",
        "50": "50px",
        "56": "56px",
        "64": "64px",
      },
      colors: {
        cyan: {
          "500": "var(--color-primary)",
          "600": "var(--color-primary)",
          "700": "var(--color-primary)",
        },

        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        info: "var(--color-info)",
        success: "var(--color-success)",
        warning: "var(--color-warning)",
        error: "var(--color-error)",
        lightprimary: "var(--color-lightprimary)",
        lightsecondary: "var(--color-lightsecondary)",
        lightsuccess: "var( --color-lightsuccess)",
        lighterror: "var(--color-lighterror)",
        lightinfo: "var(--color-lightinfo)",
        lightwarning: "var(--color-lightwarning)",
        border: "var(--color-border)",
        bordergray: "var(--color-bordergray)",
        lightgray: "var( --color-lightgray)",
        muted: "var(--color-muted)",
        lighthover: "var(--color-lighthover)",
        surface: "var(--color-surface-ld)",
        sky: "var(--color-sky)",
        bodytext: "var(--color-bodytext)",
        //Dark Colors Variables
        dark: "var(--color-dark)",
        link: "var(--color-link)",
        darklink: "var(--color-darklink)",
        darkborder: "var(--color-darkborder)",
        darkgray: "var(--color-darkgray)",
        primaryemphasis: "var(--color-primary-emphasis)",
        secondaryemphasis: "var(--color-secondary-emphasis)",
        warningemphasis: "var(--color-warning-emphasis)",
        erroremphasis: "var(--color-error-emphasis)",
        successemphasis: "var(--color-success-emphasis)",
        infoemphasis: "var(--color-info-emphasis)",
        darkmuted: "var( --color-darkmuted)",
      },
    },
  },
  plugins: [
    //Add Flowbite Plugin
    require("flowbite/plugin"),
  ],
};
export default config;
