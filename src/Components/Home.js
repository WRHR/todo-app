import React from 'react'
import TodoForm from './TodoForm'
import TodoContainer from './TodoContainer'

export default function Home(props){
    return(
        <>
            <TodoForm submitAction={props.addTodo}/>
            <TodoContainer 
            todos={props.todos} 
            submitAction={props.deleteTodo}
            updateTodo={props.updateTodo}
            />
        </>
    )
}