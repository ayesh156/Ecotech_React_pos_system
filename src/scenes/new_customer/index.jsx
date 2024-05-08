import { useState } from "react"; // Make sure you import useState from react
import { Box, TextField, useTheme, Typography, Button } from "@mui/material";
import { Formik } from "formik";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useNavigate } from "react-router-dom";
import KeyboardArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardArrowLeftOutlined";
import { tokens } from "../../theme";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { sriLankaProvinces } from "../../data/mockData";

const initialFormValues = {
  name: "",
  email: "",
  contact: "",
  address1: "",
  address2: "",
  city: "",
  postal: "",
  province: "", // Make sure this matches the initial value of your Select component
  instructions: "",
  account: "",
  fax: "",
  mobile: "",
  website: "",
  notes: "",
};

const New_Product = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isNonMobile = useMediaQuery("(min-width:800px)");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [selectedProvince, setSelectedProvince] = useState("");

  const saveCustomer = (values, { resetForm }) => {
    const updatedValues = {
      ...values,
      province: selectedProvince, // Include selected province in the saved object
    };
   
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      console.log(updatedValues); // Log all form values
      resetForm();
      setSelectedProvince("");
    }, 1000);
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
          New Customer
        </Typography>
      </Button>
      <Formik
        onSubmit={saveCustomer} // Pass values to saveCustomer function
        initialValues={initialFormValues}
      >
        {({ values,handleBlur, handleChange, handleSubmit, resetForm }) => (
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
                name="contact"
                value={values.contact}
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
                  {sriLankaProvinces.map((province) => (
                    <MenuItem key={province} value={province}>
                      {province} Province
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
                label="Mobile"
                onBlur={handleBlur}
                onChange={handleChange}
                name="mobile"
                value={values.mobile}
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
