import { ObjectCleanEmpty } from './index';
import { useMemo } from "react"
import { useSearchParams ,URLSearchParamsInit} from "react-router-dom"

/* 
    返回页面url中，指定键的参数值
    reduce中的返回值依据传入的初始initialValue,因此这边需要固定传入的initialValue的类型
*/
export const useUrlQueryParam = <K extends string>(keys:K[])=>{
    //react 自带的hook 获取url里面的参数 
    const [searchParams,setSearchParam] = useSearchParams()
    //useEffect 和useMemo的依赖项为obj类型时，会造成往复循环，但是当为obj类的state,即由hooks返回的状态时，不会形成循环渲染
    //基本类型，组件状态可以放到依赖里面，非组件状态的对象不可以放到依赖里面
    return [
        useMemo(()=>keys.reduce((prev:{ [key in K]:string }, key:K)=>{
            return {...prev,[key]:searchParams.get(key)||''}
        },{} as { [key in K]:string }),[searchParams]),
        
        (params :Partial<{[key in K]:unknown}>)=>{
            const o = ObjectCleanEmpty({...Object.fromEntries(searchParams),...params}) as URLSearchParamsInit
            return setSearchParam(o)
        }
    ] as const
}

/* 
  as const 用来固定死tuple中的类型定义
*/
// const a = ['jack',12,{gender:'male'}] as const

export const useSetUrlSearchParam = () => {
    const [searchParams, setSearchParam] = useSearchParams();
    return (params: { [key in string]: unknown }) => {
      const o = ObjectCleanEmpty({
        ...Object.fromEntries(searchParams),
        ...params,
      }) as URLSearchParamsInit;
      return setSearchParam(o);
    };
  };
  