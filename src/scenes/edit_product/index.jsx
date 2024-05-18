import { useState, useEffect, useCallback } from "react"; // Make sure you import useState from react
import { Box, TextField, useTheme, Typography, Button } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useNavigate, useParams } from "react-router-dom";
import KeyboardArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardArrowLeftOutlined";
import { tokens } from "../../theme";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";
import Loader from "../../components/Loader";
import PageNotFound from "../page_not_found";
import axios from "axios";
import { BASE_URL, U_EMAIL } from "../../config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const productSchema = yup.object().shape({
  name: yup.string().required("required"),
});

const Edit_Product = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isNonMobile = useMediaQuery("(min-width:800px)");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [initialValuesSet, setInitialValuesSet] = useState(false);
  const [resultFound, setResultFound] = useState(false);
  const [toastDisplayed, setMsgDisplayed] = useState(false);
  const [toastMsg, setToastMsg] = useState("");

  const { id } = useParams();

  // Initial values state
  const [initialValues, setInitialValues] = useState({
    name: "",
    description: "",
    buying_price: "",
    selling_price: "",
  });

  const fetchProduct = useCallback(() => {
    axios
      .get(`${BASE_URL}/system-api/product?id=${id}&email=${U_EMAIL}`)
      .then((response) => {
        if (response.data.status === 1) {
          const userData = response.data.product;
          setInitialValues({
            name: userData.name,
            description: userData.description,
            buying_price: userData.buying_price,
            selling_price: userData.selling_price,
          });
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
      fetchProduct();
    }
  }, [initialValuesSet, fetchProduct]); // useEffect will run whenever initialValuesSet changes

  useEffect(() => {
    if (setResultFound && !toastDisplayed && toastMsg) {
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
  }, [setResultFound, toastDisplayed, toastMsg, theme.palette.mode]);

  const updateProduct = (values) => {
    const updatedValues = { ...values};

    setIsLoading(true);

    axios
      .put(`${BASE_URL}/system-api/product?id=${id}&email=${U_EMAIL}`, updatedValues)
      .then((response) => {
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
    return <PageNotFound />;
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
          Edit Product & Service
        </Typography>
      </Button>
      <Formik
        onSubmit={updateProduct}
        initialValues={initialValues}
        validationSchema={productSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
          isValid
        }) => (
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
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.name}
                name="name"
                error={!!touched.name && !!errors.name}
                helperText={touched.name && errors.name}
                sx={{
                  gridColumn: "span 4",
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: colors.primary[100],
                  },
                  marginTop: "20px",
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

export default Edit_Product;
