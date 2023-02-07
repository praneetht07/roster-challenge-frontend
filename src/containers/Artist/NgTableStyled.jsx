import { Typography } from "@mui/material";
import styled from "styled-components";
import { Button } from "src/components";
import { palette } from "src/colors";

export const Title = styled((props) => <Typography variant="h4" {...props} />)`
  font-weight: 400;
  font-size: 21px;
  color: #101828;
  margin-bottom: 6px;
`;

export const SearchContainer = styled.div`
  margin-bottom: 20px;
  margin-top: 36px;
  .MuiTextField-root {
    max-width: 450px;
    width: 100%;
  }
`;

export const CustomTableTitle = styled((props) => (
  <Typography variant="body2" {...props} />
))`
  font-weight: 500;
  font-size: 12px;
  color: #9a9ea3;
  svg {
    font-size: 17px;
    color: #9a9ea3;
    margin-left: 5px;
    position: relative;
    top: 5px;
  }
`;

export const CompleteButton = styled((props) => <Button {...props} />)`
  background: #ffffff !important;
  border: 1px solid ${palette.orange};
  border-radius: 4px;
  box-shadow: none !important;
  padding: 0px 7px;
  min-width: 80px;
  text-transform: capitalize;
  font-weight: 400;
  font-size: 12px;
  color: ${palette.orange};
`;

export const IncompleteButton = styled((props) => (
  <CompleteButton {...props} />
))`
  background: ${palette.orange} !important;
  color: #ffffff;
`;
