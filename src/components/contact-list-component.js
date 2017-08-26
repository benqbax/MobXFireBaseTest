import React, {Component} from 'react';
import {observer} from 'mobx-react';
import {map} from 'lodash';

@observer
export class ContactListComponent extends Component{
    
   
    filter(e){
        this.props.ContactStore.filter = e.target.value;
    }

    handleSubmit = (e) =>{
        e.preventDefault();
        const value = this.contact.value;
        this.props.ContactStore.add(value)
        this.contact.value = '';
    }

    handleDelete =(key) => {
        this.props.ContactStore.delete(key);
    }
    
    render(){
        const {ContactStore, filter} = this.props;
        const ContactLi = map(ContactStore.filteredContacts, (contact, key) => (
            <li 
            key={key}
            style={{
            textDecoration: !contact.isAlive ? 'line-through' : 'none'
            }}>
          {contact.name} <a href="#"  onClick={e => this.handleDelete(key)}>x</a> </li> 
        ));
        
        return (
            <div>

                <form onSubmit = {e => this.handleSubmit(e)}>
                <input type="text" placeholder="New Contact" 
                ref = {input => this.contact = input}/>
                <button> Add bird </button>
                <p>Double click to complete item</p>
                <p>Filter</p>
                <input className="filter" value={filter} onChange={this.filter.bind(this)}/>
                </form>
                <hr/>
                <ul>
                    {ContactLi}
                </ul>
            </div>
        )
    }
}