import React, { useState } from "react";
import "./App.css";
import Sidebar from "./Components/Sidebar";
import Chat from "./Components/Chat";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import SidebarChat from "./Components/SidebarChat";
import Login from "./Components/Login";
import { useStateValue } from "./StateProvider";
function App() {
  const [{ user }, dispatch] = useStateValue();
  return (
    <div className="app">
      {!user ? (
        <Login />
      ) : (
        <div className="app__body">
          <Router>
            <Sidebar />
            <Switch>
              <Route path="/rooms/:roomId">
                <Chat />
              </Route>
            </Switch>
          </Router>
        </div>
      )}
    </div>
  );
}

export default App;
