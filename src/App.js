import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Product from "./scenes/product";
import NewProduct from "./scenes/new_product";
import EditProduct from "./scenes/edit_product";
import Customer from "./scenes/customers";
import NewCustomer from "./scenes/new_customer";
import EditCustomer from "./scenes/edit_customer";
import Invoices from "./scenes/invoices";
import JobNotes from "./scenes/job_notes";
import NewJobNote from "./scenes/new_job_note";
import EditJobNote from "./scenes/edit_job_note";
import JobOrders from "./scenes/job_orders";
import NewJobOrder from "./scenes/new_job_order";
import EditJobOrder from "./scenes/edit_job_order";
import Estimates from "./scenes/estimates";
import NewEstimate from "./scenes/new_estimate";
import EditEstimate from "./scenes/edit_estimate";
import PageNotFound from "./scenes/page_not_found";
import NewInvoice from "./scenes/new_invoice";
import EditInvoice from "./scenes/edit_invoice";
import Settings from "./scenes/settings";
import Profile from "./scenes/profile";
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
                <Route path="/customers" element={<Customer />} />
                <Route path="/customers/create-customer" element={<NewCustomer />} />
                <Route path="/customers/:id/edit" element={<EditCustomer />} />
                <Route path="/invoices" element={<Invoices />} />
                <Route path="/invoices/create-invoice" element={<NewInvoice />} />
                <Route path='/invoices/:id/edit' element={<EditInvoice />} />
                <Route path="/estimates" element={<Estimates />} />
                <Route path="/estimates/create-estimate" element={<NewEstimate />} />
                <Route path="/estimates/:id/edit" element={<EditEstimate />} />
                <Route path="/job-notes" element={<JobNotes />} />
                <Route path="/job-notes/create-job-note" element={<NewJobNote />} />
                <Route path="/job-notes/:id/edit" element={<EditJobNote />} />
                <Route path="/job-orders" element={<JobOrders />} />
                <Route path="/job-orders/create-job-order" element={<NewJobOrder />} />
                <Route path="/job-orders/:id/edit" element={<EditJobOrder />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/profile" element={<Profile />} />
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
