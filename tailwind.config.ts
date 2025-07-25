/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        stroke: "#E6EBF1",
        "stroke-dark": "#27303E",
        dark: {
          DEFAULT: "#111928",
          2: "#1F2A37",
          3: "#374151",
          4: "#4B5563",
          5: "#6B7280",
          6: "#9CA3AF",
          7: "#D1D5DB",
          8: "#E5E7EB",
        },
        gray: {
          DEFAULT: "#EFF4FB",
          dark: "#122031",
          1: "#F9FAFB",
          2: "#F3F4F6",
          3: "#E5E7EB",
          4: "#D1D5DB",
          5: "#9CA3AF",
          6: "#6B7280",
          7: "#374151",
        },
        green: {
          DEFAULT: "#22AD5C",
          dark: "#1A8245",
          light: {
            DEFAULT: "#2CD673",
            1: "#10B981",
            2: "#57DE8F",
            3: "#82E6AC",
            4: "#ACEFC8",
            5: "#C2F3D6",
            6: "#DAF8E6",
            7: "#E9FBF0",
          },
        },
        red: {
          DEFAULT: "#F23030",
          dark: "#E10E0E",
          light: {
            DEFAULT: "#F56060",
            2: "#F89090",
            3: "#FBC0C0",
            4: "#FDD8D8",
            5: "#FEEBEB",
            6: "#FEF3F3",
          },
        },
        blue: {
          DEFAULT: "#3C50E0",
          dark: "#1C3FB7",
          light: {
            DEFAULT: "#5475E5",
            2: "#8099EC",
            3: "#ADBCF2",
            4: "#C3CEF6",
            5: "#E1E8FF",
          },
        },
        orange: {
          light: {
            DEFAULT: "#F59460",
          },
        },
        yellow: {
          dark: {
            DEFAULT: "#F59E0B",
            2: "#D97706",
          },
          light: {
            DEFAULT: "#FCD34D",
            4: "#FFFBEB",
          },
        },
        primary: {
          DEFAULT: "#0F75B9",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "#F4941C",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      screens: {
        "2xsm": "375px",
        xsm: "425px",
        "3xl": "2000px",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      boxShadow: {
        default: "0px 4px 7px 0px rgba(0, 0, 0, 0.14)",
        error: "0px 12px 34px 0px rgba(13, 10, 44, 0.05)",
        card: "0px 1px 2px 0px rgba(0, 0, 0, 0.12)",
        "card-2": "0px 8px 13px -3px rgba(0, 0, 0, 0.07)",
        "card-3": "0px 2px 3px 0px rgba(183, 183, 183, 0.50)",
        "card-4": "0px 1px 3px 0px rgba(0, 0, 0, 0.12)",
        "card-5": "0px 1px 3px 0px rgba(0, 0, 0, 0.13)",
        "card-6": "0px 3px 8px 0px rgba(0, 0, 0, 0.08)",
        "card-7": "0px 0.5px 3px 0px rgba(0, 0, 0, 0.18)",
        "card-8": "0px 1px 2px 0px rgba(0, 0, 0, 0.10)",
        "card-9": "0px 1px 3px 0px rgba(0, 0, 0, 0.08)",
        "card-10": "0px 2px 3px 0px rgba(0, 0, 0, 0.10)",
        switcher:
          "0px 2px 4px rgba(0, 0, 0, 0.2), inset 0px 2px 2px #FFFFFF, inset 0px -1px 1px rgba(0, 0, 0, 0.1)",
        "switch-1": "0px 0px 4px 0px rgba(0, 0, 0, 0.10)",
        "switch-2": "0px 0px 5px 0px rgba(0, 0, 0, 0.15)",
        datepicker: "-5px 0 0 #1f2a37, 5px 0 0 #1f2a37",
        1: "0px 1px 2px 0px rgba(84, 87, 118, 0.12)",
        2: "0px 2px 3px 0px rgba(84, 87, 118, 0.15)",
        3: "0px 8px 8.466px 0px rgba(113, 116, 152, 0.05), 0px 8px 16.224px 0px rgba(113, 116, 152, 0.07), 0px 18px 31px 0px rgba(113, 116, 152, 0.10)",
        4: "0px 13px 40px 0px rgba(13, 10, 44, 0.22), 0px -8px 18px 0px rgba(13, 10, 44, 0.04)",
        5: "0px 10px 30px 0px rgba(85, 106, 235, 0.12), 0px 4px 10px 0px rgba(85, 106, 235, 0.04), 0px -18px 38px 0px rgba(85, 106, 235, 0.04)",
        6: "0px 12px 34px 0px rgba(13, 10, 44, 0.08), 0px 34px 26px 0px rgba(13, 10, 44, 0.05)",
        7: "0px 18px 25px 0px rgba(113, 116, 152, 0.05)",
      },
      dropShadow: {
        card: "0px 8px 13px rgba(0, 0, 0, 0.07)",
        1: "0px 1px 0px #E2E8F0",
        2: "0px 1px 4px rgba(0, 0, 0, 0.12)",
        3: "0px 0px 4px rgba(0, 0, 0, 0.15)",
        4: "0px 0px 2px rgba(0, 0, 0, 0.2)",
        5: "0px 1px 5px rgba(0, 0, 0, 0.2)",
      },
      fontSize: {
        "heading-1": ["60px", "72px"],
        "heading-2": ["48px", "58px"],
        "heading-3": ["40px", "48px"],
        "heading-4": ["35px", "45px"],
        "heading-5": ["28px", "40px"],
        "heading-6": ["24px", "30px"],
        "body-2xlg": ["22px", "28px"],
        "body-sm": ["14px", "22px"],
        "body-xs": ["12px", "20px"],
      },
      spacing: {
        4.5: "1.125rem",
        5.5: "1.375rem",
        6.5: "1.625rem",
        7.5: "1.875rem",
        8.5: "2.125rem",
        9.5: "2.375rem",
        10.5: "2.625rem",
        11: "2.75rem",
        11.5: "2.875rem",
        12.5: "3.125rem",
        13: "3.25rem",
        13.5: "3.375rem",
        14: "3.5rem",
        14.5: "3.625rem",
        15: "3.75rem",
        15.5: "3.875rem",
        16: "4rem",
        16.5: "4.125rem",
        17: "4.25rem",
        17.5: "4.375rem",
        18: "4.5rem",
        18.5: "4.625rem",
        19: "4.75rem",
        19.5: "4.875rem",
        21: "5.25rem",
        21.5: "5.375rem",
        22: "5.5rem",
        22.5: "5.625rem",
        24.5: "6.125rem",
        25: "6.25rem",
        25.5: "6.375rem",
        26: "6.5rem",
        27: "6.75rem",
        27.5: "6.875rem",
        28.5: "7.125rem",
        29: "7.25rem",
        29.5: "7.375rem",
        30: "7.5rem",
        31: "7.75rem",
        32.5: "8.125rem",
        33: "8.25rem",
        34: "8.5rem",
        34.5: "8.625rem",
        35: "8.75rem",
        36.5: "9.125rem",
        37.5: "9.375rem",
        39: "9.75rem",
        39.5: "9.875rem",
        40: "10rem",
        42.5: "10.625rem",
        44: "11rem",
        45: "11.25rem",
        46: "11.5rem",
        46.5: "11.625rem",
        47.5: "11.875rem",
        49: "12.25rem",
        50: "12.5rem",
        52: "13rem",
        52.5: "13.125rem",
        54: "13.5rem",
        54.5: "13.625rem",
        55: "13.75rem",
        55.5: "13.875rem",
        59: "14.75rem",
        60: "15rem",
        62.5: "15.625rem",
        65: "16.25rem",
        67: "16.75rem",
        67.5: "16.875rem",
        70: "17.5rem",
        72.5: "18.125rem",
        73: "18.25rem",
        75: "18.75rem",
        90: "22.5rem",
        94: "23.5rem",
        95: "23.75rem",
        100: "25rem",
        103: "25.75rem",
        115: "28.75rem",
        125: "31.25rem",
        132.5: "33.125rem",
        150: "37.5rem",
        171.5: "42.875rem",
        180: "45rem",
        187.5: "46.875rem",
        203: "50.75rem",
        230: "57.5rem",
        242.5: "60.625rem",
      },
      maxWidth: {
        2.5: "0.625rem",
        3: "0.75rem",
        4: "1rem",
        7: "1.75rem",
        9: "2.25rem",
        10: "2.5rem",
        10.5: "2.625rem",
        11: "2.75rem",
        13: "3.25rem",
        14: "3.5rem",
        15: "3.75rem",
        16: "4rem",
        22.5: "5.625rem",
        25: "6.25rem",
        30: "7.5rem",
        34: "8.5rem",
        35: "8.75rem",
        40: "10rem",
        42.5: "10.625rem",
        44: "11rem",
        45: "11.25rem",
        46.5: "11.625rem",
        60: "15rem",
        70: "17.5rem",
        90: "22.5rem",
        94: "23.5rem",
        100: "25rem",
        103: "25.75rem",
        125: "31.25rem",
        132.5: "33.125rem",
        142.5: "35.625rem",
        150: "37.5rem",
        180: "45rem",
        203: "50.75rem",
        230: "57.5rem",
        242.5: "60.625rem",
        270: "67.5rem",
        280: "70rem",
        292.5: "73.125rem",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
