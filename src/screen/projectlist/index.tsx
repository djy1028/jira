import React ,{ useState , useEffect} from "react"
import { SearchPanel } from "./searchPanel"
import { List } from "./list"
import qs from 'qs'
import {ObjectCleanEmpty,useDebounce} from '../../utils/index'


const apiUrl = process.env.REACT_APP_API_URL

export const ProjectListScreen = () =>{
    
    
    const [param,setParam] = useState({
        name:'',
        personId:''
    })
    const [list,setList] = useState([])

    //渲染用户
    const [users,setUsers] = useState([])

    //利用自定义节流hook处理输入
    const debounceParam = useDebounce(param,2000)

    //渲染列表
    useEffect(()=>{
        fetch(`${apiUrl}/projects?${qs.stringify(ObjectCleanEmpty(debounceParam))}`).then(async response=>{
            if(response.ok){
                setList(await response.json())
            }
        })
    },[debounceParam])


    useEffect(()=>{
        fetch(`${apiUrl}/users`).then(async response=>{
            if(response.ok){
                setUsers(await response.json())
            }
        })
    },[])
    return <div>
        <SearchPanel users={users} param={param} setParam={setParam} />
        <List users={users} list ={list}/>
    </div>
}