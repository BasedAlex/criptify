import React from 'react'
import ToolTip from '../ToolTip/ToolTip'
import AlertCircle from '../../../../public/svg/AlertCircle'

export default function Column(props: any): any {
  return (
    <>
      <span className="flex items-center ">
        <p>{props.name}</p>
        <ToolTip tooltip={props.tooltip} leftPos={true}>
          <div className="cursor-default px-2 pt-1">
            <AlertCircle />
          </div>
        </ToolTip>
      </span>
    </>
  )
}
