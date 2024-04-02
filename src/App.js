import React, { Component, useEffect, useState } from 'react';
import './App.css';
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom'; // Install components, router, route
import Home from "./pages/NewHomePage";
import LostItemCatalog from "./pages/lostItemCatalog";
import LostItemNotice from './pages/lostItemNotice';
import FoundItemNotice from './pages/foundItemNotice';
import Template from './pages/template';
import ContactFinder from './pages/contactFinder';  
import Settings from './pages/settings';
import filteredSearch from './pages/filteredSearch';
import FilteredSearch from './pages/filteredSearch';



function Apps(){
  return (
    <div className="App">
      <Router>
        <Template/>
        <Routes>
          <Route path="/">
            <Route path = "home" exact element={<Home/>} />
            <Route path = "lostItemNotice" exact element={<LostItemNotice/>} />
            <Route path = "lostItemCatalog" exact element={<LostItemCatalog/>} />
            <Route path = "settings" exact element={<Settings/>} />
            <Route path = "foundItemNotice" exact element={<FoundItemNotice/>} />
            <Route path = "contactFinder" exact element={<ContactFinder/>} /> 
            <Route path = "filteredSearch" exact element={<FilteredSearch/>} /> 
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default Apps;