import { useHttp } from './http';
import { useQuery } from 'react-query';
import { Task } from '../types/task';
export const useTasks = (param?:Partial<Task>)=>{
   
    const client = useHttp()

    //利用react-query改造原来的请求
    //useQuery的第一个参数可以为一个tuple，意思里面的值变化时，就会重新出发后面的请求
    return useQuery<Task[]>(['tasks',param],()=>client('tasks',{data:param}))  //这里的泛型定义返回值的类型
}