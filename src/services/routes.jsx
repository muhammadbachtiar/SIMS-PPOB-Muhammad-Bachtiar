import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import PublicRoutes from "./utils/PublicRoutes";
import PrivateRoutes from "./utils/PrivateRoutes";
import UnautorizedLayout from "../layout/unauthorizedLayout";
import AuthorizedLayout from "../layout/authorizedLayout";

const Routers = () => {
  return (
    <Router>
      <Routes>
        <Route element={<PublicRoutes />}>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<UnautorizedLayout />} />
            <Route path="/register" element={<UnautorizedLayout />} />
        </Route>
        <Route element={<PrivateRoutes />}> 
          <Route path="/dashboard" element={<AuthorizedLayout />} />
          <Route path="/topup" element={<AuthorizedLayout />} />
          <Route path="/transaction" element={<AuthorizedLayout />} />
          <Route path="/transaction/:type" element={<AuthorizedLayout />} />
          <Route path="/account" element={<AuthorizedLayout />} />
        </Route>

        {/* <Route path="*" element={<NotFound/>} />
        <Route path="/not-found" element={<NotFound/>} />
        <Route path="/split-bill/detail/shared/:id" element={<SplitBillDetailShared/>} /> */}
      </Routes>
    </Router>
  );
};

export default Routers;
