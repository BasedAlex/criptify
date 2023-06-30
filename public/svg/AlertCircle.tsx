import React from 'react'

export default function AlertCircle({ width = '20px', height = '20px' }) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        opacity="0.1"
        d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
        fill="#323232"
      />
      <path
        d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
        stroke="#323232"
        strokeWidth="2"
      />
      <path
        d="M12 8L12 13"
        stroke="#323232"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M12 16V15.9888"
        stroke="#323232"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  )
}
