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
import { ThemeProvider} from "@mui/material";
import { useCustomThemeHook } from "./utils/useCustomThemeHook";
import { ProfilePage } from "./pages/ProfilePage";
import {useProfileImage} from "./utils/useProfileImage";

function App() {

    const { token, setToken, deleteToken } = useToken();
    const { image, deleteImage, setImage } = useProfileImage();
    const { isDarkTheme, setTheme } = useCustomThemeHook();

        const handleSignOut = () => {
            deleteToken();
            deleteImage();
        }

        return (
            <BrowserRouter>
                <ThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
                    <div className={`App ${isDarkTheme ? 'dark-theme' : 'light-theme'}`}>
                        <MenuComponent
                            isSignedIn={!!token}
                            handleSignOutClicked={() => handleSignOut()}
                            handleThemeToggled={setTheme}
                            profileImage={image? image : ''}
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
                                        <Route path={'/dashboard'} element={<DashboardPage image={image} setImage={setImage}/>} />
                                        <Route path={'/preferences'} element={<PreferencesComponent/>} />
                                        <Route path={'/new-workout'} element={<NewWorkoutPage/>} />
                                        <Route path={'/workout-history'} element={<WorkoutHistoryPage/>} />
                                        <Route path={'/profile'} element={<ProfilePage image={image} setImage={setImage} deleteImage={deleteImage} /> } />
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
