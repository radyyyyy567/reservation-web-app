"use client"

import { useState } from "react"
import { User, Mail, Phone, Edit, Save, X, ShoppingBag, Menu } from "lucide-react"

export default function Profile({auth}) {
  const [isEditing, setIsEditing] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  
  // Form data for editing
  const [formData, setFormData] = useState(auth.user)

  const handleEdit = () => {
    setIsEditing(true)
    setFormData(auth.user)
  }

  const handleSave = () => {
    setauth.user(formData)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setFormData(auth.user)
    setIsEditing(false)
  }
  


  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Navbar */}
      <header className="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-gray-800 bg-white/95 dark:bg-gray-950/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-gray-950/60">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center">
            <a href="/" className="flex items-center space-x-2">
              <ShoppingBag className="h-6 w-6 text-gray-900 dark:text-gray-100" />
              <span className="font-bold text-xl text-gray-900 dark:text-gray-100">BrandName</span>
            </a>
          </div>

          {/* Desktop Navigation */}
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
              className="text-sm font-medium text-gray-900 dark:text-gray-100 border-b-2 border-gray-900 dark:border-gray-100"
            >
              Profile
            </a>
            <a
              href="#"
              className="text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100 transition-colors"
            >
              Contact
            </a>
          </nav>

          {/* User Profile Dropdown - When logged in */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="relative">
              <button className="flex items-center space-x-2 px-3 py-1.5 text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                </div>
                <span>John Doe</span>
              </button>
            </div>
            <button className="px-3 py-1.5 text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              Sign Out
            </button>
          </div>

          {/* Mobile Menu Button */}
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

        {/* Mobile Menu */}
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
              <a href="#" className="block py-2 text-gray-900 dark:text-gray-100 font-medium">
                Profile
              </a>
              <a
                href="#"
                className="block py-2 text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100"
              >
                Contact
              </a>
              <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
                <div className="flex items-center space-x-3 px-3 py-2 mb-2">
                  <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                  </div>
                  <span className="text-gray-900 dark:text-gray-100 font-medium">John Doe</span>
                </div>
                <button className="w-full text-left px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      <main className="flex-1 py-8">
        <div className="container mx-auto px-4 max-w-2xl">
          {/* Profile Header */}
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-800 p-6 mb-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
                  <User className="w-8 h-8 text-gray-600 dark:text-gray-400" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Profile</h1>
                  <p className="text-gray-600 dark:text-gray-400">Manage your account information</p>
                </div>
              </div>

              {!isEditing && (
                <button
                  onClick={handleEdit}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-200 rounded-md transition-colors"
                >
                  <Edit className="w-4 h-4" />
                  Edit
                </button>
              )}
            </div>

            {/* Profile Form */}
            <div className="space-y-6">
              {/* Name Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Full Name</label>
                {isEditing ? (
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                      placeholder="Enter your full name"
                    />
                  </div>
                ) : (
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-md">
                    <User className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-900 dark:text-gray-100">{auth.user.name}</span>
                  </div>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email Address</label>
                {isEditing ? (
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                      placeholder="Enter your email address"
                    />
                  </div>
                ) : (
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-md">
                    <Mail className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-900 dark:text-gray-100">{auth.user.email}</span>
                  </div>
                )}
              </div>

              {/* Phone Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Phone Number</label>
                {isEditing ? (
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                      placeholder="Enter your phone number"
                    />
                  </div>
                ) : (
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-md">
                    <Phone className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-900 dark:text-gray-100">{auth.user.phone}</span>
                  </div>
                )}
              </div>

              {/* Action Buttons for Editing */}
              {isEditing && (
                <div className="flex space-x-4 pt-4">
                  <button
                    onClick={handleSave}
                    className="flex items-center gap-2 px-6 py-2 bg-green-600 text-white hover:bg-green-700 rounded-md transition-colors"
                  >
                    <Save className="w-4 h-4" />
                    Save Changes
                  </button>
                  <button
                    onClick={handleCancel}
                    className="flex items-center gap-2 px-6 py-2 bg-gray-500 text-white hover:bg-gray-600 rounded-md transition-colors"
                  >
                    <X className="w-4 h-4" />
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Additional Profile Sections */}
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-800 p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Account Settings</h2>
            <div className="space-y-4">
              <button className="w-full text-left p-3 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md transition-colors">
                <div className="font-medium text-gray-900 dark:text-gray-100">Change Password</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Update your account password</div>
              </button>
              <button className="w-full text-left p-3 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md transition-colors">
                <div className="font-medium text-gray-900 dark:text-gray-100">Notification Preferences</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Manage your notification settings</div>
              </button>
              <button className="w-full text-left p-3 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md transition-colors">
                <div className="font-medium text-gray-900 dark:text-gray-100">Privacy Settings</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Control your privacy preferences</div>
              </button>
            </div>
          </div>
        </div>
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
