import React from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { MainPage } from "./_pages/main-page";
import { OtherPage } from "./_pages/other-page";

export { Link, useHistory } from "react-router-dom";
export const routeTo = (url: string, history: any) => {
  history.push(url);
};

interface ICardProps {
  baseHref: string;
}

export default ({ baseHref }: ICardProps) => (
  <Router basename={baseHref}>
    <Switch>
      <Route exact path="/">
        <MainPage />
      </Route>
      <Route path="/other">
        <OtherPage />
      </Route>
      <Route path="*">
        <Redirect to="/" />
      </Route>
    </Switch>
  </Router>
);
