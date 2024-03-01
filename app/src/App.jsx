import { useContext, useEffect } from "react";
import "./App.css";
import Auth from "./components/Auth";
import Main from "./components/Main";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import { UserContext } from "./UserContext";
import axios from "axios";

function App() {
  const { userInfo, setUserInfo } = useContext(UserContext);
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/auth/profile", {
        withCredentials: true,
      })
      .then((response) => {
        setUserInfo(response.data);
      })
      .catch((error) => {
        alert("Error Occured");
      });
  }, [setUserInfo]);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/*" element={userInfo ? <Main /> : <Auth />} />
      </Routes>
    </>
  );
}

export default App;
