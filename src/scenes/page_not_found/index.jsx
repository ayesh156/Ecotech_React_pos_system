import { Box, useTheme, Typography } from "@mui/material";
import { tokens } from "../../theme";

const Page_Not_Found = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box mb="30px" sx={{display: "flex", alignItems: "center", justifyContent: "center", height: "80vh"}}>
        <Box sx={{textAlign: "center"}}>
      <Typography
        variant="h1"
        color={colors.grey[100]}
        fontWeight="bold"
        sx={{ mb: "5px" }}
        textTransform={"capitalize"}
      >
        404
      </Typography>
      <Typography variant="h2" fontWeight="bold" color={colors.greenAccent[400]}>
        Page Not Found
      </Typography>
      </Box>
    </Box>
  );
};

export default Page_Not_Found;
