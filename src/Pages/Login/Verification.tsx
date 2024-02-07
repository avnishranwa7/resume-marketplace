import styled from "styled-components";

// local imports
import Email from "../../assets/email.png";

const Verification = () => {
  return (
    <VerificationDiv>
      <h1>Verify Your Email</h1>
      <ImageDiv>
        <img src={Email} alt="email" />
      </ImageDiv>
      <h2>Check your email and click the link to activate your account</h2>
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
