import * as React from "react";
import { useContext, useState } from "react"; // Add this import
import {
  Box,
  IconButton,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
  InputAdornment,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import Header from "../../components/Header.jsx";
import { LoadingButton } from "@mui/lab";
import { ColorModeContext, tokens } from "../../theme.js";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Link } from "react-router-dom";

const initialValuesSignUp = {
  firstName: "",
  lastName: "",
  email: "",
  contact: "",
  password: "",
};

const phoneRegExp = /^[0]{1}[147]{1}[01245678]{1}[0-9]{7}$/;

const userSchemaUp = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
  contact: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("required"),
});

const SignUp = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleFormSubmitSignUp = (values) => {
    // Set loading state to true when submitting
    setIsLoading(true);

    // Simulate an asynchronous action, like an API call
    setTimeout(() => {
      console.log(values);
      setIsLoading(false); // Set loading state back to false when done
      handleSignUpClick();
    }, 1000); // Change the timeout value as needed

    console.log(values);
  };

  const handleSignUpClick = () => {
    window.history.back();
  };

  return (
    <Box
      sx={{
        backgroundImage: 'url("../../assets/signin.jpg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        // Add other styles as needed
      }}
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="100vh" // Optionally, if you want to center vertically
    >
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        sx={{
          backgroundColor:
            theme.palette.mode === "dark" ? "rgba(0, 0, 0, 0.7)" : undefined,
        }}
      />
      <Box
        p="50px"
        sx={{
          background: "rgba(255, 255, 255, 0.1)",
          borderRadius: "10px",
          backdropFilter: "blur(5px)",
          boxShadow: "0 25px 45px rgba(0, 0, 0, 0.1)",
          border: "1px solid rgba(255, 255, 255, 0.5",
          borderRight: "1px solid rgba(255, 255, 255, 0.2",
          borderBottom: "1px solid rgba(255, 255, 255, 0.2",
        }}
      >
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          mt="10px"
        >
          <Header title="Let’s get started" />
          <Box position="absolute" top={0} right={0}>
            <IconButton onClick={colorMode.toggleColorMode}>
              {theme.palette.mode === "dark" ? (
                <LightModeOutlinedIcon />
              ) : (
                <DarkModeOutlinedIcon />
              )}
            </IconButton>
          </Box>
        </Box>
        <Formik
          onSubmit={handleFormSubmitSignUp}
          initialValues={initialValuesSignUp}
          validationSchema={userSchemaUp}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
          }) => (
            <form onSubmit={handleSubmit}>
              <Box maxWidth="400px">
                <Box
                  sx={
                    isNonMobile ? { display: "flex", gap: "20px" } : undefined
                  }
                >
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="First Name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.firstName}
                    name="firstName"
                    error={!!touched.firstName && !!errors.firstName}
                    helperText={touched.firstName && errors.firstName}
                    sx={{
                      "& .MuiInputLabel-root.Mui-focused": {
                        color: colors.primary[100], // Change focus color here
                      },
                    }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Last Name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.lastName}
                    name="lastName"
                    error={!!touched.lastName && !!errors.lastName}
                    helperText={touched.lastName && errors.lastName}
                    sx={{
                      marginTop: isNonMobile ? undefined : "20px",
                      "& .MuiInputLabel-root.Mui-focused": {
                        color: colors.primary[100], // Change focus color here
                      },
                    }}
                  />
                </Box>
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.email}
                  name="email"
                  error={!!touched.email && !!errors.email}
                  helperText={touched.email && errors.email}
                  sx={{
                    marginTop: "20px",
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: colors.primary[100], // Change focus color here
                    },
                  }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Phone number"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.contact}
                  name="contact"
                  error={!!touched.contact && !!errors.contact}
                  helperText={touched.contact && errors.contact}
                  sx={{
                    marginTop: "20px",
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: colors.primary[100], // Change focus color here
                    },
                  }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type={showPassword ? "password" : "text"}
                  label="Password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.password}
                  name="password"
                  error={!!touched.password && !!errors.password}
                  helperText={touched.password && errors.password}
                  sx={{
                    marginTop: "20px",
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: colors.primary[100], // Change focus color here
                    },
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={handleTogglePassword} edge="end">
                          {showPassword ? (
                            <VisibilityIcon />
                          ) : (
                            <VisibilityOffIcon />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
              <Box display="flex" justifyContent="center" mt="20px">
                <LoadingButton
                  loading={isLoading} // Pass loading state to LoadingButton
                  loadingPosition="start"
                  type="submit"
                  fullWidth
                  sx={{
                    textTransform: "capitalize",
                    backgroundColor: colors.blueAccent[700],
                    color: colors.grey[100],
                    fontSize: "17px",
                    fontWeight: "500",
                    paddingY: "10px",
                    "&:hover": {
                      backgroundColor: colors.blueAccent[800],
                    },
                  }}
                >
                  Sign Up
                </LoadingButton>
              </Box>
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                mt="15px"
                gap="10px"
              >
                <Typography variant="h5">Already have an account?</Typography>
                <Link
                  to="/" // Replace '/special-page' with your actual route
                  color={colors.primary[100]}
                  style={{ color: colors.blueAccent[100], fontSize: "16px", textDecoration: 'none' }}
                  onMouseEnter={(e) => (e.target.style.color = colors.blueAccent[200])} // Change color on hover
                  onMouseLeave={(e) => (e.target.style.color = colors.blueAccent[100])} // Revert color when mouse leaves
                >
                  Sign In
                </Link>
              </Box>
            </form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

export default SignUp;
