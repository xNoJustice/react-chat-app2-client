import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";
import { MainProvider } from "./mainContext";
import { UsersProvider } from "./usersContext";
import { SocketProvider } from "./socketContext";
import Homepage from "./components/Homepage";
import Register from "./components/Register";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Chat from "./components/Chat";

const App = () => (
  <MainProvider>
    <UsersProvider>
      <SocketProvider>
        <Router>
          <Switch>
            <Route exact path="/" component={Homepage} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/chat/:id" component={Chat} />
          </Switch>
        </Router>
      </SocketProvider>
    </UsersProvider>
  </MainProvider>
);
export default App;
