import React, { Component, useEffect, useState } from 'react';
import './App.css';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'; // Install components, router, route
import NewHomePage from "./pages/NewHomePage";
import LostItemCatalog from "./pages/lostItemCatalog";
import LostItemNotice from './pages/lostItemNotice';
import FoundItemNotice from './pages/foundItemNotice';
import Template from './pages/template';
import ContactFinder from './pages/contactFinder';  
import Settings from './pages/settings';
import FilteredSearch from './pages/filteredSearch';
import LostItemMap from './pages/lostItemMap';
import LoginPage from './pages/loginPage';
import LostItemDescription from './pages/lostItemDescription';
import { Link } from 'react-router-dom';
import { AuthContextProvider } from './context/AuthContext';


function Apps(){

  return (
    <div className="App">
      <AuthContextProvider>
      <Router>
        <Routes>
          <Route path="/">
            <Route path = "" exact element={<Navigate to="home" />} />
            <Route path = "home" exact element={<><Template/><NewHomePage/></>} />
            <Route path = "lostItemNotice" exact element={<><Template/><LostItemNotice/></>} />
            <Route path = "lostItemCatalog" exact element={<><Template/><LostItemCatalog/></>} />
            <Route path = "settings" exact element={<><Template/><Settings/></>} />
            <Route path = "foundItemNotice" exact element={<><Template/><FoundItemNotice/></>} />
            <Route path = "contactFinder" exact element={<><Template/><ContactFinder/></>} /> 
            <Route path = "filteredSearch" exact element={<><Template/><FilteredSearch/></>} />
            <Route path = "loginPage" exact element={<><Template/><LoginPage/></>} />
            <Route path = "LostItemMap" exact element={<LostItemMap/>} /> 
            <Route path = "LostItemDescription/:id" exact element={<LostItemDescription/>} /> 
          </Route>
        </Routes>
      </Router>
      </AuthContextProvider>
    </div>
  );
}

export default Apps;
