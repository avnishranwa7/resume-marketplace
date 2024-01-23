import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

// local imports
import { AuthService } from "../../services/auth";

const CompleteVerification = () => {
  const params = useLocation().search;
  const token = params.split("?")[1].substring(6);
  const email = params.split("?")[2].substring(6);

  const navigate = useNavigate();

  useEffect(() => {
    AuthService.completeVerification(email, token)
      .then(async (res) => {
        if (res.status !== 200) {
          const data = await res.json();
          throw data;
        }
      })
      .then(() => {
        navigate("/login?success=Email Verified");
      })
      .catch((err) => {
        navigate(`/login?error=${err.message}`);
      });
  }, [email, token, navigate]);

  return <></>;
};

export default CompleteVerification;
