import React from "react";
import { NavLink, useLocation, useHistory } from "react-router-dom";

import logo_svg from "../../assets/img/bluelogo.svg";
import { LogoSymbol } from "../../assets/svg";

const Sidebar = () => {
  const location = useLocation();
  console.log("-----location", location);
  const history = useHistory();
  return (
    <div className="cm_sidebar">
      <h3>
        <img src={logo_svg} alt="Sagoon" className="full fw" />
        <LogoSymbol className="half" />
      </h3>

      <ul>
        <li>
          <NavLink to="/" exact>
            <i className="fa fa-home" />{" "}
            <span className="menu_text">Dashboard</span>
          </NavLink>
        </li>

        <li>
          <NavLink to="/topic-management">
            <i className="fas fa-sitemap"></i>{" "}
            <span className="menu_text">Topic management</span>
          </NavLink>
        </li>
        <li>
					<NavLink to="/family-relationship"  >
						<i className="fas fa-sitemap"></i>{" "}
						<span className="menu_text">Relationship management</span>
					</NavLink>
				</li>
        <li>
          <div className="">
            <NavLink
              exact
              to="/occasion-management/occasion"
              className={
                location.pathname.includes("/occasion-management")
                  ? "active"
                  : ""
              }
            >
              <i className="fas fa-sitemap"></i>{" "}
              <span className="menu_text">Occasion management</span>
            </NavLink>
            <div
              className="submenu"
              style={{
                display: location.pathname.includes("/occasion-management")
                  ? "block"
                  : "none",
              }}
            >
              <NavLink to="/occasion-management/occasion">Occasions</NavLink>
              <NavLink to="/occasion-management/templates">Templates</NavLink>
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
