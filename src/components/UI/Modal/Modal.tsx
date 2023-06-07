import React, { ReactElement } from 'react'

type PropsType = {
	active: boolean
	setActive: any
	children: ReactElement
}

function Modal({ active, setActive, children }: PropsType) {
	return (
		<div
			className={active ? 'modal active' : 'modal'}
			onClick={() => setActive(false)}
		>
			<div
				className={active ? 'modal__content active' : 'modal__content'}
				onClick={e => e.stopPropagation()}
			>
				{children}
			</div>
		</div>
	)
}

export default Modal
