const redis=require('../redis')

const getTodoCount=async ()=>{
    const todosN=await redis.getAsync('todo_count')
    result = todosN ? Number(todosN) : 0
    return result
}

module.exports={getTodoCount}