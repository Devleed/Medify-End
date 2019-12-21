import React from "react";
import { Link, NavLink } from "react-router-dom";
import { Dropdown, Button, Icon } from "semantic-ui-react";

import CustomSearch from "./CustomSearch";

const Navbar = props => {
  const activeStyle = {
    textDecoration: "none"
  };
  return (
    <div>
      <section className="nav__section">
        <nav className="main__nav">
          <div className="nav__intro">
            <div className="main__logo">
              <NavLink to="/" className="home_link" activeStyle={activeStyle}>
                MED
                <Icon name="thermometer" color="red" style={{ margin: "0" }} />
                FY
              </NavLink>
            </div>
            <div className="search__contianer">
              <CustomSearch />
            </div>
            <div className="cart__stuff">
              <Link to="/medicine/add">
                <Button>Add</Button>
              </Link>
            </div>
          </div>
          <div className="nav__links">
            <ul className="nav__link--items">
              <NavLink
                to="/medicines/Cardio-Vascular-System?page=1"
                className="item"
                activeStyle={activeStyle}
              >
                Cardio Vascular System
              </NavLink>
              <NavLink
                to="/medicines/Derma?page=1"
                className="item"
                activeStyle={activeStyle}
              >
                Derma
              </NavLink>
              <NavLink
                to="/medicines/Central-Nervous-System?page=1"
                className="item"
                activeStyle={activeStyle}
              >
                Central Nervous System
              </NavLink>
              <NavLink
                to="/medicines/Circulatory-System?page=1"
                className="item"
                activeStyle={activeStyle}
              >
                Circulatory System
              </NavLink>
              <NavLink
                to="/medicines/Endocrine-System?page=1"
                className="item"
                activeStyle={activeStyle}
              >
                Endocrine System
              </NavLink>
              <NavLink
                to="/medicines/Gestro-Intestinal-Tract?page=1"
                className="item"
                activeStyle={activeStyle}
              >
                Gastro Intestinal Tract
              </NavLink>
              <Dropdown text="view more" item direction="left">
                <Dropdown.Menu>
                  <Dropdown.Item>
                    <NavLink
                      to="/medicines/Depression?page=1"
                      className="item"
                      activeStyle={activeStyle}
                    >
                      Depression
                    </NavLink>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <NavLink
                      to="/medicines/Eyes-Nose-Ear?page=1"
                      className="item"
                      activeStyle={activeStyle}
                    >
                      Eyes-Nose-Ear
                    </NavLink>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <NavLink
                      to="/medicines/Fever-and-Pain?page=1"
                      className="item"
                      activeStyle={activeStyle}
                    >
                      Fever and Pain
                    </NavLink>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <NavLink
                      to="/medicines/Infection?page=1"
                      className="item"
                      activeStyle={activeStyle}
                    >
                      Infection
                    </NavLink>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <NavLink
                      to="/medicines/Supplement?page=1"
                      className="item"
                      activeStyle={activeStyle}
                    >
                      Supplement
                    </NavLink>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </ul>
          </div>
        </nav>
      </section>
    </div>
  );
};

export default Navbar;
