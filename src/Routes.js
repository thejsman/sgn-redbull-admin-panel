import React from 'react';
import { Switch, Route, Redirect, Router, useHistory } from 'react-router-dom';
import axios from "axios";
import Header from './components/templates/Header';
import Sidebar from './components/templates/Sidebar';
import Login from './pages/auth/Login';
import Dashboard from './pages/dashboard/Dashboard';
import TopicManagement from './pages/templateManagement/TemplateManagement';
import AddEditTopic from './pages/templateManagement/AddEditTemplate';




const PrivateRoute = ({ component: Component, loggedIn, ...rest }) => {
  loggedIn = localStorage.getItem("accessToken")
  return <Route {...rest} render={(props) => loggedIn ? <Component {...props} /> : <Redirect to='/login' />} />
}

const PublicRoute = ({ component: Component, loggedIn, ...rest }) => <Route {...rest} render={(props) => !loggedIn ? <Component {...props} /> : <Redirect to='/' />} />

if (localStorage.getItem('accessToken')) {
  axios.defaults.headers.common["AccessToken"] = localStorage.getItem("accessToken")
}


const Routes = props => {
  const history = useHistory();

  return (
    <>
      <div className="site_wrapper" >
        {localStorage.getItem("accessToken") ? <><Header /><Sidebar /></> : ''}
        <Router history={history} >
          <Switch>
            <PublicRoute exact path='/login'                      {...props} component={Login} />
            <PrivateRoute exact path='/'                          {...props} component={Dashboard} />
            <PrivateRoute exact path='/topic-management'          {...props} component={TopicManagement} />
            <PrivateRoute exact path='/add-topic'                 {...props} component={AddEditTopic} />
            <PrivateRoute exact path='/edit-topic/:id'            {...props} component={AddEditTopic} />
           
          </Switch>
        </Router >
      </div >
    </>
  )
};


export default Routes;