import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Homepage from "./components/Homepage";
import ImageDetail from "./components/ImageDetail";
import "@fortawesome/fontawesome-free/css/all.css";
import "./styles/all.scss";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact>
          <Homepage />
        </Route>
        <Route path="/photo/:id" exact>
          <ImageDetail />
        </Route>
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
