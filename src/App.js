import React, { Component } from 'react';
import './App.css'; // Import the CSS file for styling
// Import the BasicExample component
import NewHomePage from './pages/NewHomePage';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    };
  }

  componentDidMount() {
    fetch('http://localhost:5000/api', {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(res => {
        if (res.data) {
          this.setState({ users: [...this.state.users, ...res.data] });
        }
      });
  }

  renderUsers() {
    if (this.state.users.length <= 0) {
      return <div>loading...</div>;
    } else {
      return this.state.users.map((val, key) => {
        return <div key={key}>{val.name} | {val.age}</div>;
      });
    }
  }

  render() {
    return (
      <div className="App">
        {this.renderUsers()} 
        {/* Render the BasicExample component here */}
        <NewHomePage />
      </div>
    );
  }
}

export default App;
