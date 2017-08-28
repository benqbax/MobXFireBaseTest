import {observable, computed, action} from 'mobx';
import {Fb} from '../firebase/firebase-store';
import {toJS} from 'mobx';


class Contact{
    @observable firstName;
    @observable lastName;
    @observable timeCreated;
    @observable pictureUrl;
    @observable pictureUrlRef;

    constructor(firstName, lastName, picture){
        this.firstName = firstName;
        this.lastName =lastName;
        this.timeCreated = Date.now();
        this.pictureUrl = picture
        this.pictureUrlRef = null;
    }

    @action setPictureUrl=(url)=>{
        this.pictureUrl=url;
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
            .filter(key =>!this.filter|| matchesFilter.test(jsonContacts[key].firstName) || matchesFilter.test(jsonContacts[key].lastName) )
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
    

    @action add = (first, last, picture) =>{
        const id = Fb.contacts.push().key;

        //this.update(id, name);
        //uploading image
        this.uploadImage(picture, id);
        //checkes if name has been added before
            var postData = toJS(new Contact(first, last, picture));
            var updates = {};
            updates['/contacts/' + id] = postData;
            Fb.root.update(updates);
    }

    /*
    @action update = (id, first, last) =>{
            Fb.reff.ref('/contacts/' + id).update(
            {firstName: first,
            lastName: last})
    }*/

    @action delete = (id) =>{
        Fb.contacts.child(id).remove();
    }

    @action resetFilter = () => {
        this.filter = "";
        console.log(this.filter)
    }

    @action setImage = (id) =>{
        var ref = this;
        this.pictureUrlRef.getDownloadURL().then(function(url) {
            console.log(url)
            console.log(ref.contacts[id])
            ref.contacts[id].pictureUrl =  url;
        }).catch(function(error) {
          console.log(error)
        })

    }

    @action uploadImage =(file, id) =>{
        var imageRef = Fb.storageRef.child(id + '/' + file.name);
       this.pictureUrlRef = imageRef;
       var ref = this;
       imageRef.put(file).then(function(snapshot) {
            console.log('Uploaded a file!');
            ref.setImage(id)
          });  
    }


}

const contacts = new Contacts();
export {contacts};