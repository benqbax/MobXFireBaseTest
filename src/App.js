import React, { Component } from 'react';
import {TodosListComponent} from './components/todos-list-component'

class App extends Component {
  render() {
    return (
      <div className="App">
        <TodosListComponent TodoStore={this.props.TodoStore.todos} />
      </div>
    );
  }
}

export default App;
