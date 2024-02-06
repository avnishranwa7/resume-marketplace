import { FC, ReactElement, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRoute: FC<{ children: ReactElement }> = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("auth")) navigate("/login", { replace: true });
  }, [navigate]);

  return !localStorage.getItem("auth") ? null : children;
};

export default ProtectedRoute;
