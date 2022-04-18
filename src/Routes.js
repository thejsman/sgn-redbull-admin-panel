import React from "react";
import { Switch, Route, Redirect, Router, useHistory } from "react-router-dom";
import axios from "axios";
import Header from "./components/templates/Header";
import Sidebar from "./components/templates/Sidebar";
import Login from "./pages/auth/Login";
import Dashboard from "./pages/dashboard/Dashboard";
import TopicManagement from "./pages/templateManagement/TemplateManagement";
import Occasions from "./pages/occasionManagement/occasions/Occasions";
import AddEditTopic from "./pages/templateManagement/AddEditTemplate";
import AddEditOccasion from "./pages/occasionManagement/occasions/AddEditOccasion";
import AddEditFamilyRelationship from './pages/familyRelationship/AddEditFamilyRelationship';
import FamilyRelationManagement from './pages/familyRelationship/FamilyRelationship';
import Rozy from "./pages/rozy/rozy";
import AddRozy from "./pages/rozy/AddRozy";
//import AddEditOccasionCard from './pages/occasionCard/AddEditOccasionCard';


const PrivateRoute = ({ component: Component, loggedIn, ...rest }) => {
  loggedIn = localStorage.getItem("accessToken");
  return (
    <Route
      {...rest}
      render={(props) =>
        loggedIn ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

const PublicRoute = ({ component: Component, loggedIn, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      !loggedIn ? <Component {...props} /> : <Redirect to="/" />
    }
  />
);

if (localStorage.getItem("accessToken")) {
  axios.defaults.headers.common["AccessToken"] =
    localStorage.getItem("accessToken");
}

const Routes = (props) => {
  const history = useHistory();

  return (
    <>
      <div className="site_wrapper">
        {localStorage.getItem("accessToken") ? (
          <>
            <Header />
            <Sidebar />
          </>
        ) : (
          ""
        )}
        <Router history={history}>
          <Switch>
            <PublicRoute exact path="/login" {...props} component={Login} />
            <PrivateRoute exact path="/" {...props} component={Dashboard} />

            {/* Topic Management Routes */}
            <PrivateRoute exact path="/topic-management" {...props} component={TopicManagement} />
            <PrivateRoute exact path="/add-topic" {...props} component={AddEditTopic} />
            <PrivateRoute exact path="/edit-topic/:id" {...props} component={AddEditTopic} />

            {/* Occasion Management Routes */}
            <PrivateRoute exact path="/occasion-management/occasion" {...props} component={Occasions} />
            <PrivateRoute exact path="/occasion/create" {...props} component={AddEditOccasion} />
            <PrivateRoute exact path="/occasion/edit/:id" {...props} component={AddEditOccasion} />

            {/* Family Relation Routes */}
            <PrivateRoute exact path='/family-relationship/edit/:id'  {...props} component={AddEditFamilyRelationship} />
            <PrivateRoute exact path='/family-relationship/create'  {...props} component={AddEditFamilyRelationship} />
            <PrivateRoute exact path='/family-relationship'         {...props} component={FamilyRelationManagement} />


            {/* Rozy Routes */}
            {/* <PrivateRoute exact path='/family-relationship/edit/:id'  {...props} component={AddEditFamilyRelationship} />
            <PrivateRoute exact path='/family-relationship/create'  {...props} component={AddEditFamilyRelationship} /> */}
            <PrivateRoute exact path='/rozy'         {...props} component={Rozy} />
            <PrivateRoute exact path='/rozy/create'  {...props} component={AddRozy} />


            {/* Occasion Card Routes */}
            {/* <PrivateRoute exact path="/occasion-card/" {...props} component={Occasions} />
            <PrivateRoute exact path="/occasion-card/create" {...props} component={AddEditOccasionCard} />
            <PrivateRoute exact path="/occasion-card/edit/:id" {...props} component={AddEditOccasion} /> */}


          </Switch>
        </Router>
      </div>
    </>
  );
};

export default Routes;
