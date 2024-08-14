import React, { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function Welcome() {
  const location = useLocation();
  const [role, setRole] = ("Admin", "Employee")
  const userData = localStorage.getItem("loginData");
  const loginData = JSON.parse(userData);


  return (
    <div>
        <div style={{ textAlign: "center", marginTop: "100px"}}>
            <h1>Welcome to {loginData?.details?.Role} Panel</h1>
            <h3>You are logged in as {loginData?.details?.Role}</h3>

        </div>
    </div>
  )
}

export default React.memo(Welcome);
