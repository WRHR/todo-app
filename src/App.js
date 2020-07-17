import React, {Component} from 'react';
import './App.css';
import TodoContaineer from './Components/TodoContainer'
import TodoForm from './Components/TodoForm'

const todosUrl = 'http://localhost:3000/todos/'
class App extends Component {

  state={
    todos: []
  }

  componentDidMount(){
    this.getTodos()
  }
  
  getTodos = () =>{
    fetch(todosUrl)
      .then(resp => resp.json())
      .then(todos => this.setState({todos}))
  }

  addTodo = (newTodo) => {
    this.setState({
      todos: [...this.state.todos, newTodo]
    })

    fetch(todosUrl, {
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify(newTodo)
    })
  }

  deleteTodo = (id) => {
    let filtered = this.state.todos.filter(todo => todo.id !== id)

    this.setState({
      todos: filtered
    })

    fetch(todosUrl+id, {method:'DELETE'})
  }
  
  render(){
    return (
      <div className="App">
        <h1>Todo App</h1>
        <TodoForm addTodo={this.addTodo}/>
        <TodoContaineer 
          todos={this.state.todos} 
          deleteTodo={this.deleteTodo}
        />

      </div>
    );
  }
}

export default App;
