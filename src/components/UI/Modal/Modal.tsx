'use client'
import React, { ReactElement, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

type PropsType = {
	active: boolean
	setActive: (arg: boolean) => void
	children: ReactElement
}

function Modal({ active, setActive, children }: PropsType) {
	const [domReady, setDomReady] = useState(false)
	// const ref = useRef<Element | null>(null)

	useEffect(() => {
		// ref.current = document.querySelector<HTMLElement>('portal')
		setDomReady(true)
	}, [])

	return domReady && typeof window === 'object'
		? createPortal(
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
				</div>,
				document.getElementById('portal')!
		  )
		: null
}

export default Modal
