import React, {useEffect, useState} from 'react';
import './styling/App.scss';
import { LoginComponent } from "./components/LoginComponent";
import { MenuComponent } from "./components/MenuComponent";

import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import { DashboardComponent } from './components/DashboardComponent';
import { PreferencesComponent } from './components/PreferencesComponent';

function App() {

    const [token, setToken] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('swoleToken');
        if (token) {
            setToken(token);
        }

    })

    const setLocalStorageToken = (token: string) => {
        localStorage.setItem('swoleToken', token);
    }

    if (!token) {
        return (
            <div className={"App"}>
                <header className="App-header">
                    <MenuComponent/>
                </header>
                <LoginComponent setToken={setLocalStorageToken}/>
            </div>
        )

    }

    return (
    <div className="App">
      <header className="App-header">
        <MenuComponent/>
      </header>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={ token
                    ? <Navigate replace to="/dashboard" />
                    : <LoginComponent setToken={setLocalStorageToken}/> } />
                <Route path={'/dashboard'} element={<DashboardComponent/>} />
                <Route path={'preferences'} element={<PreferencesComponent/>} />
            </Routes>
        </BrowserRouter>
    </div>
    );
}

export default App;
