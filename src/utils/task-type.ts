import { TaskType } from './../types/task-type';
import { useHttp } from './http';
import { useQuery } from 'react-query';
export const useTaskTypes = ()=>{
   
    const client = useHttp()

    //利用react-query改造原来的请求
    //useQuery的第一个参数可以为一个tuple，意思里面的值变化时，就会重新出发后面的请求
    return useQuery<TaskType[]>(['taskTypes'],()=>client('taskTypes'))
}