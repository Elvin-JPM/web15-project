import React, { useState } from 'react'

const SweetAlert = ({
  title,
  text,
  onConfirm,
  succeeded,
}) => {
  const [, setIsVisible] = useState(true)

  const handleClose = () => {
    setIsVisible(false)
    if (onConfirm) {
      onConfirm()
    }
  }

  return (
    <div className="fixed left-1/2 top-20 z-50 -translate-x-1/2 transform">
      <div
        className="relative w-72 rounded-lg border border-ring p-2 shadow-md"
        style={{
          background: succeeded ? '#c2eabe' : '#e75252',
          borderColor: succeeded ? '#c2eabe' : '#e75252',
        }}
      >
        <button
          className="absolute right-3 top-2 text-gray-500"
          onClick={handleClose}
        >
         x
        </button>
        <div className="flex text-ring">
          <h2
            className="mb-2 text-xs font-semibold"
            style={{
              color: succeeded ? '#276204' : '#ffffff',
            }}
          >
            {title}
          </h2>
        </div>
        <p
          className=" text-xs text-gray-800"
          style={{
            color: succeeded ? '#000000' : '#ffffff',
          }}
        >
          {text}
        </p>
      </div>
    </div>
  )
}

export default SweetAlert
