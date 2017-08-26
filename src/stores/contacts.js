import {observable, computed, action} from 'mobx';
import {Fb} from '../firebase/firebase-store';
import {map, toJS} from 'mobx';


class Contact{
    @observable name;
    @observable isAlive;
    @observable timeCreated;

    constructor(name){
        this.name = name;
        this.isAlive = true;
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

    @action add = (name) =>{
        const id = Fb.contacts.push().key;
        //this.update(id, name);
        
        var postData = toJS(new Contact(name));
       var updates = {};
       updates['/contacts/' + id] = postData;
       Fb.root.update(updates);
    }

    @action update = (id, name) =>{
        Fb.contacts.update({[id]:{name}})
    }

    @action delete = (id) =>{
        Fb.contacts.child(id).remove();
    }

}

const contacts = new Contacts();
export {contacts};