import { BrowserRouter, Route } from "react-router-dom";
import Homepage from "./components/Homepage";
import "@fortawesome/fontawesome-free/css/all.css";
import "./styles/all.scss";

function App() {
  return (
    <BrowserRouter>
      <Route path="/" exact>
        <Homepage />
      </Route>
    </BrowserRouter>
  );
}

export default App;
