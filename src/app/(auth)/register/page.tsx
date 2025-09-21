
'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

type Inputs = {
  name: string
  email: string
  password: string
  rePassword: string
  phone: string
}

export default function RegisterPage() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    getValues,
    reset
  } = useForm<Inputs>({ mode: 'onTouched' })

  // Regex for password: Capital + lowercase + @ + digits
  const passwordPattern = /^[A-Z][a-z]+@[0-9]+$/

  async function onSubmit(values: Inputs) {
    if (values.password !== values.rePassword) {
      return
    }

    try {
      const response = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup',values
      )
      if (response?.data?.message === 'success') {
        setErrorMessage(null)
        reset()
        router.push('/login')
      } else {
        setErrorMessage('Something went wrong. Please try again.')
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
    <>
      <div className="w-1/2 mx-auto my-10 flex flex-col min-h-[80vh]">
        <h2 className="text-4xl font-bold tracking-tighter my-5">Register</h2>

        {errorMessage && (
          <p className="text-red-800 text-center font-bold">{errorMessage}</p>
        )}

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Input
            type="text"
            placeholder="Your Name"
            className="p-5 my-3"
            {...register('name', { required: 'name is required' })}
          />
          {errors.name && (
            <p className="text-red-800">{errors.name.message}</p>
          )}

          <Input
            type="email"
            placeholder="Your Email"
            className="p-5 my-3"
            {...register('email', { required: 'email is required' })}
          />
          {errors.email && (
            <p className="text-red-800">{errors.email.message}</p>
          )}

          <Input
            type="password"
            placeholder="Your Password"
            className="p-5 my-3"
            {...register('password', {
              required: 'password is required',
              pattern: {
                value: passwordPattern,
                message:
                  'Password must be: Capital + lowercase letters + @ + digits (e.g., Abc@123)'
              }
            })}
          />
          {errors.password && (
            <p className="text-red-800">{errors.password.message}</p>
          )}

          <Input
            type="password"
            placeholder="Your Repassword"
            className="p-5 my-3"
            {...register('rePassword', {
              required: 'rePassword is required',
              validate: (val) =>
                val === getValues('password') || 'Passwords do not match'
            })}
          />
          {errors.rePassword && (
            <p className="text-red-800">{errors.rePassword.message}</p>
          )}

          <Input
            type="tel"
            placeholder="Your Phone"
            className="p-5 my-3"
            {...register('phone', { required: 'phone is required' })}
          />
          {errors.phone && (
            <p className="text-red-800">{errors.phone.message}</p>
          )}

          <Button type="submit" className="px-7 py-5" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Register'}
          </Button>
        </form>
      </div>
      
    </>
  )
}