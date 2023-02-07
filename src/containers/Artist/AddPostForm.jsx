import { useEffect, useState } from "react";
import { FormControlLabel, FormGroup, Grid, Switch } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { TextInputField } from "src/components";
import styled from "styled-components";
import { NgSubmitButton } from "../components";
import { palette } from "src/colors";

const FormSection = styled.div``;

const SubmitButton = styled((props) => <NgSubmitButton {...props} />)`
  background: ${palette.orange};
  border-radius: 8px;
  min-width: 140px !important;
  font-weight: 500;
  font-size: 14px;
  color: #fff;
  text-transform: inherit;
  box-shadow: none !important;
  height: 48px;
  &.disableButton {
    background: #fef3ee;
    color: #f9b499;
  }
  :hover {
    background: ${palette.orange} !important;
    color: #fff;
  }
`;

export default function AddPostForm({ onSubmit, paramsRef }) {
  const {
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting, isValid },
  } = useFormContext();

  const [checkStatus, setStatus] = useState(false);

  useEffect(() => {
    if (
      !paramsRef?.current &&
      !paramsRef?.current?.row &&
      !paramsRef?.current?.row?.artist
    ) {
      return;
    }

    setValue("artist", paramsRef?.current?.row?.artist);

    setValue("rate", paramsRef?.current?.row?.rate);
    setValue("streams", paramsRef?.current?.row?.streams);
    setValue("roomSize", paramsRef?.current?.row?.roomSize);
    setValue("status", !!paramsRef?.current?.row?.status);
    setStatus(!!paramsRef?.current?.row?.status || false);
  }, [paramsRef, setValue]);

  const handleStatusChange = (event) => {
    setValue("status", event.target.checked);
    setStatus(event.target.checked);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormSection>
        <Grid container spacing={4} style={{ marginTop: "0px" }}>
          <Grid item xs={12} md={12}>
            <TextInputField
              name="artist"
              label="Artist name"
              size="large"
              rules={{ required: { value: true } }}
              error={!!errors.artist}
              disabled={
                paramsRef?.current &&
                paramsRef?.current?.row &&
                paramsRef?.current?.row?.artist
              }
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <TextInputField
              rules={{ required: { value: true } }}
              label="Rate"
              name="rate"
              error={!!errors.rate}
              size="large"
              type="number"
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <TextInputField
              rules={{ required: { value: true } }}
              label="Streams"
              name="streams"
              error={!!errors.streams}
              size="large"
              type="number"
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch
                    checked={checkStatus}
                    onChange={handleStatusChange}
                    name="status"
                  />
                }
                label="Status (Complete or Incomplete)"
              />
            </FormGroup>
          </Grid>
        </Grid>
      </FormSection>
      <FormSection style={{ marginTop: "30px" }}>
        <Grid container spacing={4} style={{ marginTop: "0px" }}>
          <Grid item xs={12} textAlign="center">
            <SubmitButton
              className={isValid ? "" : "disableButton"}
              fullWidth={false}
              type="submit"
              disabled={isSubmitting}
              style={{ minWidth: "240px", marginBottom: "20px" }}
            >
              {!paramsRef?.current &&
              !paramsRef?.current?.row &&
              !paramsRef?.current?.row?.id
                ? "Submit"
                : "Update"}
            </SubmitButton>
          </Grid>
        </Grid>
      </FormSection>
    </form>
  );
}
