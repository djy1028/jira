import React,{ReactNode, useEffect, useCallback} from 'react'
import * as auth from '../auth-provider'
import { FullPageLoading ,FullPageError} from '../components/lib'
import {User} from '../screen/projectlist/searchPanel'
import { http } from '../utils/http'
import { useAsync } from '../utils/use-async'
import * as authStore from '../store/auth.slice'
import { useDispatch, useSelector } from 'react-redux'
export interface AuthForm {
    username:string
    password:string
}
//初始化user
export const bootstrapUser = async ()=>{
    let user = null
    const token = auth.getToken()
    if(token){
        const data = await http('me',{token})
        user = data.user
    }
    return user
}


//创建context的provider
export const AuthProvider = ({children}:{children:ReactNode})=>{
    //useState用的是泛型，会看传入的initialState的类型\
    const {error,isLoading,isIdle,isError,run} = useAsync<User|null>()
    const dispatch:(...args:unknown[])=> Promise<User> = useDispatch()
    useEffect(()=>{
        run(dispatch(authStore.bootstrap()))
    },[])

    if(isIdle || isLoading){
        return <FullPageLoading />
    }

    if(isError){
        return <FullPageError error={error}/>
    }

    return <div>children</div>
}



//创建每个hooks接受到的全局context
export const useAuth = ()=>{
   //当我们自己方法返回函数时，记得用useCallback包裹
    const dispatch:(...args:unknown[])=>Promise<User> = useDispatch();
    const user = useSelector(authStore.selectUser)
    const login = useCallback((form:AuthForm) => dispatch(authStore.login(form)),[dispatch])
    const register = useCallback((form:AuthForm) => dispatch(authStore.register(form)),[dispatch])
    const logout = useCallback(() => dispatch(authStore.logout()),[dispatch])
    
    return {
        user,
        login,
        register,
        logout
    }
}