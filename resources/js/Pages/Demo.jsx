"use client"

import { useState, useEffect } from "react"
import { Calendar, History, ShoppingBag, Menu, ChevronLeft, ChevronRight } from "lucide-react"

// Import Swiper and required modules
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination, Autoplay } from "swiper/modules"

// Import Swiper styles
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"

export default function Demo() {
  const [mounted, setMounted] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Ensure Swiper is only rendered on the client side
  useEffect(() => {
    setMounted(true)
  }, [])

  // Slider images
  const sliderImages = [
    {
      src: "/placeholder.svg?height=600&width=1200",
      alt: "Slide 1",
    },
    {
      src: "/placeholder.svg?height=600&width=1200",
      alt: "Slide 2",
    },
    {
      src: "/placeholder.svg?height=600&width=1200",
      alt: "Slide 3",
    },
  ]

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-950">
      {/* Navbar - Using Tailwind classes for styling */}
      <header className="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-gray-800 bg-white/95 dark:bg-gray-950/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-gray-950/60">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center">
            <a href="/" className="flex items-center space-x-2">
              <ShoppingBag className="h-6 w-6 text-gray-900 dark:text-gray-100" />
              <span className="font-bold text-xl text-gray-900 dark:text-gray-100">BrandName</span>
            </a>
          </div>

          {/* Desktop Navigation - Using Tailwind for responsive design */}
          <nav className="hidden md:flex items-center space-x-6">
            <a
              href="#"
              className="text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100 transition-colors"
            >
              Home
            </a>
            <a
              href="#"
              className="text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100 transition-colors"
            >
              Services
            </a>
            <a
              href="#"
              className="text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100 transition-colors"
            >
              About
            </a>
            <a
              href="#"
              className="text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100 transition-colors"
            >
              Contact
            </a>
          </nav>

          {/* Auth Buttons - Using Tailwind for styling */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="px-3 py-1.5 text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              Sign In
            </button>
            <button className="px-3 py-1.5 text-sm font-medium bg-gray-900 text-white hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-200 rounded-md transition-colors">
              Sign Up
            </button>
          </div>

          {/* Mobile Menu Button - Using Tailwind for styling */}
          <div className="md:hidden">
            <button
              className="p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-gray-100 dark:hover:bg-gray-800 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Mobile Menu - Using Tailwind for styling and transitions */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 py-4">
            <div className="container mx-auto px-4 space-y-4">
              <a
                href="#"
                className="block py-2 text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100"
              >
                Home
              </a>
              <a
                href="#"
                className="block py-2 text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100"
              >
                Services
              </a>
              <a
                href="#"
                className="block py-2 text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100"
              >
                About
              </a>
              <a
                href="#"
                className="block py-2 text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100"
              >
                Contact
              </a>
              <div className="pt-4 space-y-2">
                <button className="w-full text-left px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                  Sign In
                </button>
                <button className="w-full text-left px-3 py-2 text-sm font-medium bg-gray-900 text-white hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-200 rounded-md transition-colors">
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      <main className="flex-1">
        {/* Hero Section with Slider - Using Tailwind for responsive sizing */}
        <section className="relative w-full">
          {mounted && (
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              navigation={{
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
              }}
              pagination={{ clickable: true }}
              autoplay={{ delay: 5000 }}
              loop={true}
              className="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px]"
            >
              {sliderImages.map((image, index) => (
                <SwiperSlide key={index} className="relative">
                  <div className="w-full h-full relative">
                    <img
                      src={image.src || "/placeholder.svg"}
                      alt={image.alt}
                      className="absolute inset-0 w-full h-full object-cover"
                      loading={index === 0 ? "eager" : "lazy"}
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                      <div className="text-center text-white p-4">
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Welcome to Our Service</h1>
                        <p className="text-lg md:text-xl max-w-2xl mx-auto">
                          Experience the best service with us. Make reservations and track your orders easily.
                        </p>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}

              {/* Custom navigation buttons - Using Tailwind for styling */}
              <div className="swiper-button-prev absolute left-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-gray-800 shadow-md">
                <ChevronLeft className="h-6 w-6" />
              </div>
              <div className="swiper-button-next absolute right-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-gray-800 shadow-md">
                <ChevronRight className="h-6 w-6" />
              </div>
            </Swiper>
          )}
        </section>

        {/* Action Buttons Section - Using Tailwind for grid and spacing */}
        <section className="py-12 px-4 md:py-16 bg-white dark:bg-gray-950">
          <div className="container mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-gray-900 dark:text-gray-100">
              What would you like to do?
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="flex flex-col items-center text-center">
                <button className="w-full h-16 text-lg flex items-center justify-center gap-2 bg-gray-900 text-white hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-200 rounded-md transition-colors">
                  <Calendar className="h-5 w-5" />
                  <span>Reservation</span>
                </button>
                <p className="mt-3 text-gray-600 dark:text-gray-400">Book your appointment or table</p>
              </div>

              <div className="flex flex-col items-center text-center">
                <button className="w-full h-16 text-lg flex items-center justify-center gap-2 bg-gray-900 text-white hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-200 rounded-md transition-colors">
                  <History className="h-5 w-5" />
                  <span>History Order</span>
                </button>
                <p className="mt-3 text-gray-600 dark:text-gray-400">View your past orders</p>
              </div>

              <div className="flex flex-col items-center text-center">
                <button className="w-full h-16 text-lg flex items-center justify-center gap-2 bg-gray-900 text-white hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-200 rounded-md transition-colors">
                  <ShoppingBag className="h-5 w-5" />
                  <span>See your Order</span>
                </button>
                <p className="mt-3 text-gray-600 dark:text-gray-400">Track your current orders</p>
              </div>
            </div>
          </div>
        </section>

        {/* Additional Content Section - Using Tailwind for grid and colors */}
        <section className="py-12 px-4 bg-gray-100 dark:bg-gray-900">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900 dark:text-gray-100">
                  Why Choose Our Service?
                </h2>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <div className="h-6 w-6 rounded-full bg-gray-900 dark:bg-gray-100 flex items-center justify-center text-white dark:text-gray-900 mt-0.5">
                      ✓
                    </div>
                    <span className="text-gray-700 dark:text-gray-300">Easy online reservation system</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="h-6 w-6 rounded-full bg-gray-900 dark:bg-gray-100 flex items-center justify-center text-white dark:text-gray-900 mt-0.5">
                      ✓
                    </div>
                    <span className="text-gray-700 dark:text-gray-300">Complete order history at your fingertips</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="h-6 w-6 rounded-full bg-gray-900 dark:bg-gray-100 flex items-center justify-center text-white dark:text-gray-900 mt-0.5">
                      ✓
                    </div>
                    <span className="text-gray-700 dark:text-gray-300">Real-time order tracking</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="h-6 w-6 rounded-full bg-gray-900 dark:bg-gray-100 flex items-center justify-center text-white dark:text-gray-900 mt-0.5">
                      ✓
                    </div>
                    <span className="text-gray-700 dark:text-gray-300">24/7 customer support</span>
                  </li>
                </ul>
              </div>
              <div className="relative h-64 md:h-80">
                <img
                  src="/placeholder.svg?height=400&width=600"
                  alt="Service features"
                  className="absolute inset-0 w-full h-full object-cover rounded-lg"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800 py-6">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-600 dark:text-gray-400">
            © {new Date().getFullYear()} Our Service. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
