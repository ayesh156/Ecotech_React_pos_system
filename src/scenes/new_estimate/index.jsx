import * as React from "react";
import {
  Box,
  Typography,
  useTheme,
  Button,
  TextField,
  useMediaQuery,
  Autocomplete,
  FormHelperText,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { useState, useEffect, useCallback } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import LoadingButton from "@mui/lab/LoadingButton";
import SendIcon from "@mui/icons-material/Send";
import Loader from "../../components/Loader";
import { useNavigate } from "react-router-dom";
import KeyboardArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardArrowLeftOutlined";
import AddCardOutlinedIcon from "@mui/icons-material/AddCardOutlined";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import { Formik } from "formik";
import * as yup from "yup";
import axios from "axios";
import SaveIcon from "@mui/icons-material/Save";
import { ToastContainer, toast } from "react-toastify";
import FileCopyOutlinedIcon from "@mui/icons-material/FileCopyOutlined";
import "react-toastify/dist/ReactToastify.css";
import { BASE_URL, U_EMAIL } from "../../config";

const customerInitialValues = {
  name: "",
  email: "",
  mobile: "",
};

const phoneRegExp = /^[0]{1}[1245678]{1}[01245678]{1}[0-9]{7}$/;

const customerSchema = yup.object().shape({
  name: yup.string().required("required"),
  mobile: yup.string().matches(phoneRegExp, "Phone number is not valid"),
});

const productInitialValues = {
  name: "",
  description: "",
  buying_price: "",
  selling_price: "",
};

const productSchema = yup.object().shape({
  name: yup.string().required("required"),
});

const New_Estimate = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [gridRows, setGridRows] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [selectedRow, setSelectedRow] = useState(null);
  const [lastId, setLastId] = useState(0);
  const [open, setOpen] = useState(false);
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedDueDate, setSelectedDueDate] = useState(null);
  const [customer, setCustomer] = useState(null);
  const [customerId, setCustomerId] = useState(null);
  const [isCustomerError, setIsCustomerError] = useState(false);
  const [isDateError, setIsDateError] = useState(false);
  const [isDueDateError, setIsDueDateError] = useState(false);
  const [estimateName, setEstimateName] = useState("");
  const [subhead, setSubhead] = useState("");
  const [estimateNumber, setEstimateNumber] = useState("");
  const [paidAmount, setPaidAmount] = useState("");
  const [notes, setNotes] = useState("");
  const [paymentInstructions, setPaymentInstructions] = useState("");
  const [saveLoading, setSaveLoading] = useState(false);
  const [footerNotes, setFooterNotes] = useState("");
  const [sendLoading, setSendLoading] = useState(false);
  const [customerLoading, setCustomerLoading] = useState(false);
  const [productLoading, setProductLoading] = useState(false);
  const navigate = useNavigate();
  const [openNProduct, setOpenNProduct] = useState(false);
  const [openNCustomer, setOpenNCustomer] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const [productNameEmpty, setProductNameEmpty] = useState(true);
  const [customerNameEmpty, setCustomerNameEmpty] = useState(true);
  const [initialValuesSet, setInitialValuesSet] = useState(false);
  const [printLoading, setPrintLoading] = useState(false);
  const [toastDisplayed, setMsgDisplayed] = useState(false);
  const [estimateError, setEstimateError] = useState(null);
  
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    buying_price: "",
    selling_price: "",
  });
  const [customerData, setCustomerData] = useState({
    name: "",
  });

  const paidAmountChange = (event) => {
    const amount = parseFloat(event.target.value);
    if (!isNaN(amount)) {
      setPaidAmount(amount);
    } else {
      setPaidAmount("");
    }
  };

  const payableAmount = paidAmount - totalAmount;

  const deleteRow = (idToDelete) => {
    setGridRows((prevRows) => prevRows.filter((row) => row.id !== idToDelete));
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
      type: "number",
    },
    {
      field: "price",
      headerName: "Price (Rs.)",
      flex: 1,
      editable: true,
      type: "number",
    },
    {
      field: "tax",
      headerName: "Tax (%)",
      flex: 1,
      editable: true,
      type: "number",
    },
    {
      field: "amount",
      headerName: "Amount (Rs.)",
      flex: 1,
      align: "right",
      headerAlign: "right",
    },
    {
      field: "delete",
      headerName: "Delete",
      flex: 0.5,
      renderCell: (params) => (
        <Button onClick={() => deleteRow(params.row.id)}>
          <DeleteIcon style={{ color: colors.redAccent[500] }} />
        </Button>
      ),
    },
    {
      field: "edit",
      headerName: "Edit",
      flex: 0.5,
      renderCell: (params) => (
        <Button
          onClick={() => {
            setOpen(true);
            setSelectedRow(params.row);
          }}
        >
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

  const collectData = () => {
    // Collect values from Datepickers
    const selectedDateValue = selectedDate
      ? selectedDate.format("YYYY-MM-DD")
      : null;
    const selectedDueDateValue = selectedDueDate
      ? selectedDueDate.format("YYYY-MM-DD")
      : null;

    // Collect values from DataGrid rows
    const productTable = gridRows.map((row) => {
      // Find the corresponding product data by name (or ID if available)
      const productInfo = productData.find(
        (product) => product.name === row.name
      );

      return {
        name: row.name,
        description: row.description,
        qty: row.qty,
        price: row.price,
        tax: row.tax,
        buying_price: productInfo
          ? parseInt(productInfo.buying_price, 10) || 0
          : 0,
      };
    });

    // Combine all collected values into one object
    const collectedData = {
      customerId,
      estimateName,
      subhead,
      estimateNumber,
      notes,
      paymentInstructions,
      footerNotes,
      selectedDate: selectedDateValue,
      selectedDueDate: selectedDueDateValue,
      paidAmount,
      productTable,
    };

    return collectedData;
  };

  const fetchProduct = useCallback(() => {
    axios
      .get(`${BASE_URL}/system-api/getProducts?email=${U_EMAIL}`)
      .then(function (response) {
        if (response.data.status === 1) {
          setProductData(response.data.product);
        } else {
          setToastMsg(response.data.message);
        }
      })
      .catch(function (error) {
        console.error("Error fetching product data:", error);
        setToastMsg(error);
      })
      .finally(function () {
        setInitialValuesSet(true);
      });
  }, []);

  useEffect(() => {
    if (!initialValuesSet) {
      fetchProduct();
    }
  }, [initialValuesSet, fetchProduct]);

  const fetchEstimateId = useCallback(() => {
    axios
      .get(`${BASE_URL}/system-api/getEstimateId?email=${U_EMAIL}`)
      .then(function (response) {
        if (response.data.status === 1) {
          setEstimateNumber(response.data.estimate_id);
          setEstimateError(null);
        } else {
          setToastMsg(response.data.message);
        }
      })
      .catch(function (error) {
        console.error("Error fetching product data:", error);
        setToastMsg(error);
      })
      .finally(function () {
        setInitialValuesSet(true);
      });
  }, []);

  useEffect(() => {
    if (!initialValuesSet) {
      fetchEstimateId();
    }
  }, [initialValuesSet, fetchEstimateId]);

  const saveProduct = (values, { resetForm }) => {
    const updatedValues = { ...values, user_email: U_EMAIL };

    setProductLoading(true);

    axios
      .post(`${BASE_URL}/system-api/product`, updatedValues)
      .then((response) => {
        // Handle successful response, if needed
        console.log(response.data);
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

          // After saving the product, fetch the updated product data
          fetchProduct();
        } else {
          setToastMsg(response.data.message);
        }
      })
      .catch((error) => {
        setToastMsg(error);
      })
      .finally(function () {
        resetForm();
        setProductLoading(false);
        setOpenNProduct(false);
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

  const saveCustomer = (values, { resetForm }) => {
    const updatedValues = {
      ...values, // Include selected province in the saved object
      user_email: U_EMAIL,
    };
    setCustomerLoading(true);

    axios
      .post(`${BASE_URL}/system-api/customer`, updatedValues)
      .then((response) => {
        // Handle successful response, if needed
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

          // After saving the customer, fetch the updated customer data
          fetchCustomer();
        } else {
          setToastMsg(response.data.message);
        }
      })
      .catch((error) => {
        setToastMsg(error);
      })
      .finally(function () {
        resetForm();
        setCustomerLoading(false);
        setOpenNCustomer(false);
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

  useEffect(() => {
    if (!toastDisplayed && toastMsg) {
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
  }, [toastDisplayed, toastMsg, theme.palette.mode]);
  
  const saveEstimate = () => {
    if (!estimateNumber) {
      setEstimateError("Estimate number required");
      return;
    }

    if (isNaN(estimateNumber)) {
      setEstimateError("Please enter a number");
      return;
    }

    if (!customer || !selectedDate || !selectedDueDate) {
      setIsCustomerError(!customer);
      setIsDateError(!selectedDate);
      setIsDueDateError(!selectedDueDate);
      return;
    }

    setSaveLoading(true);

    const collectedData = { ...collectData(), action: 'save' }; // Add action parameter
    // console.log(collectedData);

    axios
      .post(`${BASE_URL}/system-api/estimate?email=${U_EMAIL}`, collectedData)
      .then((response) => {
        // Handle successful response, if needed
        console.log(response.data);
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

        
        } else {
          setToastMsg(response.data.message);
        }
      })
      .catch((error) => {
        setToastMsg(error);
      })
      .finally(function () {
        fetchEstimateId();
        resetInputs();
        setSaveLoading(false);
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

  const printEstimate = () => {
    if (!estimateNumber) {
      setEstimateError("Estimate number required");
      return;
    }

    if (isNaN(estimateNumber)) {
      setEstimateError("Please enter a number");
      return;
    }

    if (!customer || !selectedDate || !selectedDueDate) {
      setIsCustomerError(!customer);
      setIsDateError(!selectedDate);
      setIsDueDateError(!selectedDueDate);
      return;
    }

    setPrintLoading(true);

    const collectedData = { ...collectData(), action: 'save' }; // Add action parameter
    // console.log(collectedData);

    axios
      .post(`${BASE_URL}/system-api/estimate?email=${U_EMAIL}`, collectedData)
      .then((response) => {
        // Handle successful response, if needed
        console.log(response.data);
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

           // Prepare data for the PDF URL
        const estimateId = response.data.estimate_id;
        const encodedData = btoa(`${estimateId},${U_EMAIL}`);

        // Open the PDF in a new window and trigger the print dialog
        const pdfWindow = window.open(
          `${BASE_URL}/system-api/estimate_pdf?data=${encodedData}`,
          "_blank"
        );

        // Optional: Check if PDF is loaded and trigger print dialog
        pdfWindow.onload = () => {
          pdfWindow.print();
        };
        
        } else {
          setToastMsg(response.data.message);
        }
      })
      .catch((error) => {
        setToastMsg(error);
      })
      .finally(function () {
        fetchEstimateId();
        resetInputs();
        setPrintLoading(false);
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

  const sendEstimate = () => {
    if (!estimateNumber) {
      setEstimateError("Estimate number required");
      return;
    }

    if (isNaN(estimateNumber)) {
      setEstimateError("Please enter a number");
      return;
    }

    if (!customer || !selectedDate || !selectedDueDate) {
      setIsCustomerError(!customer);
      setIsDateError(!selectedDate);
      setIsDueDateError(!selectedDueDate);
      return;
    }

    setSendLoading(true);

    const collectedData = { ...collectData(), action: 'send' }; // Add action parameter
    // console.log(collectedData);

    axios
      .post(`${BASE_URL}/system-api/estimate?email=${U_EMAIL}`, collectedData)
      .then((response) => {
        // Handle successful response, if needed
        console.log(response.data);
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

          setTimeout(() => {
            const estimateId = response.data.estimate_id;
            const encodedData = btoa(`${estimateId},${U_EMAIL}`);
            window.open(
              `${BASE_URL}/system-api/estimate_pdf?data=${encodedData}`,
              "_blank"
            );
          }, 1000);
        } else {
          setToastMsg(response.data.message);
        }
      })
      .catch((error) => {
        setToastMsg(error);
      })
      .finally(function () {
        fetchEstimateId();
        resetInputs();
        setSendLoading(false);
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

  const resetInputs = () => {
    setCustomer(null);
    setCustomerId(null);
    setIsCustomerError(false);
    setSelectedDate(null);
    setIsDateError(false);
    setSelectedDueDate(null);
    setIsDueDateError(null);
    setEstimateName("");
    setSubhead("");
    setPaidAmount("");

    // Clear table rows
    setGridRows([]);
  };

  const [newRow, setNewRow] = useState({
    id: "",
    name: null,
    description: "",
    qty: "0",
    price: "0",
    tax: "",
    amount: "",
  });

  const addAnotherProduct = () => {
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
      name: null,
      description: "",
      qty: "0",
      price: "0",
      tax: "",
      amount: "",
    });

    setLastId(newId);
  };

  const fetchEstimate = useCallback(() => {
    axios
      .get(`${BASE_URL}/system-api/getDefaultDetails?email=${U_EMAIL}`)
      .then((response) => {
        // console.log(response.data);
        if (response.data.status === 1) {
          const userData = response.data.defaultData;
          // console.log(userData);
          setFooterNotes(userData.footerNotes);
          setNotes(userData.notes);
          setPaymentInstructions(userData.paymentInstructions);
          setMsgDisplayed(true);
        } else {
          setToastMsg(response.data.message);
        }
      })
      .catch((error) => {
        console.error("Error fetching user:", error);
        setToastMsg(error);
      })
      .finally(function () {
        setInitialValuesSet(true);
      });
  }, []);

  useEffect(() => {
    fetchEstimate();
  }, [fetchEstimate, customerData, fetchProduct]);

  const calculateAmount = (qty, price, tax) => {
    const amount = qty * price;
    const taxAmount = (amount * tax) / 100;
    const totalAmount = amount + taxAmount;
    return totalAmount;
  };

  const saveEditedRow = () => {
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

  if (!initialValuesSet) {
    return <Loader />;
  }

  return (
    <Box m="20px">
      <ToastContainer />
      <Button
        sx={{ display: "flex", alignItems: "center" }}
        color="inherit"
        onClick={() => {
          navigate(-1);
        }}
      >
        <KeyboardArrowLeftOutlinedIcon sx={{ fontSize: "35px" }} />
        <Typography
          variant="h3"
          fontWeight="bold"
          textTransform={"capitalize"}
          color={colors.grey[100]}
        >
          New Estimate
        </Typography>
      </Button>
      <Box
        m="40px 0 0 0"
        sx={{ display: "flex", justifyContent: "space-between", gap: "80px" }}
      >
        <Box sx={{ width: "100%" }}>
          <TextField
            label="Estimate Name"
            fullWidth
            color="secondary"
            value={estimateName}
            onChange={(event) => {
              setEstimateName(event.target.value);
            }}
          />
          <TextField
            label="Subhead"
            fullWidth
            color="secondary"
            sx={{ marginTop: "18px" }}
            value={subhead}
            onChange={(event) => {
              setSubhead(event.target.value);
            }}
          />
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            width: "500px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              gap: "20px",
              gridColumn: "span 4",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "5px",
              }}
            >
              <Button
                onClick={() => {
                  setOpenNCustomer(true);
                }}
                sx={{
                  textTransform: "none",
                  backgroundColor: colors.blueAccent[700],
                  color: colors.grey[100],
                  fontSize: "16px",
                  height: "50px",
                  fontWeight: "500",
                  "&:hover": {
                    backgroundColor: colors.blueAccent[800],
                  },
                }}
              >
                <PersonAddAltOutlinedIcon />
              </Button>
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={customerData}
                value={
                  customer
                    ? customerData.find((option) => option.name === customer)
                    : null
                }
                getOptionLabel={(option) => option.name}
                onChange={(event, newValue) => {
                  if (newValue) {
                    setCustomer(newValue.name);
                    setCustomerId(newValue.id);
                    setIsCustomerError(false);
                  } else {
                    setCustomer("");
                    setCustomerId("");
                    setIsCustomerError(true);
                  }
                }}
                sx={{ position: "relative", width: "180px" }}
                renderInput={(params) => (
                  <>
                    <TextField {...params} label="Customer" color="secondary" />
                    {isCustomerError && (
                      <FormHelperText
                        sx={{
                          color: colors.redAccent[500],
                          marginLeft: "10px",
                          position: "absolute",
                          bottom: -20,
                          left: 0,
                        }}
                      >
                        The customer field is required
                      </FormHelperText>
                    )}
                  </>
                )}
              />
            </Box>
            <TextField
              color="secondary"
              label="Estimate number"
              fullWidth
              sx={{ alignSelf: "flex-end" }}
              value={estimateNumber}
              onChange={(event) => {
                const value = event.target.value;
                setEstimateNumber(value);
                if (!value) {
                  setEstimateError("Estimate number is required");
                } else if (isNaN(value)) {
                  setEstimateError("Please enter a number");
                } else {
                  setEstimateError(null);
                }
              }}
              error={!!estimateError}
              helperText={estimateError}
            />
          </Box>
          <Box sx={{ display: "flex", gap: "20px", marginTop: "10px" }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]}>
                <DatePicker
                  value={selectedDate}
                  format="YYYY-MM-DD"
                  onChange={(newValue) => {
                    setSelectedDate(newValue);
                  }}
                  slotProps={{
                    textField: () => ({
                      color: "secondary",
                      helperText: !selectedDate ? (
                        <span style={{ color: colors.redAccent[500] }}>
                          {isDateError && "The Date field is required"}
                        </span>
                      ) : null,
                    }),
                  }}
                  label="Date"
                />
              </DemoContainer>
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]}>
                <DatePicker
                  value={selectedDueDate}
                  format="YYYY-MM-DD"
                  onChange={(newValue) => {
                    setSelectedDueDate(newValue);
                  }}
                  slotProps={{
                    textField: () => ({
                      color: "secondary",
                      helperText: !selectedDueDate ? (
                        <span style={{ color: colors.redAccent[500] }}>
                          {isDueDateError && "The Due Date field is required"}
                        </span>
                      ) : null,
                    }),
                  }}
                  label="Payment due date"
                />
              </DemoContainer>
            </LocalizationProvider>
          </Box>
        </Box>
      </Box>

      <Box m="40px 0 0 0" height="75vh">
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
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            mt: 2,
            mb: 2,
            gap: 2,
          }}
        >
          {Object.entries(newRow).map(([fieldName, value]) => {
            // Exclude id and amount fields from rendering
            if (fieldName !== "id" && fieldName !== "amount") {
              if (fieldName === "name") {
                return (
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "5px",
                    }}
                  >
                    <Button
                      onClick={() => {
                        setOpenNProduct(true);
                      }}
                      sx={{
                        textTransform: "none",
                        backgroundColor: colors.blueAccent[700],
                        color: colors.grey[100],
                        fontSize: "16px",
                        height: "50px",
                        fontWeight: "500",
                        "&:hover": {
                          backgroundColor: colors.blueAccent[800],
                        },
                      }}
                    >
                      <AddCardOutlinedIcon />
                    </Button>
                    <Autocomplete
                      key={fieldName}
                      options={productData}
                      onKeyDown={(event) => {
                        if (event.key === 'Enter') {
                          addAnotherProduct();
                        }}}
                      value={
                        newRow.name
                          ? productData.find(
                              (option) => option.name === newRow.name
                            )
                          : null
                      }
                      getOptionLabel={(option) => option.name}
                      onChange={(event, newValue) => {
                        if (newValue) {
                          setNewRow((prevRow) => ({
                            ...prevRow,
                            name: newValue.name,
                            description: newValue.description,
                            price: newValue.selling_price.toString(),
                            qty: "1",
                          }));
                        } else {
                          setNewRow((prevRow) => ({
                            ...prevRow,
                            name: "",
                            description: "",
                            price: "",
                            qty: "",
                          }));
                        }
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Name"
                          color="secondary"
                          sx={{
                            width: "150px",
                          }}
                        />
                      )}
                    />
                  </Box>
                );
              } else {
                return (
                  <TextField
                    key={fieldName}
                    color="secondary"
                    onKeyDown={(event) => {
                      if (event.key === 'Enter') {
                        addAnotherProduct();
                      }}}
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
        <Box display="flex" justifyContent="space-between" py={1}>
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
            onClick={addAnotherProduct}
          >
            <AddIcon /> Add another product
          </Button>
          <Box display="flex" justifyContent="space-between" py={2}>
            <Box
              display="flex"
              justifyContent="space-between"
              minWidth="260px"
              py={2}
            >
              <Typography variant="h5" mr={1}>
                Total Amount :
              </Typography>
              <Typography variant="h5" mr={2}>
                LKR {totalAmount.toFixed(2)}
              </Typography>
            </Box>
            <TextField
              color="secondary"
              label="Paid Amount"
              sx={{ alignSelf: "flex-end", marginBottom: "6px" }}
              value={paidAmount}
              size="small"
              onChange={paidAmountChange}
            />
            <Box
              display="flex"
              justifyContent="space-between"
              minWidth="230px"
              ml={2}
              py={2}
            >
              <Typography variant="h5" mr={1}>
                Due Amount :
              </Typography>
              <Typography variant="h5">
                LKR {payableAmount.toFixed(2)}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{ display: "flex", justifyContent: "space-between", gap: "20px" }}
        >
          <TextField
            label="Notes"
            multiline
            rows={4}
            color="secondary"
            fullWidth
            sx={{ marginTop: "10px" }}
            value={notes}
            onChange={(event) => {
              setNotes(event.target.value);
            }}
          />
          <TextField
            label="Payment Instructions"
            multiline
            rows={4}
            color="secondary"
            fullWidth
            sx={{ marginTop: "10px" }}
            value={paymentInstructions}
            onChange={(event) => {
              setPaymentInstructions(event.target.value);
            }}
          />
        </Box>
        
        <Box
          mt={5}
          pb={4}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            gap: "100px",
          }}
        >
          <TextField
            fullWidth
            color="secondary"
            label="Add footer notes"
            value={footerNotes}
            onChange={(event) => {
              setFooterNotes(event.target.value);
            }}
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              gap: "10px",
            }}
          >
            <LoadingButton
              loading={printLoading}
              loadingPosition="end"
              endIcon={<FileCopyOutlinedIcon />}
              variant="contained"
              onClick={printEstimate}
              sx={{
                textTransform: "capitalize",
                color: colors.grey[100],
                backgroundColor: colors.blueAccent[700],
                "&:hover": {
                  backgroundColor: colors.blueAccent[600],
                },
              }}
            >
              Print
            </LoadingButton>
            <LoadingButton
              loading={saveLoading}
              loadingPosition="end"
              endIcon={<SaveIcon />}
              variant="contained"
              onClick={saveEstimate}
              sx={{
                textTransform: "capitalize",
                color: colors.grey[100],
                backgroundColor: colors.blueAccent[700],
                "&:hover": {
                  backgroundColor: colors.blueAccent[600],
                },
              }}
            >
              Save
            </LoadingButton>
            <LoadingButton
              loading={sendLoading}
              loadingPosition="end"
              endIcon={<SendIcon />}
              variant="contained"
              onClick={sendEstimate}
              sx={{
                textTransform: "capitalize",
                color: colors.grey[100],
                minWidth: "150px",
                backgroundColor: colors.blueAccent[700],
                "&:hover": {
                  backgroundColor: colors.blueAccent[600],
                },
              }}
            >
              Send estimate
            </LoadingButton>
          </Box>
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
                    type="number"
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
                    type="number"
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
                    type="number"
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
            <Button
              onClick={() => {
                setOpen(false);
              }}
              sx={{ color: colors.primary[100] }}
            >
              Close
            </Button>
            <Button onClick={saveEditedRow} sx={{ color: colors.primary[100] }}>
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>

      <React.Fragment>
        <Dialog
          open={openNProduct}
          keepMounted
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle fontSize={16}>{"Add Product & Service"}</DialogTitle>
          <Box width="400px">
            <Formik
              onSubmit={saveProduct}
              initialValues={productInitialValues}
              validationSchema={productSchema}
            >
              {({
                values,
                errors,
                touched,
                handleBlur,
                handleChange,
                handleSubmit,
                resetForm,
                isValid,
              }) => (
                <form onSubmit={handleSubmit}>
                  <DialogContent>
                    <Box
                      display="grid"
                      gap="30px"
                      gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                      sx={{
                        gap: isNonMobile ? "20px" : undefined,
                      }}
                    >
                      <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Name"
                        onBlur={handleBlur}
                        onChange={(event) => {
                          handleChange(event);
                          setProductNameEmpty(event.target.value.trim() === ""); // Access value property before calling trim
                        }}
                        value={values.name}
                        name="name"
                        error={!!touched.name && !!errors.name}
                        helperText={touched.name && errors.name}
                        sx={{
                          gridColumn: "span 4",
                          "& .MuiInputLabel-root.Mui-focused": {
                            color: colors.primary[100],
                          },
                        }}
                      />
                      <TextField
                        fullWidth
                        multiline
                        rows={7}
                        variant="filled"
                        type="text"
                        label="Description"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.description}
                        name="description"
                        sx={{
                          gridColumn: "span 4",
                          "& .MuiInputLabel-root.Mui-focused": {
                            color: colors.primary[100],
                          },
                        }}
                      />
                      <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Buying Price"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.buying_price}
                        name="buying_price"
                        sx={{
                          gridColumn: "span 4",
                          "& .MuiInputLabel-root.Mui-focused": {
                            color: colors.primary[100],
                          },
                        }}
                      />
                      <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Selling Price"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.selling_price}
                        name="selling_price"
                        sx={{
                          gridColumn: "span 4",
                          "& .MuiInputLabel-root.Mui-focused": {
                            color: colors.primary[100],
                          },
                        }}
                      />
                    </Box>
                  </DialogContent>
                  <DialogActions>
                    <Button
                      onClick={() => {
                        setOpenNProduct(false);
                      }}
                      sx={{ color: colors.primary[100] }}
                    >
                      Close
                    </Button>
                    <LoadingButton
                      loading={productLoading} // Pass loading state to LoadingButton
                      type="submit"
                      disabled={!isValid || productNameEmpty}
                      sx={{
                        textTransform: "capitalize", // Remove text transformation
                        backgroundColor: "transparent", // Remove background color
                        color: colors.primary[100],
                        fontSize: "inherit", // Inherit font size
                        fontWeight: "inherit", // Inherit font weight
                        padding: 0, // Remove padding
                        "&:hover": {
                          backgroundColor: "transparent", // Remove hover background color
                        },
                      }}
                    >
                      Submit
                    </LoadingButton>
                  </DialogActions>
                </form>
              )}
            </Formik>
          </Box>
        </Dialog>
      </React.Fragment>

      <React.Fragment>
        <Dialog
          open={openNCustomer}
          keepMounted
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle fontSize={16}>{"Add Customer"}</DialogTitle>
          <Box width="400px">
            <Formik
              onSubmit={saveCustomer}
              initialValues={customerInitialValues}
              validationSchema={customerSchema}
            >
              {({
                values,
                errors,
                touched,
                handleBlur,
                handleChange,
                handleSubmit,
                resetForm,
                isValid,
              }) => (
                <form onSubmit={handleSubmit}>
                  <DialogContent>
                    <Box
                      display="grid"
                      gap="30px"
                      gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                      sx={{
                        gap: isNonMobile ? "20px" : undefined,
                      }}
                    >
                      <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Customer Name"
                        onBlur={handleBlur}
                        onChange={(event) => {
                          handleChange(event);
                          setCustomerNameEmpty(
                            event.target.value.trim() === ""
                          ); // Access value property before calling trim
                        }}
                        value={values.name}
                        name="name"
                        error={!!touched.name && !!errors.name}
                        helperText={touched.name && errors.name}
                        sx={{
                          gridColumn: "span 4",
                          "& .MuiInputLabel-root.Mui-focused": {
                            color: colors.primary[100],
                          },
                        }}
                      />
                      <TextField
                        fullWidth
                        variant="filled"
                        type="email"
                        label="Email"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.email}
                        name="email"
                        sx={{
                          gridColumn: "span 4",
                          "& .MuiInputLabel-root.Mui-focused": {
                            color: colors.primary[100],
                          },
                        }}
                      />
                      <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Phone"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.mobile}
                        name="mobile"
                        error={!!touched.mobile && !!errors.mobile}
                        helperText={touched.mobile && errors.mobile}
                        sx={{
                          gridColumn: "span 4",
                          "& .MuiInputLabel-root.Mui-focused": {
                            color: colors.primary[100],
                          },
                        }}
                      />
                    </Box>
                  </DialogContent>
                  <DialogActions>
                    <Button
                      onClick={() => {
                        setOpenNCustomer(false);
                      }}
                      sx={{ color: colors.primary[100] }}
                    >
                      Close
                    </Button>
                    <LoadingButton
                      loading={customerLoading} // Pass loading state to LoadingButton
                      disabled={!isValid || customerNameEmpty}
                      type="submit"
                      sx={{
                        textTransform: "capitalize", // Remove text transformation
                        backgroundColor: "transparent", // Remove background color
                        color: colors.primary[100],
                        fontSize: "inherit", // Inherit font size
                        fontWeight: "inherit", // Inherit font weight
                        padding: 0, // Remove padding
                        "&:hover": {
                          backgroundColor: "transparent", // Remove hover background color
                        },
                      }}
                    >
                      Submit
                    </LoadingButton>
                  </DialogActions>
                </form>
              )}
            </Formik>
          </Box>
        </Dialog>
      </React.Fragment>
    </Box>
  );
};

export default New_Estimate;
