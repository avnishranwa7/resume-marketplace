import { Button } from "@mui/material";

// styles imports
import classes from "./Landing.module.css";

// local imports
import Resume from "../../assets/resume.png";

const Landing = () => {
  return (
    <div className={classes.landing}>
      <h1>The Perfect Resume is waiting for you!</h1>
      <div className={classes.resume}>
        <img src={Resume} alt="Resume" />
      </div>
      <div className={classes.explore}>
        <h1>Explore Marketplace</h1>
        <h2>
          For <span className={classes.recruiters}>Recruiters</span> /{" "}
          <span className={classes["job-seekers"]}>Job Seekers</span>
        </h2>
        <p>
          If you are a recruiter, filter out resumes according to your needs
        </p>
        <p>
          If you are a job seeker, have a look at what other people's resumes
          look like
        </p>
        <h2 style={{ textDecoration: "underline" }}>WHAT CAN YOU DO</h2>
        <ul>
          <li className={classes["item-1"]}>
            <span className={classes["item-number"]}>01</span>
            <span className={classes["item-desc"]}>
              Find a resume which matches your requirements
            </span>
          </li>
          <li className={classes["item-2"]}>
            <span className={classes["item-number"]}>02</span>
            <span className={classes["item-desc"]}>
              Use filters to filter our according to different parameters
            </span>
          </li>
          <li className={classes["item-3"]}>
            <span className={classes["item-number"]}>03</span>
            <span className={classes["item-desc"]}>
              Rate the resumes based on the tech stack specified and what you
              require
            </span>
          </li>
        </ul>
        <Button variant="outlined">Explore</Button>
      </div>
      <hr />
      <div className={classes.create}>
        <h1>Create your own Marketplace</h1>
        <h2>
          For <span className={classes["job-seekers"]}>Job Seekers</span>
        </h2>
        <p>
          Create your own marketplace having different resumes for different
          positions
        </p>
        <h2 style={{ textDecoration: "underline" }}>WHAT CAN YOU DO</h2>
        <ul>
          <li className={classes["item-1"]}>
            <span className={classes["item-number"]}>01</span>
            <span className={classes["item-desc"]}>
              Get hired by uploading different resumes for different fields
            </span>
          </li>
          <li className={classes["item-2"]}>
            <span className={classes["item-number"]}>02</span>
            <span className={classes["item-desc"]}>
              View and compare your resume with others
            </span>
          </li>
          <li className={classes["item-3"]}>
            <span className={classes["item-number"]}>03</span>
            <span className={classes["item-desc"]}>
              Get your resumes rating by recruiters and other fellow job seekers
            </span>
          </li>
        </ul>
        <Button variant="outlined">Create</Button>
      </div>
    </div>
  );
};

export default Landing;
