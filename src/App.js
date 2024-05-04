import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Team from "./scenes/team";
import Invoices from "./scenes/invoices";
import Contacts from "./scenes/contacts";
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
                <Route path="/team" element={<Team />} />
                <Route path="/contacts" element={<Contacts />} />
                <Route path="/invoices" element={<Invoices />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/calendar" element={<Calendar />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/bar" element={<Bar />} />
                <Route path="/pie" element={<Pie />} />
                <Route path="/line" element={<Line />} />
                <Route path="/geography" element={<Geography />} />
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
