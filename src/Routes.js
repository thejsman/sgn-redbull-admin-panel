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
import Templates from "./pages/occasionManagement/templates/Templates";
import AddEditTemplate from "./pages/occasionManagement/templates/AddEditTemplate";
import AddEditOccasionCard from "./pages/cards/occasionCards/AddEditOccasionCard";
import Voucher from "./pages/voucher/Voucher";
import Coupons from "./pages/voucher/coupons";
import AddVoucher from "./pages/voucher/AddVoucher";
import EditCoupon from "./pages/voucher/editCoupon";
import OccasionCard from "./pages/cards/occasionCards/OccasionCard";
import AddEditTaskCard from "./pages/cards/taskCards/AddEdiTaskCard";
import TaskCard from "./pages/cards/taskCards/TaskCard";
import Redis from "./pages/redis/redis";
import InvitationForm from "./pages/invitation/InvitationForm";
import Orders from "./pages/orders/Orders";


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

// if (localStorage.getItem("accessToken")) {
//   axios.defaults.headers.common["AccessToken"] =
//     localStorage.getItem("accessToken");
// }

const Routes = (props) => {
  const history = useHistory();

  return (
    <>
      <div className="site_wrapper">
        {localStorage.getItem("accessToken") && history.location.pathname.indexOf("login") == -1 ? (
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

            {/* Notifications Routes */}
            <PrivateRoute exact path="/notifications" {...props} component={TopicManagement} />
            <PrivateRoute exact path="/add-notification" {...props} component={AddEditTopic} />
            <PrivateRoute exact path="/edit-notification/:id" {...props} component={AddEditTopic} />

            {/* Occasion Management Routes */}
            <PrivateRoute exact path="/occasion-management/occasion" {...props} component={Occasions} />
            <PrivateRoute exact path="/occasion/create" {...props} component={AddEditOccasion} />
            <PrivateRoute exact path="/occasion/edit/:id" {...props} component={AddEditOccasion} />


            {/* Template Management Routes */}
            <PrivateRoute exact path="/occasion-management/templates" {...props} component={Templates} />
            <PrivateRoute exact path="/template/create" {...props} component={AddEditTemplate} />
            <PrivateRoute exact path="/template/edit/:oname/:tname" {...props} component={AddEditTemplate} />


            {/* Family Relation Routes */}
            <PrivateRoute exact path='/family-relationship/edit/:id'  {...props} component={AddEditFamilyRelationship} />
            <PrivateRoute exact path='/family-relationship/create'  {...props} component={AddEditFamilyRelationship} />
            <PrivateRoute exact path='/family-relationship'         {...props} component={FamilyRelationManagement} />


            {/* Rozy Routes */}
            <PrivateRoute exact path='/rozy'            {...props} component={Rozy} />
            <PrivateRoute exact path='/rozy/create'     {...props} component={AddRozy} />
            <PrivateRoute exact path='/rozy/edit/:id'   {...props} component={AddRozy} />


            {/* Occasion Card Routes */}
            <PrivateRoute exact path="/card/occasions/create" {...props} component={AddEditOccasionCard} />
            <PrivateRoute exact path="/card/occasions" {...props} component={OccasionCard} />
            <PrivateRoute exact path="/card/occasions/edit/:id" {...props} component={AddEditOccasionCard} />

            {/* Task Card Routes */}
            <PrivateRoute exact path="/card/tasks/create" {...props} component={AddEditTaskCard} />
            <PrivateRoute exact path="/card/tasks" {...props} component={TaskCard} />
            <PrivateRoute exact path="/card/tasks/edit/:id" {...props} component={AddEditTaskCard} />


            {/* Voucher Routes */}
            <PrivateRoute exact path="/voucher" {...props} component={Voucher} />
            <PrivateRoute exact path="/coupons/:id" {...props} component={Coupons} />
            <PrivateRoute exact path="/voucher/create" {...props} component={AddVoucher} />
            <PrivateRoute exact path="/coupon/edit/:id" {...props} component={EditCoupon} />

            {/* Redis Routes */}
            <PrivateRoute exact path="/redis" {...props} component={Redis} />


            {/* Invitation  Routes */}
            <PrivateRoute exact path="/invitation" {...props} component={InvitationForm} />

            {/* Orders  Routes */}
            <PrivateRoute exact path="/orders" {...props} component={Orders} />

          </Switch>
        </Router>
      </div>
    </>
  );
};

export default Routes;
