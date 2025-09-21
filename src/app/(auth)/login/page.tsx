'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { signIn } from "next-auth/react"
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useForm } from "react-hook-form"

export default function LoginPage() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const router = useRouter()

  interface Inputs {
    email: string
    password: string
  }

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<Inputs>()

  async function onSubmit(values: Inputs) {
    try {
      const response = await signIn('credentials', {
        email: values.email,
        password: values.password,
        redirect: false
      })

      if (response?.ok) {
        setErrorMessage(null)
        router.push('/')
      } else {
        setErrorMessage(response?.error || 'Invalid email or password')
      }
    } catch (error) {
      console.log(error)
      setErrorMessage('Something went wrong, please try again.')
    }
  }

  return (
    <>
      <div className="w-1/2 mx-auto my-10 flex flex-col min-h-[80vh]">
        <div className="flex-grow">
          <h2 className="text-4xl font-bold tracking-tighter my-5">Login</h2>
          {errorMessage && (
            <p className="text-red-800 text-center font-bold">{errorMessage}</p>
          )}

          <form onSubmit={handleSubmit(onSubmit)}>
            <Input
              type="email"
              placeholder="Your Email"
              className="p-5 my-5"
              {...register('email', { required: 'Email is required' })}
            />
            {errors.email && (
              <p className="text-red-800">{errors.email.message}</p>
            )}

            <Input
              type="password"
              placeholder="Your Password"
              className="p-5 my-5"
              {...register('password', { required: 'Password is required' })}
            />
            {errors.password && (
              <p className="text-red-800">{errors.password.message}</p>
            )}

            <Link href="/reset" className="text-red-800 text-sm">
              Forgot Password?!
            </Link>
            <br />

            <Button
              type="submit"
              className="px-7 py-5 mt-4"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Logging in...' : 'Login'}
            </Button>
          </form>
        </div>

        {/* Footer */}
        <footer className="mt-10 text-center text-gray-500 text-sm border-t pt-4">
          <p>
            © {new Date().getFullYear()} MyEcommerce App. All rights reserved.
          </p>
          <p>
            Don’t have an account?{' '}
            <Link href="/register" className="text-blue-600 hover:underline">
              Register here
            </Link>
          </p>
        </footer>
      </div>
    </>
  )
}
