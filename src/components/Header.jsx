import React from "react";
import { Link } from "react-router-dom"; 
function Header(){
    return(
        <>
            <h1 className="text-2xl font-bold pb-2">Find out what element you are</h1>
            <p className="">(With random art works for you)</p>
            <div className="my-2">
                <Link className="mr-2 p-1 rounded hover:bg-gray-300 box-border font-semibold focus:ring-1 focus:ring-black" to="/">Home</Link>
                <Link className="mr-2 p-1 rounded hover:bg-gray-300 box-border font-semibold focus:ring-1 focus:ring-black" to="/Quiz">Quiz</Link>
            </div>
        </>
    );
}
export default Header;