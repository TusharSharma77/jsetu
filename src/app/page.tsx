"use client"
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'
import {DashBoard} from '@/Page/index'
import { RootState } from '@/globalContext/store'

export default function Page(): React.ReactNode {
  const status = useSelector((state: RootState) => state.auth.status)
  const router = useRouter()
  const [isRedirecting, setIsRedirecting] = useState(false)

  useEffect(() => {
    // Only redirect if not authenticated and not already redirecting
    if (!status && !isRedirecting) {
      setIsRedirecting(true)
      router.replace('/login')
    }
  }, [status, router, isRedirecting])

  // If not authenticated, redirect to login
  if (!status) {
    return null // Return null to prevent flash of content
  }

  return <DashBoard />
}