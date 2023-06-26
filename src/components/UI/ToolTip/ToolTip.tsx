import { FC, ReactNode, useRef } from 'react'

type Props = {
  children: ReactNode
  tooltip?: string
  classname: string
}

import React from 'react'

const ToolTip: FC<Props> = ({ children, tooltip, classname }): JSX.Element => {
  const tooltipRef = useRef<HTMLSpanElement>(null)
  const container = useRef<HTMLDivElement>(null)

  return (
    <div
      ref={container}
      onMouseEnter={({ clientX }) => {
        if (!tooltipRef.current || !container.current) return
        const { left } = container.current.getBoundingClientRect()
        tooltipRef.current.style.left = clientX - left + 'px'
      }}
      className={'group relative inline-block select-none'}
    >
      <div className={classname}>{children}</div>
      {tooltip && (
        <span
          onDoubleClick={() => {
            navigator.clipboard.writeText(tooltip)
          }}
          ref={tooltipRef}
          className="invisible absolute top-full -mt-7 select-text whitespace-nowrap rounded bg-black px-2.5 py-2 text-white opacity-0 transition group-hover:visible group-hover:opacity-100	"
        >
          {tooltip}
        </span>
      )}
    </div>
  )
}

export default ToolTip
