import React, {useEffect} from 'react';
import './styling/App.scss';
import { lightTheme, darkTheme} from "./styling/theme";
import { LoginComponent } from "./components/LoginComponent";
import { MenuComponent } from "./components/MenuComponent";
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import { DashboardPage } from './pages/DashboardPage';
import { PreferencesComponent } from './components/PreferencesComponent';
import { useToken } from "./utils/useToken";
import {NewWorkoutPage} from "./pages/NewWorkoutPage";
import {WorkoutHistoryPage} from "./pages/WorkoutHistoryPage";
import {ThemeProvider} from "@mui/material";
import { useCustomThemeHook } from "./utils/useCustomThemeHook";

function App() {

    const { token, setToken, deleteToken } = useToken();
    const { isDarkTheme, setTheme } = useCustomThemeHook();

    if (!token) {
        return (
            <ThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
                <div className={`App ${isDarkTheme ? 'dark-theme' : 'light-theme'}`}>
                        <MenuComponent
                            isSignedIn={false}
                            handleSignOut={deleteToken}
                            handleTheme={setTheme}
                        />
                    <LoginComponent setToken={setToken}/>
                </div>
            </ThemeProvider>
        )
    }

    else {
        return (
            <ThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
                <div className={`App ${isDarkTheme ? 'dark-theme' : 'light-theme'}`}>
                    <MenuComponent
                        isSignedIn={true}
                        handleSignOut={deleteToken}
                        handleTheme={setTheme}
                    />
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
            </ThemeProvider>

        );
    }
}

export default App;
