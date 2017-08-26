import React, { Component } from 'react';
import {ContactListComponent} from './components/contact-list-component'

class App extends Component {
  render() {
    return (
      <div className="App">
        <ContactListComponent ContactStore={this.props.ContactStore.contacts} />
      </div>
    );
  }
}

export default App;
