import React, {useEffect} from 'react';
import './styling/App.scss';
import { lightTheme, darkTheme} from "./styling/theme";
import { LoginComponent } from "./components/LoginComponent";
import { MenuComponent } from "./components/MenuComponent";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { DashboardPage } from './pages/DashboardPage';
import { PreferencesComponent } from './components/PreferencesComponent';
import { useToken } from "./utils/useToken";
import { NewWorkoutPage } from "./pages/NewWorkoutPage";
import { WorkoutHistoryPage } from "./pages/WorkoutHistoryPage";
import {Switch, ThemeProvider} from "@mui/material";
import { useCustomThemeHook } from "./utils/useCustomThemeHook";
import { ProfilePage } from "./pages/ProfilePage";

function App() {

    const { token, setToken, deleteToken } = useToken();
    const { isDarkTheme, setTheme } = useCustomThemeHook();

    // if (!token) {
    //     // console.log(window.location.href);
    //     // if (!window.location.href.endsWith('/dashboard')) {
    //     //     const oldPath = window.location.href;
    //     //     //This should match any pattern like /foo, /foo/, /bar, etc.
    //     //     const matched = oldPath.match(/\/[^\/]*\/*$/);
    //     //     const newPath = oldPath.replace(/\/[^\/]*\/*$/, '/dashboard');
    //     //     window.location.href = newPath;
    //     // }
    //
    //     return (
    //         <ThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
    //             <div className={`App ${isDarkTheme ? 'dark-theme' : 'light-theme'}`}>
    //                     <MenuComponent
    //                         isSignedIn={false}
    //                         handleSignOutClicked={deleteToken}
    //                         handleThemeToggled={setTheme}
    //                     />
    //                 <LoginComponent setToken={setToken}/>
    //             </div>
    //         </ThemeProvider>
    //     )
    // }

    // else {
        return (
            <BrowserRouter>
                <ThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
                    <div className={`App ${isDarkTheme ? 'dark-theme' : 'light-theme'}`}>
                        <MenuComponent
                            isSignedIn={true}
                            handleSignOutClicked={deleteToken}
                            handleThemeToggled={setTheme}
                        />
                            <Routes>
                                {
                                    !token &&
                                    <React.Fragment>
                                        <Route path={'/login'} element={<LoginComponent setToken={setToken} /> } />
                                        <Route path="*" element={<Navigate replace to="/login" />} />
                                    </React.Fragment>
                                }

                                {
                                    token &&
                                    <React.Fragment>
                                        <Route path="/login" element={<Navigate replace to="/dashboard" />} />
                                        <Route path={'/dashboard'} element={<DashboardPage/>} />
                                        <Route path={'/preferences'} element={<PreferencesComponent/>} />
                                        <Route path={'/new-workout'} element={<NewWorkoutPage/>} />
                                        <Route path={'/workout-history'} element={<WorkoutHistoryPage/>} />
                                        <Route path={'/profile'} element={<ProfilePage /> } />
                                        <Route path="*" element={<Navigate replace to="/dashboard" />} />
                                    </React.Fragment>
                                }
                            </Routes>
                    </div>
                </ThemeProvider>
            </BrowserRouter>

        );
    // }
}

export default App;
