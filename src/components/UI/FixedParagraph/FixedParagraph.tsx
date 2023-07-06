import React from 'react'
import ToolTip from '../ToolTip/ToolTip'
import { Montserrat } from 'next/font/google'
import { transform } from '../../../lib/transform'

const montserrat = Montserrat({
  weight: ['400', '500', '600', '700', '800'],
  subsets: ['latin'],
})

export default function FixedParagraph({
  value,
  isTooltip,
  fixed,
  withTransform,
}: {
  value: string
  fixed: number
  isTooltip?: boolean
  withTransform?: boolean
}) {
  const val = withTransform
    ? transform(Number(value))
    : Number(value).toFixed(fixed)

  return (
    <div className={montserrat.className}>
      {!isTooltip && val}
      {isTooltip && (
        <ToolTip tooltip={val}>{Number(val).toFixed(fixed)}</ToolTip>
      )}
    </div>
  )
}
