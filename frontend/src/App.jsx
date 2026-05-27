import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Welcome from "./pages/Welcome";
import Home from "./pages/Home";
import Interview from "./pages/Interview";
import DashboardPage from "./pages/DashboardPage";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Welcome />}
        />

        <Route
          path="/home"
          element={<Home />}
        />

        <Route
          path="/interview"
          element={<Interview />}
        />

        <Route
          path="/dashboard"
          element={<DashboardPage />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;