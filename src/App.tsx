import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.css";
import "./styles/all.scss";
import { getRootPath } from "./util";
import LoadingMask from "./components/LoadingMask";

const Homepage = lazy(() => import("./components/Homepage"));
const ImageDetail = lazy(() => import("./components/ImageDetail"));

function App() {
  return (
    <BrowserRouter basename={getRootPath(process.env.NODE_ENV)}>
      <Switch>
        <Route path="/" exact>
          <Suspense fallback={<LoadingMask />}>
            <Homepage />
          </Suspense>
        </Route>

        <Route path="/photo/:id">
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
