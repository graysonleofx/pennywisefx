// DashboardLayout.js  
import React from 'react';  
import { Outlet } from 'react-router-dom';  
import DashBars from "./dash-bar";

const DashboardLayout = ({ username, email }) => {  
  return (  
    <div className="dashboard-layout">  
      <DashBars username={username} email={email}/>  
      <div className="content">  
      <Outlet />  
      </div>  
    </div>  
  );  
};  

export default DashboardLayout;