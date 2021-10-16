import { Switch, Route, Redirect } from "react-router-dom";
import { PATHS_CORE } from "common/constants/paths";

const Router = () => {
  return (
    <Switch>
      <Route path={PATHS_CORE.HOME} exact>
        <Redirect to={PATHS_CORE.LOGIN} />
      </Route>
      <Route path={PATHS_CORE.LOGIN} exact>
        <div>login</div>
      </Route>
      <Route path={PATHS_CORE.LOGOUT} exact>
        <div>logout</div>
      </Route>
      <Route>
        <div>not found</div>
      </Route>
    </Switch>
  );
};

export default Router;
