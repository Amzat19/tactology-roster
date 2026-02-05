import { defineConfig } from "@chakra-ui/react";

const config = defineConfig({
  theme: {
    tokens: {
      fonts: {
        heading: {
          value:
            "'Manrope', system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
        },
        body: {
          value:
            "'Manrope', system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
        },
      },

      colors: {},
    },
  },
});

export default config;
