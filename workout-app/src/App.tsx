import React from 'react';
import './styling/App.scss';
import { LoginComponent } from "./components/LoginComponent";
import { MenuComponent } from "./components/MenuComponent";

import {BrowserRouter, Routes, Route, Navigate, useNavigate} from 'react-router-dom';
import { DashboardPage } from './pages/DashboardPage';
import { PreferencesComponent } from './components/PreferencesComponent';
import { useToken } from "./utils/useToken";
import {NewWorkoutPage} from "./pages/NewWorkoutPage";
import {WorkoutHistoryPage} from "./pages/WorkoutHistoryPage";

function App() {

    const { token, setToken, deleteToken } = useToken();

    if (!token) {
        return (
            <div className={"App"}>
                <header className="App-header">
                    <MenuComponent
                        isSignOutVisible={false}
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
                    isSignOutVisible={true}
                    handleSignOut={deleteToken}
                />
              </header>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={ token
                            ? <Navigate replace to="/dashboard" />
                            : <LoginComponent setToken={setToken}/> } />
                        <Route path={'/dashboard'} element={<DashboardPage/>} />
                        <Route path={'/preferences'} element={<PreferencesComponent/>} />
                        <Route path={'/new-workout'} element={<NewWorkoutPage/>} />
                        <Route path={'/workout-history'} element={<WorkoutHistoryPage/>} />
                    </Routes>
                </BrowserRouter>
            </div>
        );
    }
}

export default App;
