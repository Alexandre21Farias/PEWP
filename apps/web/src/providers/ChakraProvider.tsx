'use client'

import { ChakraProvider as BaseProvider } from '@pwep/ui'
import { theme } from '@pwep/ui'
import { ReactNode } from 'react'

export function ChakraProvider({ children }: { children: ReactNode }) {
  return (
    <BaseProvider value={theme}>
      {children}
    </BaseProvider>
  )
}
