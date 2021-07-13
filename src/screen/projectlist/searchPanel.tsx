/**  @jsx jsx */ 
import {jsx} from '@emotion/react'
import React from "react"
import {Input,Form} from 'antd'
import { Project } from './list'
import { UserSelect } from '../../components/user-select'
export interface User{
    id:number
    name:string
    title:string
    email:string
    organization:string
    token:string
}

//组件属性介绍说明
interface SearchPanelProps{
    users:User[],
    param:Partial<Pick<Project,'name'|'personId'>>,
    setParam:(param:SearchPanelProps['param']) => void;
}


//结构赋值,方法也可以传递
export const SearchPanel = ({param,setParam,users}:SearchPanelProps) =>{
    return <Form layout="inline" css={{marginBottom:'2rem'}}>
        <Form.Item>
            <Input placeholder={"项目名"} value={param.name} onChange={e=>setParam({
                ...param,
                name:e.target.value
            })}/>
          </Form.Item>
          <Form.Item>
              <UserSelect 
                defaultOptionName="负责人"
                value={param.personId} 
                onChange={(value:number|undefined)=>setParam({
                ...param,
                personId:value
            })}></UserSelect>
        </Form.Item>
    </Form>
}