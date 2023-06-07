import React from 'react'

const Pointer = ({ width = '16px', height = '16px' }) => {
	return (
		<svg
			fill='currentColor'
			width={width}
			height={height}
			viewBox='0 0 24 24'
			xmlns='http://www.w3.org/2000/svg'
		>
			<path
				fillRule='evenodd'
				clipRule='evenodd'
				d='M2.763 12.727 9.5 14.5l1.773 6.737a1 1 0 0 0 1.882.15l7.458-16.879a.85.85 0 0 0-1.121-1.12L2.613 10.844a1 1 0 0 0 .15 1.882zm7.246-.161L6.035 11.52l11.547-5.103-5.102 11.548-1.046-3.974a2 2 0 0 0-1.425-1.425z'
			/>
		</svg>
	)
}

export default Pointer
