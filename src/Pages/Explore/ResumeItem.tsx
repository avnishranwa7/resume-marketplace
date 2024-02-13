import { FC, useCallback, useEffect, useRef, useState } from "react";
import { pdfjs, Document, Thumbnail } from "react-pdf";
import styled from "styled-components";

// styles imports
import classes from "./ResumeItem.module.css";

// local imports
import { MarketplaceService } from "../../services/marketplace";
import { ResumeType } from "./types";
import Tag from "../Create-Marketplace/Tag";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

interface Props {
  resume: ResumeType;
}

const ResumeItem: FC<Props> = ({ resume }) => {
  const [fileURL, setFileURL] = useState<string>("");
  const [pdfDivWidth, setPdfDivWidth] = useState<number>(0);

  const pdfRef = useRef<HTMLDivElement | null>(null);

  const getResumeBlob = useCallback(() => {
    MarketplaceService.getResume({
      filename: resume.resumes[0].split("/")[1],
    })
      .then((response) => response.blob())
      .then((blob) => {
        const url = URL.createObjectURL(blob);
        setFileURL(url);
      });
  }, [resume.resumes]);

  useEffect(() => {
    getResumeBlob();
  }, [getResumeBlob]);

  useEffect(() => {
    window.addEventListener("resize", () => {
      setPdfDivWidth(Number(pdfRef.current?.style.width));
    });
  }, []);

  return (
    <div className={classes["resume-item"]}>
      <PDFDocumentWrapper>
        <Document file={fileURL}>
          <Thumbnail
            pageNumber={1}
            width={pdfDivWidth}
            onItemClick={() => {
              window.open(
                MarketplaceService.baseUrl +
                  `/get-resume?filename=${resume.resumes[0].split("/")[1]}`,
                "_parent"
              );
            }}
          />
        </Document>
      </PDFDocumentWrapper>
      <div className={classes.tags}>
        {resume.tags.length === 0 && <p>No tags</p>}
        {resume.tags.map((tag) => (
          <Tag key={resume.id + tag} tag={tag} />
        ))}
      </div>
    </div>
  );
};

const PDFDocumentWrapper = styled.div`
  canvas {
    width: 100% !important;
    height: auto !important;
  }
`;

export default ResumeItem;
