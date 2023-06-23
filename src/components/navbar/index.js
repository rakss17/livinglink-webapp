import React from "react";
import './styles.css'
import { Link } from 'react-router-dom';


export default function Navbar(props){
    return(
        <>
            <div className="banner">
                <div className={props.classnamelogo}>
                    <Link to='/'>
                        <img src={props.imageSrc} alt={props.imageAlt} className={props.classnameimage}/>
                        <span className={props.classnamep}>{props.text}</span>
                    </Link>
                        
                </div>
                <div className="navbar">
                    <Link to='/Selection'>
                        <button className={props.classnamesignup}>Sign Up</button>
                    </Link>
                    <Link to='/Signin'>
                        <button className={props.classnamesignin}>Sign In</button>
                    </Link>
                    
                </div>
           </div>
           
        </>
        
        
    )
}