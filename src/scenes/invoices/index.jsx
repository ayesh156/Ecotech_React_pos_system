import { Box, useTheme, Button, IconButton } from "@mui/material";
import { useState, useEffect, useCallback } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { Link, useNavigate } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import ClearIcon from "@mui/icons-material/Clear";
import Loader from "../../components/Loader";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BASE_URL, U_EMAIL } from "../../config";
import PositionedMenu from "../../components/PositionedMenu"; // Adjust the import path accordingly

const Invoices = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  // State for selected date range and filtered data
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const [productData, setProductData] = useState({
    invoice_id: "",
    name: "",
    date: "",
    due_date: "",
    due_amount: "",
    total_amount: "",
  });
  const [showCloseStartDate, setShowCloseStartDate] = useState(false);
  const [showCloseEndDate, setShowCloseEndDate] = useState(false);
  const [initialValuesSet, setInitialValuesSet] = useState(false);
  const [toastDisplayed, setMsgDisplayed] = useState(false);
  const [toastMsg, setToastMsg] = useState("");

  const columns = [
    {
      field: "status",
      headerName: "Status",
      flex: 0.6,
      renderCell: (params) => {
        const { due_amount, total_amount, due_date } = params.row;
        const dueDate = new Date(due_date);
        const currentDate = new Date();

        let status = "Unpaid";
        if (due_amount <= 0) {
          status = "Paid";
        } else if (due_amount < total_amount && currentDate > dueDate) {
          status = "Overdue";
        } else if (due_amount === total_amount) {
          status = "Unpaid";
        }

        return (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              borderRadius: "5px",
              paddingY: "3px",
              paddingX: "10px",
              fontWeight: "bold",
              backgroundColor:
                status === "Paid"
                  ? colors.blueAccent[500]
                  : status === "Overdue"
                  ? colors.redAccent[500]
                  : colors.greenAccent[500],
            }}
          >
            {status}
          </Box>
        );
      },
    },
    { field: "invoice_id", headerName: "Invoice Number", flex: 0.6 },
    {
      field: "name",
      headerName: "Customer",
      flex: 1,
      cellClassName: "name-column--cell",
      renderCell: (params) => (
        <Button onClick={() => editInvoice(params.row.id)} className="name-column--cell" style={{textTransform:"capitalize"}}>
          {params.value}
        </Button>
      )
    },
    {
      field: "date",
      headerName: "Date",
      flex: 0.6,
    },
    {
      field: "due_date",
      headerName: "Due Date",
      flex: 0.6,
    },
    {
      field: "due_amount",
      headerName: "Due Amount (Rs.)",
      type: "number",
      flex: 1,
    },
    {
      field: "total_amount",
      headerName: "Total Amount (Rs.)",
      type: "number",
      flex: 1,
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 0.5,
       renderCell: (params) => {
        const menuItems = [
          { label: 'Copy Invoice', onClick: () => handleCopyLink(params.row.id) },
          { label: 'View Invoice', onClick: () => viewInvoice(params.row.id) },
          { label: 'Edit Invoice', onClick: () => editInvoice(params.row.id) },
          { label: 'Delete Invoice', onClick: () => deleteInvoice(params.row.id) },
        ];
        
        return <PositionedMenu menuItems={menuItems} />;
      },
    },
  ];

  const viewInvoice = (e) => {
    const invoiceId = e;
    const encodedData = btoa(`${invoiceId},${U_EMAIL}`);
    window.open(
      `${BASE_URL}/system-api/invoice_pdf?data=${encodedData}`,
      "_blank"
    );
  };

  const editInvoice = (id) => {
    navigate(`${id}/edit`);
  };

  const handleCopyLink = (invoiceId) => {
    const encodedData = btoa(`${invoiceId},${U_EMAIL}`);
    // const link = `${BASE_URL}/system-api/invoice_pdf?data=${encodedData}`;
    const link = `https://nebulainfinite.com/system-api/invoice_pdf?data=${encodedData}`;
    navigator.clipboard
      .writeText(link)
      .then(() => {
        toast.success("Link copied to clipboard!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: theme.palette.mode === "dark" ? "dark" : "light",
        });
      })
      .catch((error) => {
        toast.error("Failed to copy the link!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: theme.palette.mode === "dark" ? "dark" : "light",
        });
      });
  };

  const fetchInvoice = useCallback(() => {
    axios
      .get(`${BASE_URL}/system-api/invoice?email=${U_EMAIL}`)
      .then(function (response) {
        // console.log(response.data.invoice);
        if (response.data.status === 1) {
          setProductData(response.data.invoice);
          setMsgDisplayed(true);
        } else {
          setToastMsg(response.data.message);
        }
      })
      .catch(function (error) {
        console.error("Error fetching invoice data:", error);
        setToastMsg(error);
      })
      .finally(function () {
        setInitialValuesSet(true);
      });
  }, []);

  useEffect(() => {
    if (!initialValuesSet) {
      fetchInvoice();
    }
  }, [initialValuesSet, fetchInvoice]);

  useEffect(() => {
    if (initialValuesSet && !toastDisplayed && toastMsg) {
      setTimeout(() => {
        toast.error(toastMsg, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: theme.palette.mode === "dark" ? "dark" : "light",
        });
        setMsgDisplayed(true);
      }, 1000);
    }
  }, [initialValuesSet, toastDisplayed, toastMsg, theme.palette.mode]);

  useEffect(() => {
    if (!selectedStartDate) {
      setShowCloseStartDate(false);
    }
    if (!selectedEndDate) {
      setShowCloseEndDate(false);
    }
  }, [selectedStartDate, selectedEndDate]);

  const handleClearStartDate = () => {
    setSelectedStartDate(null);
    setShowCloseStartDate(false);
  };

  const handleClearEndDate = () => {
    setSelectedEndDate(null);
    setShowCloseEndDate(false);
  };

  // Filter data based on selected date range
  useEffect(() => {
    if (selectedStartDate && selectedEndDate) {
      const startDate = new Date(
        selectedStartDate.$y,
        selectedStartDate.$M,
        selectedStartDate.$D
      );
      const endDate = new Date(
        selectedEndDate.$y,
        selectedEndDate.$M,
        selectedEndDate.$D
      );

      const filtered = productData.filter((item) => {
        const itemDate = new Date(item.date);
        return itemDate >= startDate && itemDate <= endDate;
      });

      setFilteredData(filtered);
    } else if (selectedStartDate) {
      const startDate = new Date(
        selectedStartDate.$y,
        selectedStartDate.$M,
        selectedStartDate.$D
      );

      const filtered = productData.filter((item) => {
        const itemDate = new Date(item.date);
        return itemDate >= startDate;
      });

      setFilteredData(filtered);
    } else if (selectedEndDate) {
      const endDate = new Date(
        selectedEndDate.$y,
        selectedEndDate.$M,
        selectedEndDate.$D
      );

      const filtered = productData.filter((item) => {
        const itemDate = new Date(item.date);
        return itemDate <= endDate;
      });

      setFilteredData(filtered);
    } else {
      setFilteredData(productData);
    }
  }, [selectedStartDate, selectedEndDate, productData]);

  const deleteInvoice = (invoiceId) => {
  
    axios
      .delete(
        `${BASE_URL}/system-api/invoice?id=${invoiceId}&email=${U_EMAIL}`
      )
      .then((response) => {
        // Handle successful response, if needed
        // console.log(response.data);
        if (response.data.status === 1) {
          toast.success(response.data.message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: theme.palette.mode === "dark" ? "dark" : "light",
          });
          fetchInvoice();
        } else {
          setToastMsg(response.data.message);
        }
      })
      .catch((error) => {
        setToastMsg(error);
      });

    if (toastMsg) {
      toast.error(toastMsg, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: theme.palette.mode === "dark" ? "dark" : "light",
      });
    }
  };

  if (!initialValuesSet) {
    return <Loader />;
  }

  return (
    <Box m="20px">
      <ToastContainer />
      <Box
        sx={{ display: "flex", justifyContent: "space-between", gap: "100px" }}
      >
        <Header
          title="Invoices"
          subtitle="Effortlessly manage invoices with our intuitive interface."
        />
        <Link to={"/invoices/create-invoice"}>
          <Button
            sx={{
              textTransform: "none",
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "17px",
              paddingX: "25px",
              height: "50px",
              fontWeight: "500",
              "&:hover": {
                backgroundColor: colors.blueAccent[800],
              },
            }}
          >
            Create new invoice
          </Button>
        </Link>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "50px",
        }}
      >
        <Box position={"relative"}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker"]}>
              <DatePicker
                value={selectedStartDate}
                format="YYYY-MM-DD"
                onChange={(newValue) => {
                  setSelectedStartDate(newValue);
                  setShowCloseStartDate(true);
                }}
                slotProps={{
                  textField: () => ({
                    color: "secondary",
                  }),
                }}
                label="From Date"
              />
              {showCloseStartDate && (
                <IconButton
                  sx={{ position: "absolute", top: 13, right: 25 }}
                  onClick={handleClearStartDate}
                >
                  <ClearIcon
                    sx={{
                      fontSize: "25px",
                      color: colors.redAccent[500],
                      fontWeight: "bold",
                    }}
                  />
                </IconButton>
              )}
            </DemoContainer>
          </LocalizationProvider>
        </Box>
        <Box position={"relative"}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker"]}>
              <DatePicker
                value={selectedEndDate}
                format="YYYY-MM-DD"
                onChange={(newValue) => {
                  setSelectedEndDate(newValue);
                  setShowCloseEndDate(true);
                }}
                slotProps={{
                  textField: () => ({
                    color: "secondary",
                  }),
                }}
                label="To Date"
              />
              {showCloseEndDate && (
                <IconButton
                  sx={{ position: "absolute", top: 13, right: 25 }}
                  onClick={handleClearEndDate}
                >
                  <ClearIcon
                    sx={{
                      fontSize: "25px",
                      color: colors.redAccent[500],
                      fontWeight: "bold",
                    }}
                  />
                </IconButton>
              )}
            </DemoContainer>
          </LocalizationProvider>
        </Box>
      </Box>
      <Box
        m="40px 0 0 0"
        height="75vh"
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
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          rows={
            selectedStartDate || selectedEndDate ? filteredData : productData
          }
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default Invoices;
