import {observable, computed, action} from 'mobx';
import {Fb} from '../firebase/firebase-store';
import {map, toJS} from 'mobx';


class Contact{
    @observable name;
    @observable timeCreated;

    constructor(name){
        this.name = name;
        this.editing = false;
        this.timeCreated = Date.now();
    }


}

class Contacts{
    @observable filter = "";
    @observable contacts = observable.map({});


    constructor() {
        Fb.contacts.on('value', (snapshot) => {
            this.contacts = snapshot.val();
        });
    }

    @computed get json(){
        return toJS(this.contacts);
    }

    @computed get filteredContacts(){
        var matchesFilter = new RegExp(this.filter, 'i');
        var jsonContacts = toJS(this.contacts);

        //makes sure that you can filter even without any todos
        if (jsonContacts==null){
            return jsonContacts;
        }
        else{
            var result = Object.keys(jsonContacts)
            .filter(key =>!this.filter|| matchesFilter.test(jsonContacts[key].name))
            .reduce((obj, key) =>{
                obj[key] = jsonContacts[key];
                return obj;
            }, {});
            return result;
        }
   
    }

    validate(name, key){
        var dublicate = false;
        if(toJS(this.contacts)!=null){
            Object.keys(toJS(this.contacts))
            .map((key,value) =>{
                if(this.contacts[key].name === name){
                    
                    dublicate =  true;
                }
                else{
                    dublicate =  false;
                }
            });
        }
        return dublicate
    }
    

    @action add = (name) =>{
        const id = Fb.contacts.push().key;
        //this.update(id, name);
        
        //checkes if name has been added before
        var dublicate = false;
        if(toJS(this.contacts)!=null){
            Object.keys(toJS(this.contacts))
            .map((key,value) =>{
                if(this.contacts[key].name === name){
                    dublicate = true;
                    alert("Please choose another name")
                    
                }
            });
        }
        
        if(!dublicate){
            var postData = toJS(new Contact(name));
            var updates = {};
            updates['/contacts/' + id] = postData;
            Fb.root.update(updates);
        }
       
    }

    @action update = (id, name) =>{
            Fb.reff.ref('/contacts/' + id).update(
            {name: name})
        
    }

    @action delete = (id) =>{
        Fb.contacts.child(id).remove();
    }

    @action resetFilter =() => {
        this.filter = "";
        console.log(this.filter)
        

        
    }

}

const contacts = new Contacts();
export {contacts};