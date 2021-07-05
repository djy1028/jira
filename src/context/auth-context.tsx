import React,{ReactNode, useState,useContext} from 'react'
import * as auth from '../auth-provider'
import {User} from '../screen/projectlist/searchPanel'
interface AuthForm {
    username:string
    password:string
}
const AuthContext = React.createContext<
    {   user: User | null; 
        login: (form: AuthForm) => Promise<void>; 
        register: (form: AuthForm) => Promise<void>; 
        logout: () => Promise<void>; 
    }|undefined>(undefined)
AuthContext.displayName = 'AuthContext'

export const AuthProvider = ({children}:{children:ReactNode})=>{
    //useState用的是泛型，会看传入的initialState的类型
    const [user,setUser] = useState<User | null>(null)
    const login = (form:AuthForm)=>auth.login(form).then(user=>setUser(user))
    const register = (form:AuthForm)=>auth.register(form).then(user=>setUser(user))
    const logout = ()=>auth.logout().then(()=>setUser(null))

    return <AuthContext.Provider children={children} value={{user,login,register,logout}}/>
}

export const useAuth = ()=>{
    //返回最近的context的值
    const context = useContext(AuthContext)
    if(!context){
        throw new Error("useAuth必须在AuthProvider中使用")
    }
    return context
}