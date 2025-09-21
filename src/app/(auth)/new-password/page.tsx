// app/new-password/page.tsx
'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import axios from 'axios'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

type Inputs = {
  email: string
  password: string
  rePassword: string
}

export default function NewPasswordPage() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const router = useRouter()
  const searchParams = useSearchParams()
  const emailFromQS = searchParams.get('email') || ''

  // Regex: Capital + lowercase + @ + digits (e.g., Abc@123)
  const passwordPattern = useMemo(() => /^[A-Z][a-z]+@[0-9]+$/, [])

  const { register, handleSubmit, formState: { errors, isSubmitting }, getValues } =
    useForm<Inputs>({
      mode: 'onTouched',
      defaultValues: { email: emailFromQS }
    })

  async function onSubmit(values: Inputs) {
    try {
      const response = await axios.put('https://ecommerce.routemisr.com/api/v1/auth/resetPassword', {
        email: values.email,
        newPassword: values.password
      })
      if (response?.data?.token || response?.data?.message === 'success' || response?.data?.status === 'Success') {
        toast.success('Password reset successfully')
        setErrorMessage(null)
        router.push('/login')
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
    <div className="w-full max-w-xl mx-auto my-10">
      <h2 className="text-4xl font-bold tracking-tighter my-5">Create New Password</h2>
      {errorMessage && <p className="text-red-800 text-center font-bold">{errorMessage}</p>}

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Input
          type="email"
          placeholder="Your Email"
          className="p-5 my-3"
          {...register('email', { required: 'email is required' })}
        />
        {errors.email && <p className="text-red-800">{errors.email.message}</p>}

        <Input
          type="password"
          placeholder="New Password (e.g., Abc@123)"
          className="p-5 my-3"
          {...register('password', {
            required: 'password is required',
            pattern: {
              value: passwordPattern,
              message: 'Password must be: Capital + lowercase letters + @ + digits (e.g., Abc@123)'
            }
          })}
        />
        {errors.password && <p className="text-red-800">{errors.password.message}</p>}

        <Input
          type="password"
          placeholder="Confirm New Password"
          className="p-5 my-3"
          {...register('rePassword', {
            required: 'rePassword is required',
            validate: (val) => val === getValues('password') || 'Passwords do not match'
          })}
        />
        {errors.rePassword && <p className="text-red-800">{errors.rePassword.message}</p>}

        <Button type="submit" className="px-7 py-5" disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : 'Save New Password'}
        </Button>
      </form>
    </div>
  )
}
