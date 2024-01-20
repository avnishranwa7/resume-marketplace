import { Button } from "@mui/material";

// styles imports
import classes from "./Landing.module.css";

const Landing = () => {
  return (
    <div className={classes.landing}>
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
        <Button variant="outlined">Explore</Button>
      </div>
      <div className={classes.create}>
        <h1>Create your own Marketplace</h1>
        <h2>
          For <span className={classes["job-seekers"]}>Job Seekers</span>
        </h2>
        <p>
          {/* <h3> */}
          Create your own marketplace having different resumes for different
          positions
          {/* </h3> */}
        </p>
        <Button variant="outlined">Login</Button>
      </div>
    </div>
  );
};

export default Landing;
