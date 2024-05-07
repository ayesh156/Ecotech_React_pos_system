import { useState } from "react"; // Make sure you import useState from react
import { Box, TextField, useTheme, Typography, Button } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useNavigate } from "react-router-dom";
import KeyboardArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardArrowLeftOutlined";
import { tokens } from "../../theme";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";

const initialValues = {
  name: "",
  description: "",
  price: "",
};

const userSchema = yup.object().shape({
  name: yup.string().required("required"),
  description: yup.string().required("required"),
  price: yup
    .number()
    .required("Price is required")
    .typeError("Price  is not valid"),
});

const New_Product = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isNonMobile = useMediaQuery("(min-width:800px)");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const saveProduct = (values, { resetForm }) => {
    const updatedValues = { ...values };

    setIsLoading(true);
    setTimeout(() => {
      console.log(updatedValues);

      resetForm();

      setIsLoading(false);
    }, 1000); // Change the timeout value as needed
  };

  return (
    <Box m="20px">
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
          New Product & Service
        </Typography>
      </Button>
      <Formik
        onSubmit={saveProduct}
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
                error={!!touched.description && !!errors.description}
                helperText={touched.description && errors.description}
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
                label="Price"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.price}
                name="price"
                error={!!touched.price && !!errors.price}
                helperText={touched.price && errors.price}
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
                Save
              </LoadingButton>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default New_Product;
