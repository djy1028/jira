import {setupServer} from 'msw/node'
import {rest} from 'msw'
import { http } from '../utils/http';
const apiUrl = process.env.REACT_APP_API_URL

const server = setupServer();

//beforeAll 代表执行所有的测试之前，先来执行一下回调函数
beforeAll(()=>server.listen())

//每个测试跑完以后，都重置mock路由
afterEach(()=>server.resetHandlers())


// 所有测试跑完后，完毕mock路由
afterAll(()=>server.close())


test('http方法',async ()=>{
    const endpoint = 'test-endpoint';
    const mockResult = {mockValue:'mock'}
    server.use(
        rest.get(`${apiUrl}/${endpoint}`,(req,res,ctx)=>{
            res(ctx.json(mockResult))
        })
    )

    const result = await http(endpoint)
    expect(result).toEqual(mockResult)

})

