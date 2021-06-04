import { Route, Switch } from "react-router-dom";
import Home from "../App";
import Demonstrative from '../pages/Demonstrative/Demonstrative'

function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/demonstrative" exact component={Demonstrative} />
    </Switch>
  );
}

export default Routes;


