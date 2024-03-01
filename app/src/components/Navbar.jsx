import React, { useContext, useEffect } from "react";
import { UserContext } from "../UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Navbar = () => {
  const { userInfo, setUserInfo } = useContext(UserContext);
  const navigate = useNavigate();

  const logout = () => {
    axios
      .post(
        "http://localhost:8000/api/auth/logout",
        {},
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        setUserInfo(null);
        navigate("/");
      })
      .catch((error) => {
        alert("Error Occured");
      });
  };

  return (
    <>
      <div className="NavbarContainer">
        <h1>ToDo App</h1>
        {userInfo && (
          <button onClick={logout} className="LogoutButton">
            Logout
          </button>
        )}
      </div>
    </>
  );
};

export default Navbar;
