import * as React from "react";
import {
  Box,
  Typography,
  useTheme,
  Button,
  TextField,
  useMediaQuery,
  Autocomplete,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataInvoices } from "../../data/mockData";
import Header from "../../components/Header";
import { useState, useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

const Invoices = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [gridRows, setGridRows] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [selectedRow, setSelectedRow] = useState(null);
  const [lastId, setLastId] = useState(0);
  const [open, setOpen] = useState(false);
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleDeleteRow = (idToDelete) => {
    setGridRows((prevRows) => prevRows.filter((row) => row.id !== idToDelete));
  };

  const handleClose = () => {
    setOpen(false);
  };

  const columns = [
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
      editable: true,
    },
    {
      field: "description",
      headerName: "Description",
      flex: 2,
      editable: true,
    },
    {
      field: "qty",
      headerName: "Quantity",
      flex: 1,
      editable: true,
    },
    {
      field: "price",
      headerName: "Price (Rs.)",
      flex: 1,
      editable: true,
    },
    {
      field: "tax",
      headerName: "Tax (%)",
      flex: 1,
      editable: true,
    },
    {
      field: "amount",
      headerName: "Amount (Rs.)",
      flex: 1,
    },
    {
      field: "delete",
      headerName: "Delete",
      flex: 0.5,
      renderCell: (params) => (
        <Button onClick={() => handleDeleteRow(params.row.id)}>
          <DeleteIcon style={{ color: colors.redAccent[500] }} />
        </Button>
      ),
    },
    {
      field: "edit",
      headerName: "Edit",
      flex: 0.5,
      renderCell: (params) => (
        <Button onClick={() => handleEditRow(params.row)}>
          <EditIcon style={{ color: colors.blueAccent[500] }} />
        </Button>
      ),
    },
  ];

  useEffect(() => {
    // Calculate total amount whenever gridRows change
    let sum = 0;
    gridRows.forEach((row) => {
      sum += parseFloat(row.amount);
    });
    setTotalAmount(sum);
  }, [gridRows]);

  const getDataButtonClick = () => {
    console.log(gridRows); // Log all the rows
  };

  const [newRow, setNewRow] = useState({
    id: "",
    name: "",
    description: "",
    qty: "",
    price: "",
    tax: "",
    amount: "",
  });

  const handleButtonClick = () => {
    const newId = lastId + 1;
    const parsedQty =
      newRow.qty.trim() !== "" && parseFloat(newRow.qty) >= 0
        ? parseFloat(newRow.qty)
        : 0;
    const parsedPrice =
      newRow.price.trim() !== "" && parseFloat(newRow.price) >= 0
        ? parseFloat(newRow.price)
        : 0;
    const parsedTax =
      newRow.tax.trim() !== "" && parseFloat(newRow.tax) >= 0
        ? parseFloat(newRow.tax)
        : 0;

    setGridRows((prevRows) => [
      ...prevRows,
      {
        id: newId,
        name: newRow.name,
        description: newRow.description,
        qty: parsedQty,
        price: parsedPrice,
        tax: parsedTax,
        amount: calculateAmount(parsedQty, parsedPrice, parsedTax),
      },
    ]);
    setNewRow({
      id: newId,
      name: "",
      description: "",
      qty: "",
      price: "",
      tax: "",
      amount: "",
    });
    setLastId(newId);
  };

  const calculateAmount = (qty, price, tax) => {
    const amount = qty * price;
    const taxAmount = (amount * tax) / 100;
    const totalAmount = amount - taxAmount;
    return totalAmount;
  };

  const handleEditRow = (row) => {
    setOpen(true);
    setSelectedRow(row);
  };

  const handleSaveEdit = () => {
    if (selectedRow) {
      const updatedRows = gridRows.map((row) =>
        row.id === selectedRow.id
          ? {
              ...row,
              name: selectedRow.name,
              description: selectedRow.description,
              qty: selectedRow.qty,
              price: selectedRow.price,
              tax: selectedRow.tax,
              amount: calculateAmount(
                parseFloat(selectedRow.qty),
                parseFloat(selectedRow.price),
                parseFloat(selectedRow.tax)
              ),
            }
          : row
      );
      setGridRows(updatedRows);
      setSelectedRow(null);
    }
    setOpen(false);
  };

  return (
    <Box m="20px">
      <Header title="INVOICES" subtitle="List of Invoice Balances" />
      <Box m="40px 0 0 0">
        <Typography>
          Hi
        </Typography>
      </Box>

      <Box m="40px 0 0 0" height="75vh">
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            mt: 2,
            mb: 5,
            gap: 2,
          }}
        >
          {Object.entries(newRow).map(([fieldName, value]) => {
            // Exclude id and amount fields from rendering
            if (fieldName !== "id" && fieldName !== "amount") {
              if (fieldName === "name") {
                return (
                  <Autocomplete
                    key={fieldName}
                    options={mockDataInvoices}
                    getOptionLabel={(option) => option.name}
                    onChange={(event, newValue) => {
                      if (newValue) {
                        setNewRow((prevRow) => ({
                          ...prevRow,
                          name: newValue.name,
                          description: "",
                          qty: "",
                          price: "",
                          tax: "",
                          amount: "",
                        }));
                      }
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Name"
                        color="secondary"
                        sx={{
                          width: "200px",
                          "& .MuiInputLabel-root.Mui-focused": {
                            color: colors.primary[100],
                          },
                        }}
                      />
                    )}
                  />
                );
              } else {
                return (
                  <TextField
                    key={fieldName}
                    color="secondary"
                    label={
                      fieldName === "tax"
                        ? `${
                            fieldName.charAt(0).toUpperCase() +
                            fieldName.slice(1)
                          } (%)`
                        : fieldName === "price" || fieldName === "amount"
                        ? `${
                            fieldName.charAt(0).toUpperCase() +
                            fieldName.slice(1)
                          } (Rs.)`
                        : `${
                            fieldName.charAt(0).toUpperCase() +
                            fieldName.slice(1)
                          }`
                    }
                    value={value}
                    sx={{
                      width: fieldName === "description" ? "400px" : "auto",
                      "& .MuiInputLabel-root.Mui-focused": {
                        color: colors.primary[100],
                      },
                      border: "1px",
                      "& .MuiOutlinedInput-root:hover": {
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: colors.primary[200],
                        },
                      },
                    }}
                    onChange={(e) => {
                      const { name, value } = e.target;
                      setNewRow((prevRow) => ({
                        ...prevRow,
                        [name]: value,
                        amount:
                          name === "qty" || name === "price" || name === "tax"
                            ? calculateAmount(
                                prevRow.qty,
                                prevRow.price,
                                prevRow.tax
                              )
                            : prevRow.amount,
                      }));
                    }}
                    name={fieldName}
                  />
                );
              }
            }
            return null;
          })}
        </Box>

        <Box
          m="20px 0 0 0"
          sx={{
            "& .MuiDataGrid-root": {
              border: "none",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "none",
            },
            "& .name-column--cell": {
              color: colors.greenAccent[300],
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: colors.blueAccent[700],
              borderBottom: "none",
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: colors.primary[400],
            },
            "& .MuiDataGrid-footerContainer": {
              borderTop: "none",
              backgroundColor: colors.blueAccent[700],
            },
            "& .MuiCheckbox-root": {
              color: `${colors.greenAccent[200]} !important`,
            },
          }}
        >
          <DataGrid autoHeight hideFooter rows={gridRows} columns={columns} />
        </Box>
        <Box display="flex" justifyContent="space-between" p={2}>
          <Button
            sx={{
              color: colors.redAccent[300],
              minWidth: "150px",
              textTransform: "capitalize",
              fontSize: "16px",
              "&:hover": {
                color: colors.redAccent[400],
              },
            }}
            onClick={handleButtonClick}
          >
            <AddIcon /> Add another product
          </Button>
          <Box display="flex" justifyContent="space-between" p={2}>
            <Typography variant="h5" mr="10px">
              Total:
            </Typography>
            <Typography variant="h5">LKR {totalAmount.toFixed(2)}</Typography>
          </Box>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            onClick={getDataButtonClick}
            sx={{
              color: colors.grey[100],
              minWidth: "150px",
              backgroundColor: colors.blueAccent[700],
              "&:hover": {
                backgroundColor: colors.blueAccent[600],
              },
            }}
          >
            Send invoice
          </Button>
        </Box>
      </Box>

      <React.Fragment>
        <Dialog
          open={open}
          keepMounted
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle fontSize={16}>{"Edit Selected Product"}</DialogTitle>
          {selectedRow && (
            <DialogContent>
            <Box
              maxWidth="400px"
              sx={{
                "& > div": {
                  gridColumn: isNonMobile ? undefined : "span 4",
                },
              }}
            >
              <Box
                sx={{
                  display: isNonMobile ? "flex" : undefined,
                  gap: isNonMobile ? "20px" : undefined,
                  marginTop: "15px",
                }}
              >
                <TextField
                  label="Name"
                  color="secondary"
                  value={selectedRow.name}
                  onChange={(e) =>
                    setSelectedRow({ ...selectedRow, name: e.target.value })
                  }
                />
                <TextField
                  label="Quantity"
                  color="secondary"
                  value={selectedRow.qty}
                  onChange={(e) => {
                    const newValue = parseFloat(e.target.value);
                    setSelectedRow({
                      ...selectedRow,
                      qty: isNaN(newValue) || newValue < 0 ? 0 : newValue,
                    });
                  }}
                />
              </Box>
              <Box
                sx={{
                  display: isNonMobile ? "flex" : undefined,
                  gap: isNonMobile ? "20px" : undefined,
                  marginTop: "15px",
                }}
              >
                <TextField
                  label="Price (Rs.)"
                  color="secondary"
                  value={selectedRow.price}
                  onChange={(e) => {
                    const newValue = parseFloat(e.target.value);
                    setSelectedRow({
                      ...selectedRow,
                      price: isNaN(newValue) || newValue < 0 ? 0 : newValue,
                    });
                  }}
                />
                <TextField
                  label="Tax (%)"
                  color="secondary"
                  value={selectedRow.tax}
                  onChange={(e) => {
                    const newValue = parseFloat(e.target.value);
                    setSelectedRow({
                      ...selectedRow,
                      tax: isNaN(newValue) || newValue < 0 ? 0 : newValue,
                    });
                  }}
                />
              </Box>
              <TextField
                label="Description"
                color="secondary"
                value={selectedRow.description}
                sx={{
                  display: isNonMobile ? "flex" : undefined,
                  gap: isNonMobile ? "20px" : undefined,
                  marginTop: "15px",
                }}
                onChange={(e) =>
                  setSelectedRow({
                    ...selectedRow,
                    description: e.target.value,
                  })
                }
              />
            </Box>
          </DialogContent>
          
          )}
          <DialogActions>
            <Button onClick={handleClose} sx={{ color: colors.primary[100] }}>
              Close
            </Button>
            <Button
              onClick={handleSaveEdit}
              sx={{ color: colors.primary[100] }}
            >
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    </Box>
  );
};

export default Invoices;
