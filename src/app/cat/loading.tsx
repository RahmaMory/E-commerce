import { LoaderCircle } from 'lucide-react'
import React from 'react'

export default function LoadingPage() {
  return (
    <>
    <div className="flex justify-center h-screen items-center">
        <LoaderCircle size={70} className='animate-spin text-red-400'/>

    </div>
      
    </>
  )
}
