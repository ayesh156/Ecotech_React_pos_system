import { Box, useTheme, Button, IconButton } from "@mui/material";
import { useState, useEffect } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataContacts } from "../../data/mockData";
import Header from "../../components/Header";
import { Link } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import ClearIcon from "@mui/icons-material/Clear";
import EditIcon from "@mui/icons-material/Edit";

const Invoices = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  // State for selected date range and filtered data
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [filteredData, setFilteredData] = useState(mockDataContacts);
  const [showCloseStartDate, setShowCloseStartDate] = useState(false);
  const [showCloseEndDate, setShowCloseEndDate] = useState(false);

  const columns = [
    { field: "invoiceNumber", headerName: "Invoice Number", flex: 1 },
    {
      field: "customer",
      headerName: "Customer",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "date",
      headerName: "Date",
      flex: 1,
    },
    {
      field: "dueDate",
      headerName: "Due Date",
      flex: 1,
    },
    {
      field: "dueAmount",
      headerName: "Due Amount (Rs.)",
      type: "number",
      flex: 1,
    },
    {
      field: "totalAmount",
      headerName: "Total Amount (Rs.)",
      type: "number",
      flex: 1,
    },
    {
      field: "edit",
      headerName: "Edit",
      flex: 0.3,
      renderCell: (params) => (
        <Link to={`${params.row.id}/edit`}>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <EditIcon style={{ color: colors.blueAccent[500] }} />
          </Box>
        </Link>
      ),
    },
  ];

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
    if (
      selectedStartDate &&
      selectedStartDate.$y &&
      selectedEndDate &&
      selectedEndDate.$y
    ) {
      // Convert selectedStartDate and selectedEndDate to Date objects
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

      const filtered = mockDataContacts.filter((item) => {
        // Convert item.date to a Date object
        const itemDate = new Date(item.date);

        // Compare item.date with selectedStartDate and selectedEndDate
        return itemDate >= startDate && itemDate <= endDate;
      });

      setFilteredData(filtered);
    } else {
      setFilteredData(mockDataContacts);
    }
  }, [selectedStartDate, selectedEndDate]);

  return (
    <Box m="20px">
      <Box
        sx={{ display: "flex", justifyContent: "space-between", gap: "100px" }}
      >
        <Header
          title="Invoices"
          subtitle="Effortlessly manage invoices with our intuitive interface."
        />
        <Link to={"/invoices/new_invoice"}>
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
          rows={filteredData}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default Invoices;
