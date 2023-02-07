import { DialogActions } from "@mui/material";
import styled from "styled-components";
import { NGDialogCancelButton, NGDialogConfirmButton } from "./NGDialogButtons";

const Container = styled(DialogActions)`
  padding: 30px 0 0 0 !important;
  justify-content: end !important;
`;

export default function NGDialogConfirmActions({
  loading = false,
  onCancel,
  onConfirm,
  cancelText = "Cancel",
  confirmText = "Save",
  confirmButtonProps = {},
  disableCancelButton = false,
}) {
  return (
    <Container>
      {!disableCancelButton && (
        <NGDialogCancelButton disabled={loading} onClick={onCancel}>
          {cancelText}
        </NGDialogCancelButton>
      )}
      <NGDialogConfirmButton
        disabled={loading}
        loading={loading}
        onClick={onConfirm}
        {...confirmButtonProps}
      >
        {confirmText}
      </NGDialogConfirmButton>
    </Container>
  );
}
