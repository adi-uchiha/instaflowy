'use client'
import { ClerkProvider, useAuth } from '@clerk/nextjs'
import { dark, neobrutalism } from '@clerk/themes'
import { ThemeProvider, useTheme } from 'next-themes'
import { ReactNode, useEffect } from 'react'

export function Providers({ children }: { children: ReactNode }) {
  const { resolvedTheme, setTheme } = useTheme()


	useEffect(() => {
    /* 
     * If you have changed your storageKey in your <ThemeProvider storageKey="" />,
     * make sure you change it in the localStorage.getItem too.
     * default key is "theme"
     */
    const actualTheme = localStorage.getItem('your-storage-key-theme')
    setTheme(actualTheme || 'system')
  }, [setTheme])

	return (
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY!}
      appearance={{
        baseTheme: dark
      }}
      afterSignOutUrl="/"
    >
        {children}
    </ClerkProvider>
  )
}
