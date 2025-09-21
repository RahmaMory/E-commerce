// app/verify/page.tsx
'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import axios from 'axios'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

type Inputs = { resetCode: string }

export default function VerifyResetPage() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const router = useRouter()
  const searchParams = useSearchParams()
  const email = searchParams.get('email') || ''

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<Inputs>({ mode: 'onTouched' })

  async function onSubmit(values: Inputs) {
    try {
      const response = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode', {
        resetCode: values.resetCode
      })
      if (response?.data?.status === 'Success' || response?.data?.statusMsg === 'success') {
        toast.success('Code verified successfully')
        setErrorMessage(null)
        router.push(`/new-password?email=${encodeURIComponent(email)}`)
      } else {
        setErrorMessage(' Something went wrong. Please try again.')
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setErrorMessage(error.response?.data?.message ?? 'Network error')
      } else {
        setErrorMessage('Unexpected error')
      }
    }
  }

  async function resendCode() {
    if (!email) return
    try {
      const res = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords', { email })
      if (res?.data?.statusMsg === 'success' || res?.data?.status === 'Success') {
        toast.success(' resent code successfully')
      } else {
        toast.error('there was an error resending the code')
      }
    } catch {
      toast.error('there was an error resending the code')
    }
  }

  return (
    <div className="w-1/2 mx-auto my-10 flex flex-col min-h-[80vh]">
      <h2 className="text-4xl font-bold tracking-tighter my-5">Verify Code</h2>
      <p className="text-sm text-muted-foreground mb-4">
        تم إرسال كود تحقق إلى: <span className="font-semibold">{email || '(no email)'}</span>
      </p>
      {errorMessage && <p className="text-red-800 text-center font-bold">{errorMessage}</p>}

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Input
          type="text"
          inputMode="numeric"
          placeholder="Enter the 6-digit code"
          className="p-5 my-3"
          {...register('resetCode', {
            required: 'reset code is required',
            pattern: { value: /^[0-9]{4,8}$/, message: 'code must be 4-8 digits' }
          })}
        />
        {errors.resetCode && <p className="text-red-800">{errors.resetCode.message}</p>}

        <div className="flex items-center gap-3 mt-2">
          <Button type="submit" className="px-7 py-5" disabled={isSubmitting}>
            {isSubmitting ? 'Verifying...' : 'Verify'}
          </Button>
          <Button type="button" variant="secondary" onClick={resendCode}>
            Resend code
          </Button>
        </div>
      </form>
    </div>
  )
}
