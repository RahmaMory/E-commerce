// app/reset/page.tsx
'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

type Inputs = { email: string }

export default function ResetPage() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const router = useRouter()

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<Inputs>({ mode: 'onTouched' })

  async function onSubmit(values: Inputs) {
    try {
      const response = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords', values)
      if (response?.data?.statusMsg === 'success' || response?.data?.status === 'Success') {
        toast.success('Code sent to your email')
        setErrorMessage(null)
        router.push(`/verify?email=${encodeURIComponent(values.email)}`)
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

  return (
    <div className="w-1/2 mx-auto my-10 flex flex-col min-h-[80vh]">
      <h2 className="text-4xl font-bold tracking-tighter my-5">Reset Password</h2>
      {errorMessage && <p className="text-red-800 text-center font-bold">{errorMessage}</p>}
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Input
          type="email"
          placeholder="Your Email"
          className="p-5 my-3"
          {...register('email', { required: 'email is required' })}
        />
        {errors.email && <p className="text-red-800">{errors.email.message}</p>}

        <Button type="submit" className="px-7 py-5" disabled={isSubmitting}>
          {isSubmitting ? 'Sending...' : 'Send Code'}
        </Button>
      </form>
    </div>
  )
}
