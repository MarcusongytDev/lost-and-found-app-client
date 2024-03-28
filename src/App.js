import React, { Component, useEffect, useState } from 'react';
import './App.css';
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom'; // Install components, router, route
import Home from "./pages/home";
import lostItemCatalog from "./pages/lostItemCatalog";
import LostItemNotice from './pages/lostItemNotice';
import FoundItemNotice from './pages/foundItemNotice';
import Template from './pages/template';
import ContactFinder from './pages/contactFinder';  
import Settings from './pages/settings';

// class App extends Component {

//     constructor(props) {
//         super(props);
//         this.state = {
//           users: []
//         }
//     }

//     componentDidMount() {

//       fetch('http://localhost:5000/api', {
//         method: "GET",
//         mode: "cors",
//         headers: {
//           "Content-Type":"application/json",
//         }
//       })
//       .then(response => response.json())
//       .then(res => {
//         //check if response has data
//           if (res.data) {
//             this.setState({ users: [...this.state.users, ...res.data] })
//           }
//       });

//     }

//     renderUsers() {

//       if (this.state.users.length <= 0) {
//         return <div>loading...</div>
//       }
//       else {
//         return this.state.users.map((val, key) => {
//           return <div key={key}>{val.name} | {val.age}</div>
//         })
//       }

//     }

//     render() {
//       return (
//         <div className="App">
//           { this.renderUsers() }
//         </div>
//       );
//     }

// }

function Apps(){
  return (
    <div className="App">
      <Router>
        <Template/>
        <Routes>
          <Route path="/">
            <Route path = "home" exact element={<Home/>} />
            <Route path = "lostItemNotice" exact element={<LostItemNotice/>} />
            <Route path = "lostItemCatalog" exact element={<lostItemCatalog/>} />
            <Route path = "settings" exact element={<Settings/>} />
            <Route path = "foundItemNotice" exact element={<FoundItemNotice/>} />
            <Route path = "contactFinder" exact element={<ContactFinder/>} /> 
          </Route>
        </Routes>
      </Router>
    </div>
  );
}
// function App() {

//   //declare backendData as a state variable
//   const [backendData, setBackendData] = useState([{}]);

//   //inside the useEffect hook, we set the backendData state variable after fetching the data
//   //from the backend via api call
//   useEffect(() => {
//     fetch('/api').then(
//       //response will be the res.json from the api call
//       response => response.json()
//     ).then(
//       data => {
//         setBackendData(data);
//       }
//     );
//     //[] tells useEffect block to run only after the first render
//   }, []);

//   getData();

//   return (

//     //if backendData is undefined(api fetch not working), render a loading on the screen
//     //else if api fetch has worked, map the users to a <p> and display them
//     <div>
      
//       {(typeof backendData.users === 'undefined') ? (
//         <p>Loading...</p>
//       ) : (
//         backendData.users.map((user, i) => (
//           <p key={i}>{user}</p>
//         ))
//       )}

//     </div>
//   );
// }

// async function getData() {

//   const request = new Request('/api', {
//     method: 'GET'
//   })

//   const res = await fetch(request);
//   const data = await res.json()
//   console.log(res)
//   console.log(data)

// }

export default Apps;