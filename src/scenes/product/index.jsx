import { Box, Button, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataProduct } from "../../data/mockData";
import Header from "../../components/Header";
import { Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";

const Product = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "name",
      headerName: "Name",
      flex: 4,
      cellClassName: "name-column--cell",
    },
    {
      field: "price",
      headerName: "Price (Rs.)",
      type: "number",
      flex: 1,
    },
    {
      field: "edit",
      headerName: "Edit",
      flex: 0.3,
      renderCell: (params) => (
        <Link to={`${params.row.id}/edit`}>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <EditIcon style={{ color: colors.blueAccent[500] }} />
          </Box>
        </Link>
      ),
    },
  ];

  return (
    <Box m="20px">
      <Box
        sx={{ display: "flex", justifyContent: "space-between", gap: "100px" }}
      >
      <Header title="Product & Services" subtitle="Empowering Your Needs, Delivering Exceptional Solutions" />
      <Link to={"/product-services/create-product-service"}>
          <Button
            sx={{
              textTransform: "none",
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "17px",
              paddingX: "25px",
              height: "50px",
              fontWeight: "500",
              "&:hover": {
                backgroundColor: colors.blueAccent[800],
              },
            }}
          >
            Add Product or service
          </Button>
        </Link>
      </Box>
      <Box
        m="40px 0 0 0"
        height="75vh"
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
          }
        }}
      >
        <DataGrid rows={mockDataProduct} columns={columns} />
      </Box>
    </Box>
  );
};

export default Product;
