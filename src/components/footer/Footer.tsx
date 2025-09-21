'use client'

export default function Footer() {
  return (
    <footer className="bg-black text-white py-7 mt-20">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <p className="text-sm">&copy; {new Date().getFullYear()} MyEcommerce App. All rights reserved.</p>
        <p className="text-sm mt-2">Built with Rahma Hesham ❤️</p>
      </div>
    </footer>
  )
}
