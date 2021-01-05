import logo from "./logo.svg";
import "./App.css";
import { DashBoard } from "./DashBoard";
import { Navbar } from "./Navbar";

function App() {
  return (
    <div className="App">
      <Navbar title={"E Commerce Application"} />
      <DashBoard />
    </div>
  );
}

export default App;
