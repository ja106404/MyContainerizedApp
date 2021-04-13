import styled, { withClass } from "csg-react-magnetic/styled";
import Magnetic from "@mitchell/scss.magnetic";

export const View = styled.div`
  display: flex;
  flex-direction: column;

  header {
    padding: ${Magnetic.blockBasePadding};
  }

  section {
    flex: 1;
    padding: ${Magnetic.blockBasePadding};
    background-color: ${Magnetic.colorMocha03};
    > div {
      display: flex;
      > * {
        flex: 1;
      }
    }
  }
`;

export const LargeText = styled.div`
  font-weight: semibold;
  font-size: 20px;
`;

export const InfoIcon = withClass("mi-icon-alert-filled-circle", styled.span``);
