

import React, {Component} from 'react';
import {observer} from 'mobx-react';
import {map} from 'lodash';
import {ListItem} from 'material-ui/List';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import IconButton from 'material-ui/IconButton';
import ModeEditIcon from 'material-ui/svg-icons/editor/mode-edit';
import TextField from 'material-ui/TextField';

const Edit ={
    text: "Edit"
}

@observer
export class ContactComponent extends Component{

    componentWillMount(){
       // ListItem.defaultProps.disableTouchRipple = true; 
       // ListItem.defaultProps.disableFocusRipple = true;
        
    }

    constructor(props){
        super(props);
        this.state={
            editing:false,
            value:this.props.contact.name
        }
    }
   
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

    handleEditing =() =>{
        this.setState({
            editing:!this.state.editing

        })
    }
   
    //updates the list item
    handleChange = (event) => {
        this.setState({
          value: event.target.value,
        }, () =>{
            this.props.ContactStore.update(this.props.id, this.state.value) 
        });
       
      };
    
    //handles if you press enter when changing the name
    handleEnter = (event) =>{
        if(event.key=='Enter'){
            this.handleEditing();
        }
    }


    render(){
        const {contact, id} = this.props;
        const isEditing = this.state.editing;
       if(!isEditing){
        return(
            <ListItem
            primaryText={contact.name}
            leftIcon={<ModeEditIcon onClick={e =>this.handleEditing()}/>}
            rightIcon={<NavigationClose onClick={e => this.handleDelete( id)}/>}/>
        )
       }
       else{
           return(
               <ListItem
               disableTouchRipple={true}
                style={inputStyle}
                leftIcon={<ModeEditIcon onClick={e =>this.handleEditing()}/>}>
                    <TextField
                        style={inputStyle}
                        id="text-field-controlled"
                        value={this.state.value}
                        onChange={this.handleChange}
                        onKeyPress={this.handleEnter}
                    />
                </ListItem>
           )
       }
        
    }
}


const inputStyle = {
    margin:0
}