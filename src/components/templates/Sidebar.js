import React from "react";
import { NavLink, useLocation } from "react-router-dom";

import logo_svg from "../../assets/img/bluelogo.svg";
import { LogoSymbol } from "../../assets/svg";

const Sidebar = () => {
  const location = useLocation();
  console.log("-----location", location);

  const getPermission = (str) => {
    if (localStorage.getItem("userDetail")) {
      let detail = JSON.parse(localStorage.getItem("userDetail"));
      let index = detail.permissions.findIndex((i) => (i == str));
      let resp = detail.isSuperAdmin ? 1 : index
      return resp;
    } else {
      return (-1);
    }

  }

  //const history = useHistory();
  return (
    <div className="cm_sidebar">
      <h3>
        <img src={logo_svg} alt="Sagoon" className="full fw" />
        <LogoSymbol className="half" />
      </h3>

      <ul>
        {((getPermission('dashboard') !== -1) && (
          <li>
            <NavLink to="/" exact>
              <i className="fa fa-home" />{" "}
              <span className="menu_text">Dashboard</span>
            </NavLink>
          </li>
        ))}
        {((getPermission('connection-stats') !== -1) && (
          <li>

            <NavLink to="/connection-stats" exact>
              <i className="fa fa-handshake"></i>{" "}
              <span className="menu_text">Connection Stats</span>
            </NavLink>
          </li>
        ))}
        {((getPermission('notifications') !== -1) && (
          <li>
            <NavLink to="/notifications">
              <i className="fas fa-sitemap"></i>{" "}
              <span className="menu_text">Notifications</span>
            </NavLink>
          </li>
        ))}
        {((getPermission('relationship-management') !== -1) && (
          <li>
            <NavLink to="/family-relationship"  >
              <i className="fas fa-users"></i>{" "}
              <span className="menu_text">Relationship management</span>
            </NavLink>
          </li>
        ))}
        {((getPermission('sticker-management') !== -1) && (
          <li>
            <NavLink to="/sticker"  >
              <i class="fas fa-yin-yang"></i>{" "}
              <span className="menu_text">Sticker management</span>
            </NavLink>
          </li>
        ))}
        {((getPermission('occasion-management') !== -1) && (
          <li>
            <div className="">
              <NavLink
                exact
                to="/occasion-management/occasion"
                className={
                  (location.pathname.includes("/occasion-management") || location.pathname.includes("/occasion/") || location.pathname.includes("/template/"))
                    ? "active"
                    : ""
                }
              >
                <i className="fas fa-glass-cheers"></i>{" "}

                <span className="menu_text">Occasion management</span>
              </NavLink>
              <div
                className="submenu"
                style={{
                  display: (location.pathname.includes("/occasion-management") || location.pathname.includes("/occasion/") || location.pathname.includes("/template/"))
                    ? "block"
                    : "none",
                }}
              >
                <NavLink to="/occasion-management/occasion"
                  className={
                    (location.pathname.includes("/occasion-management/occasion") || location.pathname.includes("/occasion/"))
                      ? "active"
                      : ""
                  }

                > <i className="fab fa-elementor"></i>{" "}Occasions</NavLink>
                <NavLink to="/occasion-management/templates"
                  className={
                    (location.pathname.includes("/occasion-management/templates") || location.pathname.includes("/template/"))
                      ? "active"
                      : ""
                  }
                ><i className="fas fa-calendar-week"></i>{" "}Templates</NavLink>
              </div>
            </div>
          </li>
        ))}
        {((getPermission('cards-management') !== -1) && (
          <li>
            <div className="">
              <NavLink
                exact
                to="/card/occasions"
                className={
                  (location.pathname.includes("/card/"))
                    ? "active"
                    : ""
                }
              >
                <i className="fa fa-credit-card"></i>{" "}

                <span className="menu_text">Cards management</span>
              </NavLink>
              <div
                className="submenu"
                style={{
                  display: (location.pathname.includes("/card/"))
                    ? "block"
                    : "none",
                }}
              >
                <NavLink to="/card/occasions"
                  className={
                    (location.pathname.includes("/card/occasions"))
                      ? "active"
                      : ""
                  }

                > <i className="fab fa-elementor"></i>{" "}Occasion Cards</NavLink>
                <NavLink to="/card/tasks"
                  className={
                    (location.pathname.includes("/card/tasks"))
                      ? "active"
                      : ""
                  }
                ><i className="fas fa-calendar-week"></i>{" "}Task Card</NavLink>
                <NavLink to="/card/onboarding"
                  className={
                    (location.pathname.includes("/card/onboarding"))
                      ? "active"
                      : ""
                  }
                ><i className="fas fa-calendar-week"></i>{" "}Onboarding Card</NavLink>
              </div>
            </div>
          </li>
        ))}
        {((getPermission('rozy') !== -1) && (
          <li>
            <NavLink to="/rozy"  >
              <i className="fas fa-crown"></i>{" "}
              <span className="menu_text">Rozy</span>
            </NavLink>
          </li>
        ))}
        {((getPermission('voucher') !== -1) && (
          <li>
            <NavLink to="/voucher"  >
              <i className="fas fa-gift"></i>{" "}
              <span className="menu_text">Voucher</span>
            </NavLink>
          </li>
        ))}
        {((getPermission('redis') !== -1) && (
          <li>
            <NavLink to="/redis"  >
              <i className="fas fa-align-justify"></i>{" "}
              <span className="menu_text">Redis</span>
            </NavLink>
          </li>
        ))}
        {((getPermission('invitation-form') !== -1) && (
          <li>
            <NavLink to="/invitation"  >
              <i className="fas fa-file-alt"></i>{" "}
              <span className="menu_text">Invitation Form</span>
            </NavLink>
          </li>
        ))}
        {((getPermission('orders') !== -1) && (
          <li>
            <NavLink to="/orders"  >
              <i className="fas fa-shopping-bag"></i>{" "}
              <span className="menu_text">Orders</span>
            </NavLink>
          </li>
        ))}

        {((getPermission('waitlisted') !== -1) && (
          <li>
            <div className="">
              <NavLink
                exact
                to="/waitlisted/users"
                className={
                  (location.pathname.includes("/waitlisted"))
                    ? "active"
                    : ""
                }
              >
                <i className="fas fa-user-friends"></i>{" "}

                <span className="menu_text">Waitlisted Users</span>
              </NavLink>
              <div
                className="submenu"
                style={{
                  display: (location.pathname.includes("/waitlisted"))
                    ? "block"
                    : "none",
                }}
              >
                <NavLink to="/waitlisted/users"
                  className={
                    (location.pathname.includes("/waitlisted/users"))
                      ? "active"
                      : ""
                  }

                > <i className="fab fa-elementor"></i>{" "}List</NavLink>
                <NavLink to="/waitlisted/export"
                  className={
                    (location.pathname.includes("/waitlisted/export"))
                      ? "active"
                      : ""
                  }
                ><i className="fas fa-calendar-week"></i>{" "}Export</NavLink>

              </div>
            </div>
          </li>
        ))}


        {((getPermission('users') !== -1) && (
          <li>
            <NavLink to="/users"  >
              <i className="fas fa-user"></i>{" "}
              <span className="menu_text">Users</span>
            </NavLink>
          </li>
        ))}

        {((getPermission('app-users') !== -1) && (
          <li>
            <NavLink to="/app-users"  >
              <i className="fas fa-users"></i>{" "}
              <span className="menu_text">App Users</span>
            </NavLink>
          </li>
        ))}


        {((getPermission('reports') !== -1) && (
          <li>
            <div className="">
              <NavLink
                exact
                to="/report/export"
                className={
                  (location.pathname.includes("/report/"))
                    ? "active"
                    : ""
                }
              >
                <i className="fa fa-credit-card"></i>{" "}

                <span className="menu_text">Reports</span>
              </NavLink>
              <div
                className="submenu"
                style={{
                  display: (location.pathname.includes("/report/"))
                    ? "block"
                    : "none",
                }}
              >
                <NavLink to="/report/export"
                  className={
                    (location.pathname.includes("/report/export"))
                      ? "active"
                      : ""
                  }

                > <i className="fab fa-elementor"></i>{" "}Export</NavLink>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
