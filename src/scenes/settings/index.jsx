import { useState, useEffect, useCallback } from "react";
import {
  Box,
  IconButton,
  TextField,
  useTheme,
  Typography,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import ClearIcon from "@mui/icons-material/Clear";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { tokens } from "../../theme";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";
import Loader from "../../components/Loader";
import { U_EMAIL, BASE_URL } from "../../config";
import axios from "axios";
import PageNotFound from "../page_not_found";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const phoneRegExp = /^[0]{1}[147]{1}[01245678]{1}[0-9]{7}$/;

const userSchema = yup.object().shape({
  name: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  contact: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("required"),
  address: yup.string().required("required"),
  image: yup.mixed().required("Please upload the company logo"),
});

const Settings = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isNonMobile = useMediaQuery("(min-width:800px)");
  const [selectedImage, setSelectedImage] = useState(null);
  const [fileName, setFileName] = useState("No selected file");
  const [isLoading, setIsLoading] = useState(false);
  const [resultFound, setResultFound] = useState(false);
  const [toastDisplayed, setMsgDisplayed] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const [toastMsg2, setToastMsg2] = useState("");
  const [initialValuesSet, setInitialValuesSet] = useState(false);
  const [notes, setNotes] = useState("");
  const [paymentInstructions, setPaymentInstructions] = useState("");
  const [footerNotes, setFooterNotes] = useState("");
  const [initialValues, setInitialValues] = useState({
    name: "",
    email: "",
    contact: "",
    address: "",
    image: null,
  });

  const getFileNameFromPath = (path) => {
    const pathSegments = path.split("/");
    return pathSegments[pathSegments.length - 1];
  };

  const fetchSettings = useCallback(() => {
    axios
      .get(`${BASE_URL}/system-api/settings?email=${U_EMAIL}`)
      .then((response) => {
        if (response.data.status === 1) {
          const userData = response.data.settings;
          setInitialValues(userData);
          setFooterNotes(userData.footerNotes);
          setPaymentInstructions(userData.paymentInstructions);
          setNotes(userData.notes);
          setSelectedImage(
            userData.image === "" ? userData.image : "../../" + userData.image
          );
          setFileName(
            userData.image === ""
              ? "No selected file"
              : getFileNameFromPath("../../" + userData.image)
          );
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
  }, []);

  useEffect(() => {
    if (!initialValuesSet) {
      fetchSettings();
    }
  }, [initialValuesSet, fetchSettings]);

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

  const saveSettings = (values, { resetForm }) => {
    const updatedValues = { ...values, notes, paymentInstructions, footerNotes, image: selectedImage };
    // console.log(updatedValues);
    setIsLoading(true);
    axios
      .put(`${BASE_URL}/system-api/settings?email=${U_EMAIL}`, updatedValues)
      .then((response) => {
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
          setToastMsg2(response.data.message);
        }
      })
      .catch((error) => {
        setToastMsg2(error);
      })
      .finally(function () {
        setIsLoading(false);
      });

    if (toastMsg2 !== "") {
      toast.error(toastMsg2, {
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

  const selectImage = (event, setFieldValue) => {
    const file = event.currentTarget.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFieldValue("image", reader.result);
        setSelectedImage(reader.result);
        setFileName(file.name);
      };
      reader.readAsDataURL(file);
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
      <Header
        title="Company Settings"
        subtitle="Select your company default logo (225 x 225 pixels)"
      />

      <Formik
        onSubmit={saveSettings}
        initialValues={initialValues}
        validationSchema={userSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
          setFieldValue,
          isValid,
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
              <Box
                sx={{
                  gridColumn: "span 4",
                  position: "relative",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {selectedImage ? (
                  <IconButton
                    sx={{ position: "absolute", top: -35, right: 35 }}
                    onClick={() => {
                      setFileName("No selected file");
                      setSelectedImage(null);
                    }}
                  >
                    <ClearIcon
                      sx={{
                        fontSize: "25px",
                        color: colors.redAccent[500],
                        fontWeight: "bold",
                      }}
                    />
                  </IconButton>
                ) : undefined}
                <Box
                  className="image-area"
                  style={{
                    border: `2px dashed ${colors.blueAccent[500]}`,
                    width: "30vw",
                  }}
                  onClick={() => document.querySelector(".input-field").click()}
                >
                  <input
                    type="file"
                    accept="image/*"
                    className="input-field"
                    hidden
                    onChange={(event) => selectImage(event, setFieldValue)}
                  />
                  {selectedImage ? (
                    <img src={selectedImage} height={230} alt={fileName} />
                  ) : (
                    <>
                      <CloudUploadIcon
                        sx={{ fontSize: "60px", color: colors.blueAccent[500] }}
                      />
                      <Typography
                        variant="h5"
                        sx={{ fontWeight: "bold" }}
                        color={colors.grey[400]}
                      >
                        Browse logo to upload
                      </Typography>
                      <Typography
                        sx={{ marginTop: "15px" }}
                        variant="h6"
                        color={colors.grey[400]}
                      >
                        Maximum file size : 5MB
                      </Typography>
                      <Typography variant="h6" color={colors.grey[400]}>
                        JPG or PNG formats{" "}
                      </Typography>
                      <Typography variant="h56" color={colors.grey[400]}>
                        Recommended size 225x225 pixels
                      </Typography>
                      {touched.image && errors.image && (
                        <Typography variant="body2" color="error">
                          {errors.image}
                        </Typography>
                      )}
                    </>
                  )}
                </Box>
              </Box>
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Company Name"
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
                variant="filled"
                type="text"
                label="Company Address"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.address}
                name="address"
                error={!!touched.address && !!errors.address}
                helperText={touched.address && errors.address}
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
                label="Company Email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name="email"
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email}
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
                label="Company Contact Number"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.contact}
                name="contact"
                error={!!touched.contact && !!errors.contact}
                helperText={touched.contact && errors.contact}
                sx={{
                  gridColumn: "span 4",
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: colors.primary[100],
                  },
                }}
              />
              <TextField
                label="Notes"
                multiline
                rows={4}
                fullWidth
                color="secondary"
                onChange={(event) => {
                  setNotes(event.target.value);
                }}
                value={notes}
                sx={{ gridColumn: "span 4", }}
              />
              <TextField
                label="Payment Instructions"
                multiline
                rows={4}
                fullWidth
                color="secondary"
                onChange={(event) => {
                  setPaymentInstructions(event.target.value);
                }}
                value={paymentInstructions}
                sx={{ gridColumn: "span 4", }}
              />
              <TextField
                label="Footer notes"
                multiline
                rows={4}
                fullWidth
                color="secondary"
                onChange={(event) => {
                  setFooterNotes(event.target.value);
                }}
                value={footerNotes}
                sx={{ gridColumn: "span 4", }}
              />
              <LoadingButton
                loading={isLoading}
                loadingPosition="end"
                endIcon={<SaveIcon />}
                variant="contained"
                disabled={
                  !isValid ||
                  (!values.email && touched.email) ||
                  (!values.contact && touched.contact)
                }
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
                Save all changes
              </LoadingButton>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default Settings;
