import React, {Component} from 'react';
import './App.css';
import TodoContaineer from './Components/TodoContainer'
import TodoForm from './Components/TodoForm'
import SignUpForm from './Components/SignUpForm';

const todosUrl = 'http://localhost:3000/todos/'
class App extends Component {

  state={
    todos: [],
    user: {},
    alerts: []
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
      body: JSON.stringify({todo: newTodo})
    })
      
  }

  updateTodo = (updatedTodo) => {
    let todos = this.state.todos.map(todo=> todo.id === updatedTodo.id ? updatedTodo : todo)
    this.setState({ todos })

    fetch(todosUrl+updatedTodo.id, {
      method:'PATCH',
      headers:{'Content-type':'application/json'},
      body: JSON.stringify({todo: updatedTodo})
    })
  }

  deleteTodo = (id) => {
    let filtered = this.state.todos.filter(todo => todo.id !== id)

    this.setState({
      todos: filtered
    })

    fetch(todosUrl+id, {method:'DELETE'})
  }

  signUp = (user) => {
    fetch('http://localhost:3000/users', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({user})
    })
    .then(response => response.json())
      .then(result => {
        if(result.errors){
          this.setState({alerts: result.errors})
        }
        else {
          localStorage.setItem('token', result.token)
          this.setState({
            user: result.user,
            alerts:['User successfully created!']
          })
        }
      })
  }
  
  render(){
    return (
      <div className="App">
        <h1>Todo App</h1>
        <SignUpForm signUp={this.signUp} alerts={this.state.alerts} />
        <TodoForm submitAction={this.addTodo}/>
        <TodoContaineer 
          todos={this.state.todos} 
          submitAction={this.deleteTodo}
          updateTodo={this.updateTodo}
        />

      </div>
    );
  }
}

export default App;
