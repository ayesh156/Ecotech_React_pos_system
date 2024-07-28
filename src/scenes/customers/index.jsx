import { Box, Button, useTheme } from "@mui/material";
import { useState, useEffect, useCallback } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { Link, useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import Loader from "../../components/Loader";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BASE_URL, U_EMAIL } from "../../config";

const Customer = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [initialValuesSet, setInitialValuesSet] = useState(false);
  const [customerData, setCustomerData] = useState({
    id: "",
    name: "",
    email: "",
    mobile: "",
    balance: ""
  },);
  const [toastDisplayed, setMsgDisplayed] = useState(false);
  const [toastMsg, setToastMsg] = useState("");

  const columns = [
    {
      field: "name",
      headerName: "Name",
      flex: 1.5,
      cellClassName: "name-column--cell",
      renderCell: (params) => (
        <Button onClick={() => editCustomers(params.row.id)} className="name-column--cell" style={{textTransform:"capitalize"}}>
          {params.value}
        </Button>
      )
    },
    {
      field: "email",
      headerName: "Email",
      flex: 2,
    },
    {
      field: "mobile",
      headerName: "Phone",
      flex: 1,
    },
    {
      field: "balance",
      headerName: "Balance (Rs.)",
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

  const editCustomers = (id) => {
    navigate(`${id}/edit`);
  };

  const fetchCustomer = useCallback(() => {
    axios
      .get(`${BASE_URL}/system-api/getCustomers?email=${U_EMAIL}`)
      .then(function (response) {
        if (response.data.status === 1) {
          setCustomerData(response.data.customer);
          setMsgDisplayed(true);
        } else {
          setToastMsg(response.data.message);
        }
      })
      .catch(function (error) {
        console.error("Error fetching customer data:", error);
        setToastMsg(error);
      })
      .finally(function () {
        setInitialValuesSet(true);
      });
  }, []);

  useEffect(() => {
    if (!initialValuesSet) {
      fetchCustomer();
    }
  }, [initialValuesSet, fetchCustomer]);

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

  if (!initialValuesSet) {
    return <Loader />;
  }

  return (
    <Box m="20px">
      <ToastContainer />
      <Box
        sx={{ display: "flex", justifyContent: "space-between", gap: "100px" }}
      >
      <Header title="Customer" subtitle="Key to business success: loyal customers." />
      <Link to={"/customers/create-customer"}>
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
            Add Customer
          </Button>
        </Link>
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
          }
        }}
      >
        <DataGrid rows={customerData} columns={columns} />
      </Box>
    </Box>
  );
};

export default Customer;
