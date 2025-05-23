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
      src: "https://picsum.photos/1000/1000?random=1",
      alt: "Slide 1",
    },
    {
      src: "https://picsum.photos/1000/1000?random=2",
      alt: "Slide 2",
    },
    {
      src: "https://picsum.photos/1000/1000?random=3",
      alt: "Slide 3",
    },
  ]

  return (
    <div className="flex flex-col min-h-screen bg-white ">
      {/* Navbar - Using Tailwind classes for styling */}
      <header className="sticky top-0 z-50 w-full border-b  border-gray-800 bg-white     ">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center">
            <a href="/" className="flex items-center space-x-2">
              
              <img src="/static/logo-reservation.jpeg" className="h-[42px]"/>
            </a>
          </div>

          {/* Desktop Navigation - Using Tailwind for responsive design */}
          <nav className="hidden md:flex items-center space-x-6">
            <a
              href="#"
              className="text-sm font-medium text-gray-700 hover:text-teal-bg-teal-500 transition-colors"
            >
              Home
            </a>
            <a
              href="#"
              className="text-sm font-medium text-gray-700 hover:text-teal-bg-teal-500 transition-colors"
            >
              Services
            </a>
            <a
              href="#"
              className="text-sm font-medium text-gray-700 hover:text-teal-bg-teal-500 transition-colors"
            >
              About
            </a>
            <a
              href="#"
              className="text-sm font-medium text-gray-700 hover:text-teal-bg-teal-500 transition-colors"
            >
              Contact
            </a>
          </nav>

          {/* Auth Buttons - Using Tailwind for styling */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="px-3 py-1.5 text-sm font-medium text-gray-700  hover:text-gray-200 rounded-md hover:bg-teal-700transition-colors">
              Sign In
            </button>
            <button className="px-3 py-1.5 text-sm font-medium bg-teal-500 text-white  hover:text-teal-bg-teal-500 hover:bg-gray-200 rounded-md transition-colors">
              Sign Up
            </button>
          </div>

          {/* Mobile Menu Button - Using Tailwind for styling */}
          <div className="md:hidden">
            <button
              className="p-2 rounded-md text-gray-700 hover:text-teal-bg-teal-500 hover:bg-gray-100  transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Mobile Menu - Using Tailwind for styling and transitions */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 border-gray-800 bg-white  py-4">
            <div className="container mx-auto px-4 space-y-4">
              <a
                href="#"
                className="block py-2 text-gray-700 hover:text-teal-bg-teal-500"
              >
                Home
              </a>
              <a
                href="#"
                className="block py-2 text-gray-700 hover:text-teal-bg-teal-500"
              >
                Services
              </a>
              <a
                href="#"
                className="block py-2 text-gray-700 hover:text-teal-bg-teal-500"
              >
                About
              </a>
              <a
                href="#"
                className="block py-2 text-gray-700 hover:text-teal-bg-teal-500"
              >
                Contact
              </a>
              <div className="pt-4 space-y-2">
                <button className="w-full text-left px-3 py-2 text-sm font-medium text-gray-700  hover:text-gray-200 rounded-md hover:bg-teal-700 transition-colors">
                  Sign In
                </button>
                <button className="w-full text-left px-3 py-2 text-sm font-medium bg-teal-500 text-white  hover:text-teal-bg-teal-500 hover:bg-gray-200  rounded-md transition-colors">
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
                nextEl: ".swiper-next",
                prevEl: ".swiper-prev",
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
              <div className="swiper-prev absolute left-4 top-1/2 cursor-pointer z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-gray-800 shadow-md">
                <ChevronLeft className="text-black"/>
              </div>
              <div className="swiper-next absolute right-4 top-1/2 cursor-pointer z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-gray-800 shadow-md">
                <ChevronRight className="h-6 w-6" />
              </div>
            </Swiper>
          )}
        </section>

        {/* Action Buttons Section - Using Tailwind for grid and spacing */}
        <section className="py-12 px-4 md:py-16 bg-white ">
          <div className="container mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-teal-bg-teal-500 ">
              Let's we make easy for you
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="flex flex-col items-center text-center">
                <button className="w-full  text-lg  gap-2 bg-teal-500 flex flex-col items-center p-4 font-bold text-white hover:bg-teal-700 rounded-md transition-colors">
                <img
                        src="/static/Reservation.svg"
                        alt="Menu"
                        className="w-36 h-36 relative z-20"
                    />
                  <div>Reservasi</div>
                </button>
                <p className="mt-3 text-gray-600 ">Pesan meja dan waktu makan</p>
              </div>

              <div className="flex flex-col items-center text-center">
                <button className="w-full  text-lg  gap-2 bg-teal-500 flex flex-col items-center p-4 font-bold text-white hover:bg-teal-700 rounded-md transition-colors">
                <img
                        src="/static/Menu.svg"
                        alt="Menu"
                        className="w-36 h-36 relative z-20"
                    />
                  <div>Riwayat Order</div>
                </button>
                <p className="mt-3 text-gray-600 ">Lihat history order</p>
              </div>

              <div className="flex flex-col items-center text-center">
                <button className="w-full  text-lg  gap-2 bg-teal-500 flex flex-col items-center p-4 font-bold text-white hover:bg-teal-700 rounded-md transition-colors">
                <img
                        src="/static/Takeaway.svg"
                        alt="Menu"
                        className="w-36 h-36 relative z-20"
                    />
                  <div>Lacak Order</div>
                </button>
                <p className="mt-3 text-gray-600 ">Lacak order kamu disini</p>
              </div>
            </div>
          </div>
        </section>

        {/* Additional Content Section - Using Tailwind for grid and colors */}
        <section className="py-12 px-4  bg-teal-500">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-200 ">
                  Why Choose Our Service?
                </h2>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <div className="h-6 w-6 rounded-full bg-teal-500  flex items-center justify-center text-white  mt-0.5">
                      ✓
                    </div>
                    <span className=" text-gray-100">Easy online reservation system</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="h-6 w-6 rounded-full bg-teal-500  flex items-center justify-center text-white  mt-0.5">
                      ✓
                    </div>
                    <span className=" text-gray-100">Complete order history at your fingertips</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="h-6 w-6 rounded-full bg-teal-500  flex items-center justify-center text-white  mt-0.5">
                      ✓
                    </div>
                    <span className=" text-gray-100">Real-time order tracking</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="h-6 w-6 rounded-full bg-teal-500  flex items-center justify-center text-white  mt-0.5">
                      ✓
                    </div>
                    <span className=" text-gray-100">24/7 customer support</span>
                  </li>
                </ul>
              </div>
              <div className="relative h-64 md:h-80">
               
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-white  border-t  border-gray-800 py-6">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-600 ">
            © {new Date().getFullYear()} Our Service. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
