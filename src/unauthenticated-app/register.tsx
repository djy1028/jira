import React from 'react'
import { useAuth } from '../context/auth-context'
import { Form,Input } from 'antd'
import {LongButton} from './index'
import { useAsync } from '../utils/use-async'
export const RegisterScreen =({onError}:{onError:(error:Error)=>void}) =>{
    const {register} = useAuth()
    const {run,isLoading} = useAsync(undefined,{throwNewError:true})
    const handleSubmit = async ({cpassword,...values}:{username:string,password:string,cpassword:string})=>{

        //确认密码功能
        if(cpassword !== values.password){
            onError(new Error('请确认两次输入的密码相同'))
            return
        }
        try{
            await run(register(values))
        }
        catch(e){
            onError(e)
        }
    }
    return <Form onFinish={handleSubmit} >
        <Form.Item name={'username'} rules={[{required:true,message:"请输入用户名"}]}>
            <Input type="text" placeholder={'用户名'} id="username"/>
        </Form.Item>
        <Form.Item name={'password'} rules={[{required:true,message:"请输入密码"}]}>
            <Input type="password"  placeholder={'密码'} id="password"/>
        </Form.Item>
        <Form.Item name={'cpassword'} rules={[{required:true,message:"请确认输入密码"}]}>
            <Input type="password"  placeholder={'确认密码'} id="cpassword"/>
        </Form.Item>
        <LongButton loading={isLoading} htmlType={'submit'} type={'primary'} >注册</LongButton>
    </Form>
}