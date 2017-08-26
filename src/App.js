import React, { Component } from 'react';
import {ContactListComponent} from './components/contact-list-component'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {deepOrange500} from 'material-ui/styles/colors';


const muiTheme = getMuiTheme({
  palette: {
    accent1Color: deepOrange500
  }
});

class App extends Component {

  

  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
      <div className="App">
        <ContactListComponent ContactStore={this.props.ContactStore.contacts} />
      </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
