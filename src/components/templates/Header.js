import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';


const toggleSidebar = () => document.body.classList.toggle('hide_sidebar')


const Header = () => {

    const handleLogout = () => {
        localStorage.clear();
        window.location.href = "/login";
    }

    return (
        <header className="d-flex justify-content-between align-content-center header">
            <div className="mobile_trigger" onClick={toggleSidebar}><i className="fa fa-bars" /></div>
            <div className="d-flex justify-content-between align-content-center">
                <div className="notification_bell"><i className="fa fa-bell" /></div>
                <Dropdown alignRight>
                    <Dropdown.Toggle className="no_btn font-weight-bold"><img src="https://i.stack.imgur.com/l60Hf.png" alt="Avatar" className="user-avatar" />&nbsp; Hi, Admin</Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item><Link to="/settings">Settings</Link></Dropdown.Item>
                        <Dropdown.Item onClick={() => handleLogout()}>Logout</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        </header>
    )
}

export default Header;