import { createContext, useContext, useState } from "react"

const ModalContext = createContext()

export function ModalProvider({ children }) {
  const [content, setContent] = useState(null)

  const openModal = (component) => setContent(component)
  const closeModal = () => setContent(null)

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      {content && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 overflow-auto">
          <div className="bg-white p-6 rounded shadow-lg relative max-w-xl w-full">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-black"
              onClick={closeModal}
            >
              &times;
            </button>
            {content}
          </div>
        </div>
      )}
    </ModalContext.Provider>
  )
}

export function useModal() {
  const context = useContext(ModalContext)
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider")
  }
  return context
}
