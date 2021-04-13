import React from "react";
import { Breadcrumb, IBreadcrumbItem } from "csg-react-magnetic/breadcrumb";
import { Card } from "csg-react-magnetic/card";
import { View, LargeText, InfoIcon } from "./SomeOverview.style";
import { routeTo, useHistory } from "Routes";

export interface ISomeOverviewProps {
  id: string;
}

const items: IBreadcrumbItem[] = [
  { key: "main", label: "Main" },
  { key: "other", label: "Other" }
];

export const SomeOverview = ({ id }: ISomeOverviewProps) => {
  const history = useHistory();

  const handleBreadcrumbSelect = (key: string) => {
    if (key === "main") routeTo("/", history);
  };

  return (
    <View id={id}>
      <header>
        <Breadcrumb items={items} onSelect={handleBreadcrumbSelect}></Breadcrumb>
      </header>
      <section>
        <div>
          <Card header="Findings">
            <InfoIcon>&nbsp;</InfoIcon>
            Gap in treatment of 60 days.
          </Card>

          <Card header="Treatment">
            <label>Duration</label>
            <LargeText>12 Weeks</LargeText>
          </Card>

          <Card header="Bills">
            <label>Not Posted</label>
            <div>3</div>
          </Card>
        </div>
      </section>
    </View>
  );
};
