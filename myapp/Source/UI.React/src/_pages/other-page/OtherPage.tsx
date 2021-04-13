import React from "react";
import { useParams } from "react-router-dom";
import { Page, NavButton, NavLogo } from "csg-react-magnetic/page";
import { NavMenu, INavMenuItemType, INavTreeItemType } from "csg-react-magnetic/nav-menu";
import { HeaderSection, SidebarSection, ContentSection } from "./OtherPage.style";
import { SomeOverview } from "starter-domain/some-overview";

const navTreeItems: INavTreeItemType[] = [
  {
    key: "main",
    icon: "mi-icon-jobs",
    title: "Main",
    route: "/"
  },
  {
    key: "other",
    icon: "mi-icon-jobs",
    title: "Other",
    route: "/other"
  }
];

const navMenuItem: INavMenuItemType = {
  items: navTreeItems
};

export const OtherPage = () => {
  const { id } = useParams<{ id: string }>();
  return (
    <Page>
      <HeaderSection page-header="true">
        <h5>Other Page</h5>
      </HeaderSection>
      <SidebarSection page-sidebar="true">
        <div>
          <NavLogo>Product</NavLogo>
          <NavMenu item={navMenuItem} selectedKey="other" />
        </div>
        <div>
          <NavButton icon="mi-icon-help-filled-circle" href="/help">
            Help
          </NavButton>
          <NavButton icon="mi-icon-sign-out-left">Sign Out</NavButton>
        </div>
      </SidebarSection>
      <ContentSection page-content="true">
        <SomeOverview id={id} />
      </ContentSection>
    </Page>
  );
};
