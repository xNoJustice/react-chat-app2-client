import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import makeToast from "../Toaster";
import Sidebar from "./Sidebar";
import Settings from "./Settings";

const Dashboard = (props) => {
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      makeToast("error", "Please Login!");
      props.history.push("/");
    }
  });

  return (
    <div className="flex flex-row max-h-screen min-w-full min-h-screen antialiased text-gray-800 dark:text-gray-50">
      <Sidebar />
      <Settings />
    </div>
  );
};

export default withRouter(Dashboard);
