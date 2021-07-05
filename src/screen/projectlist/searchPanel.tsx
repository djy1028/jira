import React from "react"

export interface User{
    id:string
    name:string
    title:string
    email:string
    organization:string
    token:string
}

//组件属性介绍说明
interface SearchPanelProps{
    users:User[],
    param:{
        name:string;
        personId:string
    },
    setParam:(param:SearchPanelProps['param']) => void;
}


//结构赋值,方法也可以传递
export const SearchPanel = ({param,setParam,users}:SearchPanelProps) =>{
    return <form action="">
        <input  type="text" value={param.name} onChange={e=>setParam({
            ...param,
            name:e.target.value
        })}/>
        <select value={param.personId} onChange={e=>setParam({
            ...param,
            personId:e.target.value
        })}>
            <option value=" ">负责人</option>
            {
                users.map(user=>{
                    return  <option key={user.id} value={user.id}> {user.name}</option>
                })
            }
        </select>
    </form>
}