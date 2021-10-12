import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import LoadingMask from "./components/LoadingMask";
import "@fortawesome/fontawesome-free/css/all.css";
import "./styles/all.scss";

const Homepage = lazy(() => import("./components/Homepage"));
const ImageDetail = lazy(() => import("./components/ImageDetail"));

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact>
          <Suspense fallback={<LoadingMask />}>
            <Homepage />
          </Suspense>
        </Route>

        <Route path="/photo/:id" exact>
          <Suspense fallback={<LoadingMask />}>
            <ImageDetail />
          </Suspense>
        </Route>

        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
