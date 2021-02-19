import "./App.css";
import { DashBoard } from "./DashBoard";
import { Navbar } from "./Navbar";
import { Login } from './Login'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <div className="App">

      <Router>
        <Switch>
          <Route path="/dashboard">
            <DashBoard />
          </Route>
          <Route path="/">
            <Login />
          </Route>
        </Switch>
      </Router>


      {/*  />
      <Login />
      <DashBoard /> */}
    </div>
  );
}

export default App;
