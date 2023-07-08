import React from 'react'
import ToolTip from '../ToolTip/ToolTip'
import AlertCircle from '../../../../public/svg/AlertCircle'

interface IProps {
  name: string
  tooltip?: React.ReactNode
}

export default function Column(props: IProps) {
  return (
    <span className="flex items-center ">
      <p>{props.name}</p>
      <ToolTip tooltip={props.tooltip} leftPos={true}>
        <div className="cursor-default px-2 ">
          <AlertCircle />
        </div>
      </ToolTip>
    </span>
  )
}
