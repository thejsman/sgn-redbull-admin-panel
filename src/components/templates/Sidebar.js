import React from "react";
import { NavLink } from "react-router-dom";
import logo_png from "../../assets/img/bluelogo.png";
import { LogoSymbol } from "../../assets/svg";

const Sidebar = () => {



	return (
		<div className="cm_sidebar">
			<h3>
				<img src={logo_png} alt="Sagoon" className="full fw" />
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
			</ul>
		</div>
	);
};

export default Sidebar;
