import { FC, useCallback, useEffect, useRef, useState } from "react";
import { IconButton } from "@mui/material";
import { pdfjs, Document, Thumbnail } from "react-pdf";
import styled from "styled-components";

// icons imports
import EditIcon from "@mui/icons-material/Edit";

// styles imports
import classes from "./MarketplaceItem.module.css";

// local imports
import { MarketplaceService } from "../../services/marketplace";
import { MarketplaceItemType } from "./types";
import Tag from "./Tag";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

interface Props {
  place: MarketplaceItemType;
}

const MarketplaceItem: FC<Props> = ({ place }) => {
  const [fileURL, setFileURL] = useState<string>("");
  const [pdfDivWidth, setPdfDivWidth] = useState<number>(0);

  const pdfRef = useRef<HTMLDivElement | null>(null);

  const getResumeBlob = useCallback(() => {
    MarketplaceService.getResume({
      filename: place.resumes[0].split("/")[1],
    })
      .then((response) => response.blob())
      .then((blob) => {
        const url = URL.createObjectURL(blob);
        setFileURL(url);
      });
  }, [place.resumes]);

  useEffect(() => {
    getResumeBlob();
  }, [getResumeBlob]);

  useEffect(() => {
    window.addEventListener("resize", () => {
      console.log(pdfRef.current?.style.width);
      setPdfDivWidth(Number(pdfRef.current?.style.width));
    });
  }, []);

  return (
    <div className={classes["marketplace-item"]}>
      <h3>{place.name}</h3>
      <h4>Category: {place.category}</h4>
      <PDFDocumentWrapper>
        <Document file={fileURL}>
          <Thumbnail
            pageNumber={1}
            width={pdfDivWidth}
            onItemClick={() => {
              window.open(
                MarketplaceService.baseUrl +
                  `/get-resume?filename=${place.resumes[0].split("/")[1]}`,
                "_parent"
              );
            }}
          />
        </Document>
      </PDFDocumentWrapper>
      <div className={classes.tags}>
        {place.tags.length === 0 && <p>No tags</p>}
        {place.tags.map((tag) => (
          <Tag key={place.id + tag} tag={tag} />
        ))}
      </div>
      <IconButton sx={{ position: "absolute", top: 0, right: 0 }}>
        <EditIcon sx={{ color: "#048741" }} />
      </IconButton>
    </div>
  );
};

const PDFDocumentWrapper = styled.div`
  canvas {
    width: 100% !important;
    height: auto !important;
  }
`;

export default MarketplaceItem;
