import { useHttp } from './http';
import { Kanban } from './../types/kanban';
import { useQuery } from 'react-query';
export const useKanbans = (param?:Partial<Kanban>)=>{
   
    const client = useHttp()

    //利用react-query改造原来的请求
    //useQuery的第一个参数可以为一个tuple，意思里面的值变化时，就会重新出发后面的请求
    return useQuery<Kanban[]>(['kanbans',param],()=>client('kanbans',{data:param}))  //这里的泛型定义返回值的类型
}