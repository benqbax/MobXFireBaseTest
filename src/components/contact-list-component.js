import React, {Component} from 'react';
import {observer} from 'mobx-react';
import {map} from 'lodash';
import {ListItem, List} from 'material-ui/List';
import {ContactComponent} from './contact-component';
import TextField from 'material-ui/TextField';


@observer
export class ContactListComponent extends Component{
    
    clearInput=() =>{
        this.props.ContactStore.filter = "";
    }
   
    filter(e){
        this.props.ContactStore.filter = e.target.value;
    }

    handleSubmit = (e) =>{
        e.preventDefault();
        const value = this.contact.value;
        if(!value==""){
            this.props.ContactStore.add(value)
            this.contact.value = '';
        }
        else{
            alert("Please enter a name")
        }
        
    }

    handleDelete =(key) => {
        this.props.ContactStore.delete(key);
    }
    handleEditing = (key) =>{
        this.props.ContactStore.setEditing(key);
    }
   
   

        
        
    
    
    render(){
        const {ContactStore} = this.props;
        const ContactLi = map(ContactStore.filteredContacts, (contact, key) => (
            <ContactComponent
                ContactStore={ContactStore}
                contact ={contact}
                key = {key}
                id = {key}
            />
        ));
        
        return (
            <div>
                <form onSubmit = {e => this.handleSubmit(e)}>
                <input type="text" placeholder="New Contact" 
                ref = {input => this.contact = input}/>
                <button> Add bird </button>
                <br/>
                <TextField 
                    autoComplete="off"
                    floatingLabelText="Filter contacts"
                    id="text-field-controlled" 
                    value={ContactStore.filter} 
                    onChange={this.filter.bind(this)}/>
                </form>
                <hr/>
                <List>
                    {ContactLi}
                </List>
            </div>
        )
    }
}