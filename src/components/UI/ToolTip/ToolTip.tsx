import { FC, ReactNode, useRef } from 'react'

type Props = {
  children: ReactNode
  tooltip?: string | ReactNode
  classname?: string
  leftPos?: boolean
}

import React from 'react'

const ToolTip: FC<Props> = ({
  children,
  tooltip,
  classname,
  leftPos,
}): JSX.Element => {
  const tooltipRef = useRef<HTMLSpanElement>(null)
  const container = useRef<HTMLDivElement>(null)

  return (
    <div
      ref={container}
      onMouseEnter={({ clientX }) => {
        if (!tooltipRef.current || !container.current) return
        const { left } = container.current.getBoundingClientRect()
        leftPos
          ? (tooltipRef.current.style.left = clientX - left + 'px')
          : (tooltipRef.current.style.left = (clientX - left) / 50 + 'vh')
        tooltipRef.current.style.top = '12vh'
        tooltipRef.current.style.left = clientX - left + 'px'
      }}
      className={'group relative inline-block select-none'}
    >
      <div className={classname}>{children}</div>
      {tooltip && (
        <span
          ref={tooltipRef}
          className="invisible absolute top-full -mt-7 w-80 select-text rounded	bg-black px-2.5 py-2 text-white  opacity-0	transition	group-hover:visible	group-hover:opacity-100"
        >
          {tooltip}
        </span>
      )}
    </div>
  )
}

export default ToolTip
