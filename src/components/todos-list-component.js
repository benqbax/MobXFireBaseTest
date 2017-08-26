import React, {Component} from 'react';
import {observer} from 'mobx-react';
import {map} from 'lodash';

@observer
export class TodosListComponent extends Component{
   
    filter(e){
        this.props.TodoStore.filter = e.target.value;
    }

    handleSubmit = (e) =>{
        e.preventDefault();
        const value = this.todo.value;
        this.props.TodoStore.add(value)
        this.todo.value = '';
    }
    
    render(){
        const {TodoStore, filter} = this.props;
        TodoStore.filteredTodos;
        const TodoLi = map(TodoStore.json, (todo, key) => (
            <li 
            key={key}
            style={{
            textDecoration: !todo.isAlive ? 'line-through' : 'none'
            }}>
          {todo.name}</li>
        ));
        
        return (
            <div>

                <form onSubmit = {e => this.handleSubmit(e)}>
                <input type="text" placeholder="Enter Todo" 
                ref = {input => this.todo = input}/>
                <button> Add bird </button>
                <p>Double click to complete item</p>
                </form>
                <hr/>
                <ul>
                    {TodoLi}
                </ul>
            </div>
        )
    }
}