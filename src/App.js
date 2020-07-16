import React, {Component} from 'react';
import './App.css';
import TodoContaineer from './Components/TodoContainer'

const todosUrl = 'http://localhost:3000/todos'
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
  
  render(){
    return (
      <div className="App">
        <h1>Todo App</h1>
        <TodoContaineer todos={this.state.todos} />
      </div>
    );
  }
}

export default App;
