'use client'
import { SocketProvider } from "@/contexts/SocketProvider"

export default function RootProviders({
  children,
}: {
  children: React.ReactNode
}) {
  return (
  <SocketProvider>
    {children}
  </SocketProvider>
  )
}