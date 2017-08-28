import React, {Component} from 'react';
import {observable, action} from 'mobx';
import {observer} from 'mobx-react';
import {map} from 'lodash';
import {ListItem, List} from 'material-ui/List';
import {ContactComponent} from './contact-component';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';
import FlatButton from 'material-ui/FlatButton';


@observer
export class ContactListComponent extends Component{
    @observable firstNameValue;
    @observable lastNameValue;
    @observable picture;
    @observable addingContact;
    @observable addButton;
    @observable picture;
    @observable uploadButton;

    componentWillMount(){
        this.resetInput();
        this.resetAddState();
    }

    
    
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

    handleEnterKeyDown = (e) =>{
        if(e.key == 'Enter'){
            this.onSave();
        }
    }

    handleFiles = (file) =>{
        var filePicture = file.target.files[0]
        this.setPicture(filePicture)
        this.updateUploadState();
       // this.props.ContactStore.uploadImage();
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

        const styles = {
            input:{
                marginLeft:12,
                marginTop:12,
                marginBottom:30,
            },
            button: {
                cursor: 'pointer',
                position: 'absolute',
                top: 0,
                bottom: 0,
                right: 0,
                left: 0,
                width: '100%',
                opacity: 0,
            }
            
           
        }
    
        let addContent;
        if(this.addingContact){
            addContent=(
                <div className="addContact">
                    <TextField 
                    onChange={this.onChangeFirstName}
                    className="input"
                    autoComplete="off"
                    value={this.firstNameValue}
                    floatingLabelText="First name"
                    id="text-field-controlled" 
                    />

                    <TextField 
                    onChange={this.onChangeLastName}
                    className="input"
                    autoComplete="off"
                    value={this.lastNameValue}
                    floatingLabelText="Last name"
                    id="text-field-controlled" 
                    onKeyPress={this.handleEnterKeyDown}                    
                    />


                    
                    <RaisedButton
                    label={!this.uploadButton ? "Upload image" : this.picture.name + " loaded"}
                    disabled={this.uploadButton}
                    labelPosition="before"
                    style={styles.input}
                    containerElement="label">
                            <input type="file" style={styles.button} onChange={this.handleFiles}/>
                        </RaisedButton>

                    <div className="saveButtons" >
                        <RaisedButton style={{marginLeft:12}} label="Cancel" onClick={this.resetAddState} />
                        <RaisedButton style={{marginLeft:12}}label="Save" primary={true} onClick={this.onSave} />
                    </div>
                </div>
            )
        }
        else{
            addContent=""
        }

        
        
        return (
            <div>
                <RaisedButton
                disabled={!this.addButton}
				label="Add Contact"
				primary={true}
				onClick={this.setAddState}
				style={{ marginLeft: 12 }}/>
                {addContent}
                
                <TextField 
                    className="filterinput"
                    autoComplete="off"
                    floatingLabelText="Filter contacts"
                    id="text-field-controlled" 
                    value={ContactStore.filter} 
                    onChange={this.filter.bind(this)}/>
                
                <List>
                    {ContactLi}
                </List>
            </div>
        )
    }


    //-------------actions------------//
    @action setPicture = (file) =>{
        this.picture = file;
    }

    @action setUploadState = () =>{
        this.uploadButton = false;
    }

    @action updateUploadState = () =>{
        this.uploadButton = !this.uploadButton;
    }

    @action resetAddState =() =>{
        this.addButton=true;
        this.addingContact=false;
    }

    @action setAddState = () =>{
        this.addButton=false;
        this.addingContact=true;
    }

    @action resetInput =()=>{
        this.firstNameValue = "";
        this.lastNameValue = "";
    }
    
    @action	onChangeFirstName = (e) => {
		this.firstNameValue = e.target.value;
		
	}

	@action	onChangeLastName = (e) => {
		this.lastNameValue = e.target.value;
	}

    @action onSave =() =>{
        this.props.ContactStore.add(this.firstNameValue, this.lastNameValue, this.picture)
        this.resetInput()
        this.resetAddState();
        
    }

    
}