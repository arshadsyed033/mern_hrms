import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import './navbar.css';
import logo from '../assets/logo.png';
function Navbar () {
  const navigate = useNavigate()
  const userData = localStorage.getItem('loginData')
  const loginData = JSON.parse(userData)
  console.log(loginData);
  const handleLogout = () => {
    console.log('logged out')
    localStorage.removeItem('loginData')
    navigate('/')
  }

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='navbar'>
          {loginData?.accessToken ? (
            <>
              {loginData.details.Role == 'Admin' ? (
                <>
                  <div className='navbar-logo' style={{marginLeft:'30px'}}>
                    <Link to='/'>
                      <img
                        src={logo}
                        alt='Logo'
                        className='navbar-logo-img'
                      />
                    </Link>
                  </div>
                  <div>
                  <Button style={{ marginRight: '10px'}} onClick={() => navigate('/welcome')}>Home</Button>
                  <Button style={{ marginRight: '10px'}} onClick={() => navigate('/employeelist')}>Employee List</Button>
                  <Button style={{ marginRight: '10px', width: '100px' }} onClick={() => handleLogout()}>Logout</Button>
                  </div>
                </>
              ) : (
                <>
                  <Button
                    style={{ marginRight: '10px' }}
                    onClick={() => navigate('/welcome')}
                  >
                    Home
                  </Button>
                  <Button
                    className='btn btn-primary'
                    style={{ marginLeft: '10px', marginRight: '10px' }}
                    onClick={() => handleLogout()}
                  >
                    Logout
                  </Button>
                </>
              )}
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  )
}

export default React.memo(Navbar)
