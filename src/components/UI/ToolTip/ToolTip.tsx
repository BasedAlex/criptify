import { FC, ReactNode, useRef } from 'react'

type Props = {
	children: ReactNode
	tooltip?: string
}

import React from 'react'

const ToolTip: FC<Props> = ({ children, tooltip }): JSX.Element => {
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
			className='group relative inline-block select-none'
		>
			{children}
			{tooltip && (
				<span
					onDoubleClick={() => {
						navigator.clipboard.writeText(tooltip)
					}}
					ref={tooltipRef}
					className='invisible group-hover:visible opacity-0 group-hover:opacity-100 transition bg-black text-white px-2.5 rounded absolute top-full -mt-7 whitespace-nowrap select-text	'
				>
					{tooltip}
				</span>
			)}
		</div>
	)
}

export default ToolTip
