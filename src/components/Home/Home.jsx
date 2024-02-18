import React from "react";
import "./home.css";
import Dashboard from "../Dashboard/Dashboard";

const Home = () => {
  return (
    <div>
      <div className="home">
        <div className="header">
          <h1>Bienvenue sur notre plateforme de gestion</h1>
        </div>
        <div className="main">
          <Dashboard/>
        </div>
      </div>
    </div>
  );
};

export default Home;