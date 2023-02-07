import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Spinner } from "src/components";
import { useSnackbar } from "notistack";
import AddPostForm from "./AddPostForm";
import { usePostContext } from "./PopupProvider";
import { useRefereshContext } from "./RefereshProvider";

function AddPost({ paramsRef }) {
  const { enqueueSnackbar } = useSnackbar();
  const { hidePost } = usePostContext();
  const { GetListAction } = useRefereshContext();

  const methods = useForm();
  const {
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (payload) => {
    if (
      paramsRef?.current &&
      paramsRef?.current?.row &&
      paramsRef?.current?.row?.artist
    ) {
      fetch("http://localhost:3010/artist/update/" + payload?.artist, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          if (res?.error) {
            enqueueSnackbar(res?.msg || `Error`, {
              variant: "error",
            });
          } else {
            enqueueSnackbar(res?.msg || `Updated successfully`, {
              variant: "success",
            });
            GetListAction();
            hidePost();
          }
        });
    } else {
      fetch("http://localhost:3010/artist/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          if (res?.error) {
            enqueueSnackbar(res?.msg || `Error`, {
              variant: "error",
            });
          } else {
            enqueueSnackbar(`Added successfully`, {
              variant: "success",
            });
            GetListAction();
            hidePost();
          }
        });
    }
  };

  return (
    <>
      {isSubmitting && <Spinner />}
      <div style={{ maxWidth: "1000px", paddingTop: "0px" }}>
        <FormProvider {...methods}>
          <AddPostForm onSubmit={onSubmit} paramsRef={paramsRef} />
        </FormProvider>
      </div>
    </>
  );
}

export default React.memo(AddPost);
