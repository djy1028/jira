import { useMountedRef } from './index';
import React,{useCallback, useReducer, useState} from "react"

//stat反应useAsync异步操作的状态
interface State<D>{
    error:Error | null
    data:D | null
    stat:'idle' | 'loading' | 'error' | 'success'
}

const defaultInitialState:State<null> = {
    stat:'idle',
    data:null,
    error:null

}

const defaultConfig = {
    throwNewError:false
}


const useSafeDispatch = <T>(dispatch:(...args:T[]) => void)=>{
    const mountedRef = useMountedRef();
    return useCallback((...args:T[])=>(mountedRef.current?dispatch(...args): void 0),[dispatch,mountedRef])
}



//可以用useReducer改造use-Async
//useState适合定义单个状态，useReducer适合定义一群会相互影响的状态

export const useAsync = <D>(initialState?:State<D>,initialConfig?:typeof defaultConfig)=>{
    const config = {defaultConfig,...initialConfig}
    const [state,dispatch] = useReducer((state:State<D>,action:Partial<State<D>>)=>({...state,...action}),{
        ...defaultInitialState,
        ...initialState
    })
    /* useState中直接传入函数的含义是惰性初始化,所以用useState保存函数时候，不能直接传入函数  */
    const [retry,setRetry] = useState(()=>()=>{

    })

    const safeDispatch = useSafeDispatch(dispatch)

    const setData = useCallback(
        
        (data:D)=>safeDispatch({
            data,
            stat:'success',
            error:null
        })
    ,[safeDispatch])

    const setError = useCallback( 
        (error:Error)=>safeDispatch({
            error,
            stat:'error',
            data:null
        })
    ,[safeDispatch])
    
    //其他地方需要在useEffect的依赖中加入run，这边需要用useCallback对run进行优化处理


    //run函数用来触发异步请求,参数是一个promise
    const run = useCallback((promise:Promise<D>,runConfig?:{retry:()=>Promise<D>})=>{
        if(!promise || !promise.then()){
            //throw error会打断一切的进程
            throw new Error('请传入promise类型数据')
        }


        //存一个函数，因此oldpromise也就存下来了
        if(runConfig?.retry){
            setRetry(()=>()=>run(runConfig?.retry(),runConfig))
        }

        //异步刚开始时需要设置一个loading
        safeDispatch({stat:'loading'})

        return promise.then(data=>{
            //阻止在已经卸载的组件上设置数据的错位行为

            //异步操作成功返回时设置数据
            setData(data)
            return data
        }).catch(err=>{

            //catch会消化异常，如果不主动抛出，外面是接受不到异常的
            setError(err)
            // if(config.throwNewError) return Promise.reject(err)
            return err
        })
    },[config.throwNewError, setData,setError,safeDispatch])

    return {
        isIdle:state.stat === 'idle',
        isLoading:state.stat === 'loading',
        isError:state.stat ==='error',
        isSuccess:state.stat ==='success',
        run,
        setData,
        setError,
        ...state,
        retry
    }
}