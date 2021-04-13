import styled from "csg-react-magnetic/styled";
import Magnetic from "@mitchell/scss.magnetic";

export const HeaderSection = styled.section`
  display: flex;
  align-items: center;
  > * {
    color: ${Magnetic.colorMocha02};
    padding-left: ${Magnetic.spacer20};
  }
`;

export const SidebarSection = styled.section`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-bottom: ${Magnetic.spacer16};
`;

export const ContentSection = styled.section`
  flex: 1;
  background: ${Magnetic.colorMocha02};
  display: flex;
  > * {
    flex: 1;
  }
`;
