
import { Navigate } from "react-router-dom";
import Home from "./Home";

// This component just redirects to the Home page
const Index = () => {
  return <Navigate to="/" replace />;
};

export default Index;
