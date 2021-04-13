import React from "react";
import Routes from "./Routes";
import http from "_services/http";

interface IAppProps {
  jitux: any;
  baseHref: string;
}
export default ({ jitux, baseHref }: IAppProps) => {
  http.baseUrl = jitux.app.apiUrl;
  return <Routes baseHref={baseHref} />;
};
