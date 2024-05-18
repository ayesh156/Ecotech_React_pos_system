import { useState, useEffect, useCallback } from "react"; // Make sure you import useState from react
import { Box, TextField, useTheme, Typography, Button } from "@mui/material";
import { Formik } from "formik";
import useMediaQuery from "@mui/material/useMediaQuery";
import * as yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import KeyboardArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardArrowLeftOutlined";
import { tokens } from "../../theme";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Loader from "../../components/Loader";
import PageNotFound from "../page_not_found";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BASE_URL, U_EMAIL } from "../../config";

const initialFormValues = {
  name: "",
  email: "",
  mobile: "",
  address1: "",
  address2: "",
  city: "",
  postal: "",
  province: "",
  instructions: "",
  account: "",
  fax: "",
  telephone: "",
  website: "",
  notes: "",
};

const phoneRegExp = /^[0]{1}[1245678]{1}[01245678]{1}[0-9]{7}$/;

const customerSchema = yup.object().shape({
  name: yup.string().required("required"),
  mobile: yup.string().matches(phoneRegExp, 'Phone number is not valid'),
  telephone: yup.string().matches(phoneRegExp, 'Phone number is not valid')
});


const Edit_Customer = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isNonMobile = useMediaQuery("(min-width:800px)");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [selectedProvince, setSelectedProvince] = useState(1);
  const [toastDisplayed, setMsgDisplayed] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const [provinces, setProvinces] = useState([]);
  const { id } = useParams(); // Get the id from the URL params
  const [initialValuesSet, setInitialValuesSet] = useState(false);
  const [resultFound, setResultFound] = useState(false);

  const setInitialFormValues = (customer) => {
    // Set initial form values with customer data
    initialFormValues.name = customer.name;
    initialFormValues.email = customer.email;
    initialFormValues.mobile = customer.mobile;
    initialFormValues.address1 = customer.address1;
    initialFormValues.address2 = customer.address2;
    initialFormValues.city = customer.city;
    initialFormValues.postal = customer.postal;
    setSelectedProvince(customer.province);
    initialFormValues.instructions = customer.instructions;
    initialFormValues.account = customer.account;
    initialFormValues.fax = customer.fax;
    initialFormValues.telephone = customer.telephone;
    initialFormValues.website = customer.website;
    initialFormValues.notes = customer.notes;
  };

  const fetchProvince = useCallback(() => {
    axios
      .get(`${BASE_URL}/system-api/getProvinces`)
      .then(function (response) {
        if (response.data.status === 1) {
          setProvinces(response.data.province);
        } else {
          setToastMsg(response.data.message);
          setResultFound(false);
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

  const fetchCustomer = useCallback(() => {
    axios
      .get(`${BASE_URL}/system-api/customer?id=${id}&email=${U_EMAIL}`)
      .then((response) => {
        if (response.data.status === 1) {
          const userData = response.data.customer;
          setInitialFormValues(userData);
          setResultFound(true);
          setMsgDisplayed(true);
        } else {
          setResultFound(false);
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
  }, [id]);

  useEffect(() => {
    if (!initialValuesSet) {
      fetchProvince();
      fetchCustomer();
    }
  }, [initialValuesSet, fetchProvince, fetchCustomer]);

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

  const updateCustomer = (values) => {
    const updatedValues = {
      ...values,
      province: parseInt(selectedProvince), // Include selected province in the saved object
    };

    setIsLoading(true);

    axios
      .put(`${BASE_URL}/system-api/customer?id=${id}&email=${U_EMAIL}`, updatedValues)
      .then((response) => {
        console.log(response.data);
        if ((response.data.status === 1)) {
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
        }else {
          setToastMsg(response.data.message);
        }
      })
      .catch((error) => {
        setToastMsg(error);
      })
      .finally(function () {
        setIsLoading(false);
      });

      if(toastMsg){
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
  } else if (!resultFound) {
    return (
      <>
        <ToastContainer />
        <PageNotFound />
      </>
    );
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
          Edit Customer
        </Typography>
      </Button>
      <Formik
        onSubmit={updateCustomer} // Pass values to saveCustomer function
        initialValues={initialFormValues}
        validationSchema={customerSchema}
      >
        {({ values,errors,
          touched, handleBlur, handleChange, handleSubmit, isValid }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                gridColumn: "span 4",
                marginX: isNonMobile ? "20vw" : undefined,
              }}
            >
              <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                Contact
              </Typography>
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Name"
                onBlur={handleBlur}
                onChange={handleChange}
                name="name"
                value={values.name}
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
                type="text"
                label="Email"
                onBlur={handleBlur}
                onChange={handleChange}
                name="email"
                value={values.email}
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
                name="mobile"
                value={values.mobile}
                error={!!touched.mobile && !!errors.mobile}
                helperText={touched.mobile && errors.mobile}
                sx={{
                  gridColumn: "span 4",
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: colors.primary[100],
                  },
                }}
              />
              <Box sx={{ gridColumn: "span 4" }}>
                <Divider />
              </Box>
              <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                Billing
              </Typography>
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Address line 1"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.address1}
                name="address1"
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
                label="Address line 2"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.address2}
                name="address2"
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
                label="City"
                onBlur={handleBlur}
                onChange={handleChange}
                name="city"
                value={values.city}
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
                label="Postal/Zip code"
                onBlur={handleBlur}
                onChange={handleChange}
                name="postal"
                value={values.postal}
                sx={{
                  gridColumn: "span 4",
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: colors.primary[100],
                  },
                }}
              />
              <FormControl
                variant="filled"
                color="secondary"
                fullWidth
                sx={{
                  gridColumn: "span 4",
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: colors.primary[100],
                  },
                }}
              >
                <InputLabel id="demo-select-small-label">Province</InputLabel>
                <Select
                  labelId="demo-select-small-label"
                  id="demo-select-small"
                  value={selectedProvince}
                  label="Province"
                  onChange={(e) => setSelectedProvince(e.target.value)}
                >
                  {provinces.map((province) => (
                    <MenuItem key={province.id} value={province.id}>
                      {province.name} Province
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                fullWidth
                rows={7}
                multiline
                variant="filled"
                type="text"
                label="Delivery instructions"
                onBlur={handleBlur}
                onChange={handleChange}
                name="instructions"
                value={values.instructions}
                sx={{
                  gridColumn: "span 4",
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: colors.primary[100],
                  },
                }}
              />
              <Box sx={{ gridColumn: "span 4" }}>
                <Divider />
              </Box>

              <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                Other
              </Typography>
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Account number"
                onBlur={handleBlur}
                onChange={handleChange}
                name="account"
                value={values.account}
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
                label="Fax"
                onBlur={handleBlur}
                onChange={handleChange}
                name="fax"
                value={values.fax}
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
                label="Telephone"
                onBlur={handleBlur}
                onChange={handleChange}
                name="telephone"
                value={values.telephone}
                error={!!touched.telephone && !!errors.telephone}
                helperText={touched.telephone && errors.telephone}
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
                label="Website"
                onBlur={handleBlur}
                onChange={handleChange}
                name="website"
                value={values.website}
                sx={{
                  gridColumn: "span 4",
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: colors.primary[100],
                  },
                }}
              />
              <TextField
                fullWidth
                rows={7}
                multiline
                variant="filled"
                type="text"
                label="Internal notes"
                onBlur={handleBlur}
                onChange={handleChange}
                name="notes"
                value={values.notes}
                sx={{
                  gridColumn: "span 4",
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: colors.primary[100],
                  },
                }}
              />
              <LoadingButton
                loading={isLoading}
                loadingPosition="end"
                endIcon={<SaveIcon />}
                variant="contained"
                disabled={!isValid || (!values.name && touched.name)}
                type="submit"
                sx={{
                  gridColumn: "span 4",
                  marginTop: "15px",
                  textTransform: "capitalize",
                  color: colors.grey[100],
                  fontSize: "17px",
                  fontWeight: "500",
                  paddingY: "10px",
                  backgroundColor: colors.blueAccent[700],
                  "&:hover": {
                    backgroundColor: colors.blueAccent[600],
                  },
                }}
              >
                Save
              </LoadingButton>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default Edit_Customer;
