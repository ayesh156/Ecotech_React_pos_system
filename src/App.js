import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Product from "./scenes/product";
import NewProduct from "./scenes/new_product";
import EditProduct from "./scenes/edit_product";
import Invoices from "./scenes/invoices";
import PageNotFound from "./scenes/page_not_found";
import NewInvoice from "./scenes/new_invoice";
import EditInvoice from "./scenes/edit_invoice";
import Settings from "./scenes/settings";
import Calendar from "./scenes/calendar";
import { useState } from "react";
import Signin from "./scenes/signin";
import FAQ from "./scenes/faq";
import Bar from "./scenes/bar";
import Pie from "./scenes/pie";
import Line from "./scenes/line";
import Geography from "./scenes/geography";
import SignUp from "./scenes/signup";

function App() {
  const [theme, colorMode] = useMode();
  const [authenticated, setAuthenticated] = useState(true);

  const handleLogin = () => {
    // Toggle the authenticated state
    setAuthenticated((authenticated) => !authenticated);
  };

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {authenticated ? (
          <div className="app">
            <Sidebar onLogin={handleLogin} />
            <main className="content">
              <Topbar />
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/product-services" element={<Product />} />
                <Route path="/product-services/create-product-service" element={<NewProduct />} />
                <Route path="/product-services/:id/edit" element={<EditProduct />} />
                <Route path="/invoices" element={<Invoices />} />
                <Route path='/invoices/:id/edit' element={<EditInvoice />} />
                <Route path="/invoices/new_invoice" element={<NewInvoice />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/calendar" element={<Calendar />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/bar" element={<Bar />} />
                <Route path="/pie" element={<Pie />} />
                <Route path="/line" element={<Line />} />
                <Route path="/geography" element={<Geography />} />

                <Route path="*" element={<PageNotFound />} />
              </Routes>
            </main>
          </div>
        ) : (
          <Routes>
            <Route path="/" element={<Signin onLogin={handleLogin} />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        )}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
