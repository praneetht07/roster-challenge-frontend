import { GridToolbarQuickFilter } from "@mui/x-data-grid";
import React, { useEffect, useRef, useMemo } from "react";
import { cloneDeep } from "lodash";
import NGDataGrid from "src/components/NGDataGrid/NGDataGrid";
import {
  SearchContainer,
  Title,
  CompleteButton,
  IncompleteButton,
} from "./NgTableStyled";
import { usePostContext } from "./PopupProvider";
import {
  NGContainer,
  NGDialogConfirm,
  NGSection,
  OutlinedButton,
} from "src/components";
import { useDialog } from "src/hooks";
import { useSnackbar } from "notistack";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import { useRefereshContext } from "./RefereshProvider";
import { palette } from "src/colors";
import moment from "moment";

export function QuickSearchToolbar() {
  return (
    <SearchContainer>
      <GridToolbarQuickFilter variant="outlined" size="small" />
    </SearchContainer>
  );
}

const ArtistList = () => {
  const { enqueueSnackbar } = useSnackbar();

  const { showPost } = usePostContext();

  const { listRes, GetListAction } = useRefereshContext();

  const rowRef = useRef(null);

  // Delete Post
  const { open: showDialog, openDialog, closeDialog } = useDialog();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const setRowData = (params) => {
    rowRef.current = params;
    openDialog();
  };

  useEffect(() => {
    GetListAction();
  }, [GetListAction]);

  const deletePost = () => {
    if (!rowRef?.current?.row?.artist) {
      return;
    }
    setIsSubmitting(true);
    fetch(
      "http://localhost:3010/artist/delete/" + rowRef?.current?.row?.artist,
      {
        method: "DELETE",
      }
    ).then(() => {
      enqueueSnackbar(`Successfully deleted.`, {
        variant: "success",
      });
      setIsSubmitting(false);
      closeDialog();
      GetListAction();
    });
  };

  const getTotalMonth = (streams, rate) => {
    let startDate = moment("01/04/2016", "DD/MM/YYYY");
    if (streams >= 10000000 || rate > 0.01) {
      startDate = moment("01/04/2016", "DD/MM/YYYY");
    } else if (streams >= 5000000 && streams < 10000000) {
      startDate = moment("01/04/2018", "DD/MM/YYYY");
    } else if (streams >= 100000 && streams < 5000000) {
      startDate = moment("01/04/2020", "DD/MM/YYYY");
    } else {
      startDate = moment("01/04/2022", "DD/MM/YYYY");
    }
    const endDate = moment();
    const monthDiff = endDate.diff(startDate, "months");
    if (monthDiff) {
      return monthDiff;
    }
    return 0;
  };

  const customTableData = useMemo(() => {
    if (!listRes && listRes?.length === 0) {
      return [];
    }

    const listing = cloneDeep(listRes);
    const newListing =
      listing?.map((val) => {
        const totalMonth = getTotalMonth(
          Number(val?.streams),
          Number(val?.rate)
        );
        val.payout_amount = (
          (Number(val?.rate) || 0) * (Number(val?.streams) || 0)
        ).toFixed(2);
        let payoutPerMonth =
          ((Number(val?.rate) || 0) * (Number(val?.streams) || 0)) /
          Number(totalMonth);
        val.payout_per_month = payoutPerMonth.toFixed(2);
        return val;
      }) || [];
    return newListing;
  }, [listRes]);

  const editPost = (params) => {
    showPost(params);
  };

  const changeStatus = (params) => {
    if (!params?.row) {
      return;
    }

    const payload = {
      artist: params?.row.artist,
      rate: params?.row.rate,
      streams: params?.row.streams,
      status: !params?.row.status,
    };

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
        }
      });
  };

  const columns = [
    {
      field: "artist",
      headerName: "Name",
      sortable: true,
      width: 160,
    },
    {
      field: "rate",
      headerName: "Rate",
      sortable: true,
      width: 150,
    },
    {
      field: "streams",
      headerName: "Streams",
      sortable: true,
      width: 150,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "payout_amount",
      headerName: "Payout Amount",
      width: 190,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "payout_per_month",
      headerName: "Average payout per month",
      width: 270,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "status",
      headerName: "Status",
      renderCell: (params) => {
        return (
          <>
            {params.row?.status ? (
              <IncompleteButton onClick={() => changeStatus(params)}>
                completed
              </IncompleteButton>
            ) : (
              <CompleteButton onClick={() => changeStatus(params)}>
                Incomplete
              </CompleteButton>
            )}
          </>
        );
      },
      width: 150,
    },
    {
      field: "action",
      headerName: "",
      width: 100,
      sortable: false,
      headerClassName: "hideSortIcon",
      align: "right",
      renderCell: (params) => {
        return (
          <>
            <IconButton
              onClick={() => editPost(params)}
              style={{ color: palette.orange }}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              onClick={() => setRowData(params)}
              style={{ color: palette.error }}
            >
              <DeleteIcon />
            </IconButton>
          </>
        );
      },
    },
  ];

  return (
    <>
      <NGSection>
        <NGContainer>
          <Title>
            The Roster &nbsp;&nbsp;
            <OutlinedButton onClick={() => showPost(null)}>
              Add Artist
            </OutlinedButton>
          </Title>
          {customTableData?.length > 0 ? (
            <>
              <NGDataGrid
                getRowHeight={() => "auto"}
                rows={customTableData}
                columns={columns}
                pageSize={100}
                getRowId={(row) => row?.artist}
                disableSelectionOnClick
                hideFooterPagination={true}
                autoHeight={true}
                hideFooter={true}
                components={{
                  Toolbar: QuickSearchToolbar,
                }}
              />
            </>
          ) : (
            <div>No records </div>
          )}
        </NGContainer>
      </NGSection>
      <NGDialogConfirm
        confirmText="Delete"
        dialogTitle="Delete Post"
        dialogSubTitle="Are you sure you want to delete this post ?"
        open={showDialog}
        onClose={closeDialog}
        onConfirm={deletePost}
        loading={isSubmitting}
      />
    </>
  );
};

export default React.memo(ArtistList);
