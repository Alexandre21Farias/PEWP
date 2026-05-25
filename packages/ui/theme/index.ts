import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react'

const customConfig = defineConfig({
  theme: {
    tokens: {
      colors: {
        brand: {
          50: { value: '#e1f5fe' },
          100: { value: '#b3e5fc' },
          500: { value: '#03a9f4' },
          900: { value: '#01579b' },
        },
        fifa: {
          blue: { value: '#00529b' },
          gold: { value: '#8c7042' },
          dark: { value: '#0a0a0a' },
        },
      },
    },
  },
})

export const theme = createSystem(defaultConfig, customConfig)

