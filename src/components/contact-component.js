

import React, {Component} from 'react';
import {observer} from 'mobx-react';
import {ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import IconButton from 'material-ui/IconButton';
import ModeEditIcon from 'material-ui/svg-icons/editor/mode-edit';
import TextField from 'material-ui/TextField';
import ActionAccountCircle from 'material-ui/svg-icons/action/account-circle'

@observer
export class ContactComponent extends Component{

   
    handleDelete =(id) =>{
           
        //handles if there are less than 2 filtered contacts, resets filter
        var condition = Object.keys(this.props.ContactStore.filteredContacts).length;
        if(condition<2){
            this.props.ContactStore.resetFilter();
        }
         
        setTimeout(() =>{
            this.props.ContactStore.delete(id);
        },200)
        
    }

   
   
   


    render(){
        const {contact, id} = this.props;
        
        return( 
            <ListItem
            leftAvatar={
                <Avatar src={contact.pictureUrl} size={40} />
            }
            primaryText={contact.firstName+" " +contact.lastName}
            rightIcon={<NavigationClose onClick={e => this.handleDelete( id)}/>}>
            
            </ListItem>
        )
       
       
        
    }
}


const inputStyle = {
    margin:0
}