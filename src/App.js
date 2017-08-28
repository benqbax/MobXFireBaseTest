import React, { Component } from 'react';
import {ContactListComponent} from './components/contact-list-component'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {deepOrange500} from 'material-ui/styles/colors';
import {Card, CardActions, CardTitle} from 'material-ui/Card';


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
        <Card className="sidebar">
        <CardTitle title="My Contacts" />
        <ContactListComponent ContactStore={this.props.ContactStore.contacts} />
        </Card>
      </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
