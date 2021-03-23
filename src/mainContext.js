import React, { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";

const MainContext = React.createContext();

const MainProvider = ({ children }) => {
  const [user, setUser] = useState("");
  const [room, setRoom] = useState("");

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setUser(jwt_decode(localStorage.getItem("token")));
    }
  }, [setUser]);

  return (
    <MainContext.Provider value={{ user, room, setUser, setRoom }}>
      {children}
    </MainContext.Provider>
  );
};

export { MainContext, MainProvider };
