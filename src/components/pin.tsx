import React from 'react'
import { Rate } from 'antd';


/* 定义一个组件，需要先定义它的props,保证被封装的组件有透传的能力 */

interface PinProps extends React.ComponentProps<typeof Rate>{
    checked:boolean;
    onCheckedChange?:(checked:boolean)=>void
}

export const Pin = (props:PinProps)=>{
    const {checked,onCheckedChange,...restProps} = props
    /* !!num === Boolean(num) */
    return (<Rate {...restProps} count={1} value={checked?1:0} onChange={num=>onCheckedChange?.(!!num)}></Rate>)
}

