import React from "react";
import {HashRouter as Router,Route,Switch,Redirect} from "react-router-dom";
import dormitory from "./category/dormitory";
import etc from "./category/etc";
import facility from "./category/facility";
import human from "./category/human";
import student from "./category/student";
import welfare from "./category/welfare";
import Home from "./Home";
import im from "./submit/im";
const AppRouter=()=>{
  return(
    <>
        <Router>
            <Switch>
                <Route exact path="/dormitory" component={dormitory} />
                <Route exact path="/facility" component={facility} />
                <Route exact path="/human" component={human} />
                <Route exact path="/student" component={student} />
                <Route exact path="/welfare" component={welfare} />
                <Route exact path="/etc" component={etc} />
                <Route exact path="/im" component={im} />
                <Route exact path="/" component={Home} />
            </Switch>
        </Router>
    </>
  );

};
export default AppRouter;