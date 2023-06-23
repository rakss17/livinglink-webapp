import Landing from "./pages/Landing/index";
import React, { useEffect } from 'react'
import logo from './components/images/logo.png'


export default function App() {
    useEffect(() => {
        document.title = "Remember Me";
        const favicon = document.getElementById("favicon");
        favicon.href = logo;
      }, []);
    return(
        <>
        <Landing/>
        <link rel="icon" id="favicon" href='./components/images/logo.png' />
        </>
    );
}