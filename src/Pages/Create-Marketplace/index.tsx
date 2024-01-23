import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// local imports
import { RootState } from "../../redux";
import { useEffect } from "react";

const CreateMarketplace = () => {
  const isLoggedIn = useSelector((state: RootState) => state.auth.logged_in);

  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) navigate("/login");
  }, [isLoggedIn, navigate]);

  return <></>;
};

export default CreateMarketplace;
