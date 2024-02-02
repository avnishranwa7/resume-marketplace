import { FC } from "react";
import styled from "styled-components";

interface Props {
  tag: string;
}

const Tag: FC<Props> = ({ tag }) => {
  return <TagSpan>{tag}</TagSpan>;
};

const TagSpan = styled.span`
  border: 1px solid black;
  border-radius: 1rem;
  padding: 0.2rem 0.5rem;
  margin: 0.5rem;
`;

export default Tag;
