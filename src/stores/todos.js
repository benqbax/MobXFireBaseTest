import {observable, computed, action} from 'mobx';
import {Fb} from '../firebase/firebase-store';
import {map, toJS} from 'mobx';


class Todo{
    @observable name;
    @observable isAlive;
    @observable timeCreated;

    constructor(name){
        this.name = name;
        this.isAlive = true;
        this.timeCreated = Date.now();
    }

}

class Todos{
    @observable filter = "";
    @observable todos = observable.map({});


    constructor() {
        Fb.todos.on('value', (snapshot) => {
            this.todos = snapshot.val();
        });
    }

    @computed get json(){
        return toJS(this.todos);
    }

    @computed get filteredTodos(){
        var matchesFilter = new RegExp(this.filter, 'i');
        var test = toJS(this.todos);
        
    }

    @action add = (name) =>{
        const id = Fb.todos.push().key;
        console.log(toJS(new Todo(name)))
        //this.update(id, name);
        
        var postData = toJS(new Todo(name));
       var updates = {};
       updates['/todos/' + id] = postData;
       Fb.root.update(updates);
    }

    @action update = (id, name) =>{
        Fb.todos.update({[id]:{name}})
    }

    @action delete = (id) =>{
        Fb.todos.child(id).remove();
    }

}

const todos = new Todos();
export {todos};