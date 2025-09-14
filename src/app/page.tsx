"use client"
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'
import {DashBoard, LandingPage} from '@/Page/index'
import { RootState } from '@/globalContext/store'

export default function Page(): React.ReactNode {
  const status = useSelector((state: RootState) => state.auth.status)
  const router = useRouter()

  useEffect(() => {
    if (!status) {
      router.push('/login')
    }
  }, [status, router])

  if (!status) {
    return <LandingPage />
  }

  return <DashBoard />
}