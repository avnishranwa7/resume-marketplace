import { FC } from "react";
import styled from "styled-components";
import { IconButton } from "@mui/material";

// icons imports
import CloseIcon from "@mui/icons-material/Close";

interface Props {
  tag: string;
  deletable?: boolean;
  deleteTag?: (tag: string) => void;
}

const Tag: FC<Props> = ({ tag, deletable = false, deleteTag }) => {
  return (
    <TagSpan>
      {tag}
      {deletable && (
        <IconButton
          sx={{ position: "absolute", top: -6, p: 0, right: -6 }}
          onClick={() => deleteTag && deleteTag(tag)}
        >
          <CloseIcon sx={{ color: "red", fontSize: "1.3rem" }} />
        </IconButton>
      )}
    </TagSpan>
  );
};

const TagSpan = styled.span`
  border: 1px solid black;
  border-radius: 1rem;
  padding: 0.2rem 0.5rem;
  margin: 0.5rem;
  position: relative;
`;

export default Tag;
