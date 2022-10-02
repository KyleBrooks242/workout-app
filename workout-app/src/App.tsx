import React from 'react';
import './styling/App.scss';
import { LoginComponent } from "./components/LoginComponent";
import { MenuComponent } from "./components/MenuComponent";

import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import { DashboardComponent } from './components/DashboardComponent';
import { PreferencesComponent } from './components/PreferencesComponent';
import { useToken } from "./utils/useToken";

function App() {

    const { token, setToken, deleteToken } = useToken();

    if (!token) {
        return (
            <div className={"App"}>
                <header className="App-header">
                    <MenuComponent
                        isSignOutVisible={!!token}
                        handleSignOut={deleteToken}/>
                </header>
                <LoginComponent setToken={setToken}/>
            </div>
        )

    }

    else {
        return (
            <div className="App">
              <header className="App-header">
                <MenuComponent
                    isSignOutVisible={!!token}
                    handleSignOut={deleteToken}
                />
              </header>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={ token
                            ? <Navigate replace to="/dashboard" />
                            : <LoginComponent setToken={setToken}/> } />
                        <Route path={'/dashboard'} element={<DashboardComponent/>} />
                        <Route path={'preferences'} element={<PreferencesComponent/>} />
                    </Routes>
                </BrowserRouter>
            </div>
        );
    }
}

export default App;
