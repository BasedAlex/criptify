import React from 'react'

interface IProps {
  width?: string
  height?: string
  onRemoveOne: () => void
}

export default function Minus({
  width = '30px',
  height = '30px',
  onRemoveOne,
}: IProps) {
  return (
    <div onClick={onRemoveOne} className="cursor-pointer">
      {' '}
      <svg
        width={width}
        height={height}
        viewBox="0 0 21.00 21.00"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        fill="#000000"
      >
        <g id="SVGRepo_bgCarrier" stroke-width="0" />

        <g
          id="SVGRepo_tracerCarrier"
          stroke-linecap="round"
          stroke-linejoin="round"
        />

        <g id="SVGRepo_iconCarrier">
          {' '}
          <title>minus_circle [#5026c5]</title>{' '}
          <desc>Created with Sketch.</desc> <defs> </defs>{' '}
          <g
            id="Page-1"
            stroke-width="0.00021000000000000004"
            fill="none"
            fill-rule="evenodd"
          >
            {' '}
            <g
              id="Dribbble-Light-Preview"
              transform="translate(-219.000000, -600.000000)"
              fill="#5026c5"
            >
              {' '}
              <g id="icons" transform="translate(56.000000, 160.000000)">
                {' '}
                <path
                  d="M177.7,450 C177.7,450.552 177.2296,451 176.65,451 L170.35,451 C169.7704,451 169.3,450.552 169.3,450 C169.3,449.448 169.7704,449 170.35,449 L176.65,449 C177.2296,449 177.7,449.448 177.7,450 M173.5,458 C168.86845,458 165.1,454.411 165.1,450 C165.1,445.589 168.86845,442 173.5,442 C178.13155,442 181.9,445.589 181.9,450 C181.9,454.411 178.13155,458 173.5,458 M173.5,440 C167.70085,440 163,444.477 163,450 C163,455.523 167.70085,460 173.5,460 C179.29915,460 184,455.523 184,450 C184,444.477 179.29915,440 173.5,440"
                  id="minus_circle-[#5026c5]"
                >
                  {' '}
                </path>{' '}
              </g>{' '}
            </g>{' '}
          </g>{' '}
        </g>
      </svg>
    </div>
  )
}
