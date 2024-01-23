import { useState } from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { Button } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

// local imports
import Email from "../../assets/email.png";
import { AuthService } from "../../services/auth";

enum MailStatus {
  Failed = -1,
  ToBeSent = 0,
  Sending = 1,
  Delivered = 2,
}

const Verification = () => {
  const [mailDelivered, setMailDelivered] = useState(MailStatus.ToBeSent);
  const params = useLocation().search;

  async function verifyEmail() {
    setMailDelivered(MailStatus.Sending);

    const email = params.split("email")[1].substring(1);
    const response = await AuthService.verify(email);

    if (response.status === 200) setMailDelivered(MailStatus.Delivered);
    else setMailDelivered(MailStatus.Failed);
  }

  return (
    <VerificationDiv>
      <h1>Verify Your Email</h1>
      <ImageDiv>
        <img src={Email} alt="email" />
      </ImageDiv>
      {mailDelivered === MailStatus.Delivered && (
        <h2>Check your email and click the link to activate your account</h2>
      )}
      {mailDelivered === MailStatus.Sending && <CircularProgress />}
      {(mailDelivered === MailStatus.Failed ||
        mailDelivered === MailStatus.ToBeSent) && (
        <Button variant="outlined" onClick={verifyEmail}>
          Verify Email
        </Button>
      )}
    </VerificationDiv>
  );
};

export default Verification;

export const VerificationDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  h1 {
    font-weight: 400;
  }

  button {
    font-size: 1.2rem;
  }
`;

export const ImageDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
`;
