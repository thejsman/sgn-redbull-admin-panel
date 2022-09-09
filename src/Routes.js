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
import AddEditUsers from "./pages/users/AddEditUsers";
import Users from "./pages/users/Users";
import { checkPermission } from './utils'
import UnAuthorized from './pages/unAuthorized/Unauthorized'
import WaitlistedUsers from "./pages/waitlistedUsers/WaitlistedUsers";
import AddEditOnBoardingCards from "./pages/cards/onBoardingCards/AddEditOnBoardingCards";
import OnBoardingCards from "./pages/cards/onBoardingCards/OnBoardingCards";
import WaitlistedExport from "./pages/waitlistedUsers/WaitlistedExport";
import ConnectionStats from "./pages/connectionStats/ConnectionStats";
import AppUsers from "./pages/app-users/AppUsers";


const PrivateRoute = ({ component: Component, module, loggedIn, userDetail, ...rest }) => {
  loggedIn = localStorage.getItem("accessToken");
  userDetail = localStorage.getItem("userDetail");
  return (
    <Route
      {...rest}
      render={(props) =>
        (loggedIn && userDetail) ?
          (checkPermission(module) !== -1 ? <Component {...props} /> : <Redirect to="/unauthorized" />) : <Redirect to="/login" />
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
        {(localStorage.getItem("accessToken") && localStorage.getItem("userDetail") && history.location.pathname.indexOf("login") == "-1") ? (
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
            <PrivateRoute exact module="dashboard" path="/" {...props} component={Dashboard} />

            <PublicRoute exact path="/unauthorized" {...props} component={UnAuthorized} />

            {/* Notifications Routes */}
            <PrivateRoute exact module="notifications" path="/notifications" {...props} component={TopicManagement} />
            <PrivateRoute exact module="notifications" path="/add-notification" {...props} component={AddEditTopic} />
            <PrivateRoute exact module="notifications" path="/edit-notification/:id" {...props} component={AddEditTopic} />

            {/* Occasion Management Routes */}
            <PrivateRoute exact module="occasion-management" path="/occasion-management/occasion" {...props} component={Occasions} />
            <PrivateRoute exact module="occasion-management" path="/occasion/create" {...props} component={AddEditOccasion} />
            <PrivateRoute exact module="occasion-management" path="/occasion/edit/:id" {...props} component={AddEditOccasion} />


            {/* Template Management Routes */}
            <PrivateRoute exact module="occasion-management" path="/occasion-management/templates" {...props} component={Templates} />
            <PrivateRoute exact module="occasion-management" path="/template/create" {...props} component={AddEditTemplate} />
            <PrivateRoute exact module="occasion-management" path="/template/edit/:oname/:tname" {...props} component={AddEditTemplate} />


            {/* Family Relation Routes */}
            <PrivateRoute exact module="relationship-management" path='/family-relationship/edit/:id'  {...props} component={AddEditFamilyRelationship} />
            <PrivateRoute exact module="relationship-management" path='/family-relationship/create'  {...props} component={AddEditFamilyRelationship} />
            <PrivateRoute exact module="relationship-management" path='/family-relationship'         {...props} component={FamilyRelationManagement} />


            {/* Rozy Routes */}
            <PrivateRoute exact module="rozy" path='/rozy'            {...props} component={Rozy} />
            <PrivateRoute exact module="rozy" path='/rozy/create'     {...props} component={AddRozy} />
            <PrivateRoute exact module="rozy" path='/rozy/edit/:id'   {...props} component={AddRozy} />


            {/* Occasion Card Routes */}
            <PrivateRoute exact module="cards-management" path="/card/occasions/create" {...props} component={AddEditOccasionCard} />
            <PrivateRoute exact module="cards-management" path="/card/occasions" {...props} component={OccasionCard} />
            <PrivateRoute exact module="cards-management" path="/card/occasions/edit/:id" {...props} component={AddEditOccasionCard} />

            {/* Task Card Routes */}
            <PrivateRoute exact module="cards-management" path="/card/tasks/create" {...props} component={AddEditTaskCard} />
            <PrivateRoute exact module="cards-management" path="/card/tasks" {...props} component={TaskCard} />
            <PrivateRoute exact module="cards-management" path="/card/tasks/edit/:id" {...props} component={AddEditTaskCard} />


            {/* Onboarding Card Routes */}
            <PrivateRoute exact module="cards-management" path="/card/onboarding/create" {...props} component={AddEditOnBoardingCards} />
            <PrivateRoute exact module="cards-management" path="/card/onboarding" {...props} component={OnBoardingCards} />
            <PrivateRoute exact module="cards-management" path="/card/onboarding/edit/:id" {...props} component={AddEditOnBoardingCards} />


            {/* Voucher Routes */}
            <PrivateRoute exact module="voucher" path="/voucher" {...props} component={Voucher} />
            <PrivateRoute exact module="voucher" path="/coupons/:id" {...props} component={Coupons} />
            <PrivateRoute exact module="voucher" path="/voucher/create" {...props} component={AddVoucher} />
            <PrivateRoute exact module="voucher" path="/coupon/edit/:id" {...props} component={EditCoupon} />

            {/* Redis Routes */}
            <PrivateRoute exact module="redis" path="/redis" {...props} component={Redis} />


            {/* Invitation  Routes */}
            <PrivateRoute exact module="invitation-form" path="/invitation" {...props} component={InvitationForm} />

            {/* Orders  Routes */}
            <PrivateRoute exact module="orders" path="/orders" {...props} component={Orders} />

            {/* User  Routes */}
            <PrivateRoute exact module="users" path="/user/create" {...props} component={AddEditUsers} />
            <PrivateRoute exact module="users" path="/users" {...props} component={Users} />
            <PrivateRoute exact module="users" path="/user/edit/:id" {...props} component={AddEditUsers} />

            {/* Waitlisted Users  Routes */}
            <PrivateRoute exact module="waitlisted" path="/waitlisted/users" {...props} component={WaitlistedUsers} />
            <PrivateRoute exact module="waitlisted" path="/waitlisted/export" {...props} component={WaitlistedExport} />

            {/* Connection Stats  Routes */}
            <PrivateRoute exact module="connection-stats" path="/connection-stats" {...props} component={ConnectionStats} />

            {/* Connection Stats  Routes */}
            <PrivateRoute exact module="users" path="/app-users" {...props} component={AppUsers} />

          </Switch>
        </Router>
      </div>
    </>
  );
};

export default Routes;
