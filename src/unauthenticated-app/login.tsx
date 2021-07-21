import React from 'react'
import { useAuth } from '../context/auth-context'
import { Form,Input } from 'antd'
import {LongButton} from './index'
import { useAsync } from '../utils/use-async'
export const LoginScreen = ({onError}:{onError:(error:Error)=>void}) =>{
    const {login} = useAuth()
    const {run,isLoading} = useAsync(undefined,{throwNewError:true})
    const handleSubmit = async (values:{username:string,password:string})=>{
       

        //try catch是同步的，所以catch里面是无法捕获异步操作login里面返回的错误，所以需要加上async await进行处理
        try{

            //这里通过run来设置isloading的状态
           await run(login(values))
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
                <LongButton loading={isLoading} htmlType={'submit'} type={'primary'} >登录</LongButton>
            </Form>
}