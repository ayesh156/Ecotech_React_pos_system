import * as React from "react";
import { useContext, useState } from "react"; // Add this import
import {
  Box,
  Button,
  IconButton,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
  InputAdornment,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import Header from "../../components/Header";
import { LoadingButton } from "@mui/lab";
import { ColorModeContext, tokens } from "../../theme.js";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Link } from "react-router-dom";

const initialValuesForgot = {
  nPassword: "",
  rPassword: "",
  code: "",
};

const initialValuesSignIn = {
  email: "",
  password: "",
};

const userSchemaIn = yup.object().shape({
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
});

const userSchemaForgot = yup.object().shape({
  nPassword: yup.string().required("required"),
  rPassword: yup.string().required("required"),
  code: yup.string().required("required"),
});

const SignIn = ({ onLogin }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [showPassword, setShowPassword] = useState(false);
  const [showRPassword, setShowRPassword] = useState(false);
  const [showNPassword, setShowNPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingForgot, setLoadingForgot] = useState(false);
  const [isLoadingPassword, setLoadingPassword] = useState(false);

  const sendVerificationCode = () => {
    setLoadingForgot(true); // Set loading state back to false when done

    setTimeout(() => {
      console.log("Send");
      setLoadingForgot(false); // Set loading state back to false when done
      setOpen(true);
    }, 1000); // Change the timeout value as needed
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleToggleNPassword = () => {
    setShowNPassword((prevShowNPassword) => !prevShowNPassword);
  };

  const handleToggleRPassword = () => {
    setShowRPassword((prevShowRPassword) => !prevShowRPassword);
  };

  const handleRememberMeChange = (event) => {
    const isChecked = event.target.checked; // Get the checked state from the event
    setRememberMe(isChecked); // Update the state variable
    console.log(isChecked); // Log the checked state
  };

  // Add state variable for loading button

  const handleFormSubmitSignIn = (values) => {
    // Set loading state to true when submitting
    setIsLoading(true);

    // Simulate an asynchronous action, like an API call
    setTimeout(() => {
      console.log(values);
      setIsLoading(false); // Set loading state back to false when done
      onLogin();
    }, 1000); // Change the timeout value as needed
  };

  const handleFormSubmitForgot = (values) => {
    // Set loading state to true when submitting

    setLoadingPassword(true);

    // Simulate an asynchronous action, like an API call
    setTimeout(() => {
      console.log(values);
      setLoadingPassword(false); // Set loading state back to false when done
      setOpen(false);
    }, 1000); // Change the timeout value as needed
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
      <React.Fragment>
        <Dialog
          open={open}
          keepMounted
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle fontSize={16}>{"Forgot Password"}</DialogTitle>
          <Formik
            onSubmit={handleFormSubmitForgot}
            initialValues={initialValuesForgot}
            validationSchema={userSchemaForgot}
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
                      sx={
                        isNonMobile
                          ? { display: "flex", gap: "20px" }
                          : undefined
                      }
                    >
                      <TextField
                        fullWidth
                        variant="filled"
                        label="New Password"
                        type={showNPassword ? "text" : "password"}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.nPassword}
                        name="nPassword"
                        error={!!touched.nPassword && !!errors.nPassword}
                        helperText={touched.nPassword && errors.nPassword}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                onClick={handleToggleNPassword}
                                edge="end"
                              >
                                {showNPassword ? (
                                  <VisibilityIcon />
                                ) : (
                                  <VisibilityOffIcon />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                        sx={{
                          "& .MuiInputLabel-root.Mui-focused": {
                            color: colors.primary[100], // Change focus color here
                          },
                        }}
                      />
                      <TextField
                        fullWidth
                        variant="filled"
                        label="Re-type Password"
                        type={showRPassword ? "text" : "password"}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.rPassword}
                        name="rPassword"
                        error={!!touched.rPassword && !!errors.rPassword}
                        helperText={touched.rPassword && errors.rPassword}
                        sx={{
                          marginTop: isNonMobile ? undefined : "20px",
                          "& .MuiInputLabel-root.Mui-focused": {
                            color: colors.primary[100], // Change focus color here
                          },
                        }}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                onClick={handleToggleRPassword}
                                edge="end"
                              >
                                {showRPassword ? (
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
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="Verification Code"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.code}
                      name="code"
                      error={!!touched.code && !!errors.code}
                      helperText={touched.code && errors.code}
                      sx={{
                        marginTop: "20px",
                        "& .MuiInputLabel-root.Mui-focused": {
                          color: colors.primary[100], // Change focus color here
                        },
                      }}
                    />
                  </Box>
                </DialogContent>
                <DialogActions>
                  <Button
                    onClick={handleClose}
                    sx={{ color: colors.primary[100] }}
                  >
                    Close
                  </Button>
                  <LoadingButton
                    loading={isLoadingPassword} // Pass loading state to LoadingButton
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
        </Dialog>
      </React.Fragment>
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
          <Header title="Welcome back!" />
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
          onSubmit={handleFormSubmitSignIn}
          initialValues={initialValuesSignIn}
          validationSchema={userSchemaIn}
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
              <Box>
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
              <Box
                mt="10px"
                sx={{
                  display: "flex",
                  justifyContent: isNonMobile ? "space-between" : "center",
                  alignItems: isNonMobile ? "center" : "flex-start",
                  flexDirection: isNonMobile ? "row" : "column",
                }}
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={rememberMe}
                      style={{
                        color: colors.primary[100],
                      }}
                      sx={{ "& .MuiSvgIcon-root": { fontSize: 18 } }}
                      onChange={handleRememberMeChange}
                    />
                  }
                  sx={{
                    color: colors.primary[100], // Replace 'customColor' with the color you desire
                  }}
                  label="Remember me"
                />
                <LoadingButton
                  loading={isLoadingForgot} // Pass loading state to LoadingButton
                  onClick={sendVerificationCode}
                  type="submit"
                  sx={{
                    textTransform: "none", // Remove text transformation
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
                  Forgot password?
                </LoadingButton>
              </Box>

              <Box display="flex" justifyContent="center" mt="10px">
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
                  Sign In
                </LoadingButton>
              </Box>
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                mt="15px"
                gap="10px"
              >
                <Typography variant="h5">Don't have an account</Typography>
                <Link
                  to="/signup"
                  style={{
                    color: colors.blueAccent[100],
                    fontSize: "16px",
                    textDecoration: "none",
                  }}
                  onMouseEnter={(e) =>
                    (e.target.style.color = colors.blueAccent[200])
                  } // Change color on hover
                  onMouseLeave={(e) =>
                    (e.target.style.color = colors.blueAccent[100])
                  } // Revert color when mouse leaves
                >
                  Sign Up
                </Link>
              </Box>
            </form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

export default SignIn;
