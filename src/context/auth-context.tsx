import React,{ReactNode, useState,useContext, useEffect} from 'react'
import { useQueryClient } from 'react-query'
import * as auth from '../auth-provider'
import { FullPageLoading ,FullPageError} from '../components/lib'
import { User } from "../types/user"
import { http } from '../utils/http'
import { useAsync } from '../utils/use-async'
interface AuthForm {
    username:string
    password:string
}
//初始化user
const bootstrapUser = async ()=>{
    let user = null
    const token = auth.getToken()
    if(token){
        const data = await http('me',{token})
        user = data.user
    }
    return user
}

//创建context
const AuthContext = React.createContext<
    {   user: User | null; 
        login: (form: AuthForm) => Promise<void>; 
        register: (form: AuthForm) => Promise<void>; 
        logout: () => Promise<void>; 
    }|undefined>(undefined)
AuthContext.displayName = 'AuthContext'

//创建context的provider
export const AuthProvider = ({children}:{children:ReactNode})=>{
    //useState用的是泛型，会看传入的initialState的类型\
    const {data:user,error,isLoading,isIdle,isError,run,setData:setUser} = useAsync<User|null>()

    const queryClient = useQueryClient()

    const login = (form:AuthForm)=>auth.login(form).then(user=>setUser(user))
    const register = (form:AuthForm)=>auth.register(form).then(user=>setUser(user))
    const logout = ()=>auth.logout().then(()=>{
        
        setUser(null)
        queryClient.clear()
    })

    useEffect(()=>{
        run(bootstrapUser())
    },[])

    if(isIdle || isLoading){
        return <FullPageLoading />
    }

    if(isError){
        return <FullPageError error={error}/>
    }

    return <AuthContext.Provider children={children} value={{user,login,register,logout}}/>
}



//创建每个hooks接受到的全局context
export const useAuth = ()=>{
    //返回最近的context的值
    const context = useContext(AuthContext)
    if(!context){
        throw new Error("useAuth必须在AuthProvider中使用")
    }
    return context
}