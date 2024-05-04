import { useState } from "react"; // Make sure you import useState from react
import { Box, IconButton, TextField, useTheme, Typography } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import ClearIcon from '@mui/icons-material/Clear';
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { tokens } from "../../theme";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from '@mui/icons-material/Save';

const initialValues = {
  name: "",
  email: "",
  contact: "",
  address: "",
  image: null, // Add image field to initialValues
};

const phoneRegExp = /^[0]{1}[147]{1}[01245678]{1}[0-9]{7}$/;

const userSchema = yup.object().shape({
  name: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  contact: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("required"),
  address: yup.string().required("required"),
  image: yup.mixed().required("Please upload the company logo"), // Add validation for image
});

const Settings = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isNonMobile = useMediaQuery("(min-width:800px)");
  const [selectedImage, setSelectedImage] = useState(null); // Initialize selectedImage state
  const [fileName, setFileName] = useState("No selected file");
  const [isLoading, setIsLoading] = useState(false);

  const handleFormSubmit = (values, { resetForm }) => {
    const updatedValues = { ...values, image: selectedImage };

    setIsLoading(true);
    setTimeout(() => {
      console.log(updatedValues);

      // Reset form data
      setSelectedImage(null);
      setFileName("No selected file");

      resetForm();

      setIsLoading(false);
    }, 1000); // Change the timeout value as needed
  };

  const handleImageChange = (event, setFieldValue) => {
    const file = event.currentTarget.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFieldValue("image", reader.result); // Set image data as base64 string
        setSelectedImage(reader.result); // Set selected image for preview
        setFileName(file.name);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Box m="20px">
      <Header title="GENERAL SETTINGS" subtitle="Select your company default logo (225 x 225 pixels)" />

      <Formik
        onSubmit={handleFormSubmit}
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
          resetForm,
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
                <IconButton sx={{position: "absolute", top:-35, right: 35}} onClick={() => {
                    setFileName("No selected file");
                    setSelectedImage(null);
                  }}>
                  <ClearIcon sx={{ fontSize: "25px", color: colors.redAccent[500], fontWeight: "bold" }} />
                  </IconButton>)
                  : undefined}
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
                    onChange={(event) =>
                      handleImageChange(event, setFieldValue)
                    }
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
              <LoadingButton
              loading={isLoading}
              loadingPosition="end"
              endIcon={<SaveIcon />}
              variant="contained"
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
