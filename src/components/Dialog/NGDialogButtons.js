import { palette } from "src/colors";
import styled from "styled-components";
import { Button } from "../Button";

export const NGDialogCancelButton = styled((props) => (
  <Button variant="text" color="inherit" {...props} />
))`
  font-weight: 500;
  font-size: 14px;
  color: ${palette.orange};
  margin: 0 16px 0 0px;
  text-transform: capitalize;
`;

export const NGDialogConfirmButton = styled((props) => (
  <Button color="inherit" {...props} />
))`
  background: ${palette.orange} !important;
  border-radius: 8px;
  height: 40px;
  font-weight: 500;
  font-size: 14px;
  min-width: 120px;
  color: #fff;
  box-shadow: none;
  text-transform: capitalize;
`;
