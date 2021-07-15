import {QueryKey,useQueryClient} from "react-query"
export const useConfig = (queryKey:QueryKey,callback:(target:any,old?:any[])=>any[]) =>{
    const queryClient = useQueryClient()
    return {
        onSuccess:()=>queryClient.invalidateQueries(queryKey),
        //onMutate是在useMutation一发生，就立刻被调用
        async onMutate(target:any){
           
            const previousItems = queryClient.getQueryData(queryKey)
            queryClient.setQueryData(queryKey,(old?:any[])=>{
              return callback(target,old)
            }) 
            return {previousItems}
        },
        //回滚机制，用来处理异步处理的异常情况，纠正可能存在不正确的乐观更新
        onError(error:any,newItem:any,context:any){
            queryClient.setQueryData(queryKey,context.previousItems)
        }   
    }
}
/* 针对增删改不同情况，定义不同的hook */
export const useDeleteConfig = (queryKey:QueryKey)=>useConfig(queryKey,(target,old)=>old?.filter(item=>item.id !== target.id)||[])
export const useEditConfig = (queryKey:QueryKey)=>useConfig(queryKey,(target,old)=>old?.map(item=>item.id === target.id?{...item,...target}:item)||[])
export const useAddConfig = (queryKey:QueryKey)=>useConfig(queryKey,(target,old)=>old?[...old,target]:[])