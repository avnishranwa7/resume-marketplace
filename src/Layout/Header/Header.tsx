import { FC, useState } from "react";

// icons imports
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

// styles imports
import classes from "./Header.module.css";
import { IconButton } from "@mui/material";

const Header = () => {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  return (
    <header className={classes.header}>
      <MobileNav open={mobileNavOpen} close={() => setMobileNavOpen(false)} />
      <span className={classes["mobile-menu"]}>
        <IconButton
          sx={{ m: 0, p: 0 }}
          onClick={() => setMobileNavOpen((prev) => !prev)}
        >
          <MenuIcon sx={{ verticalAlign: "middle" }} fontSize="inherit" />
        </IconButton>
      </span>
      <span className={classes.logo}>
        <a href="/">
          RESUME <span className={classes.market}>MARKET</span>
          <span className={classes.place}>PLACE</span>
        </a>
      </span>
      <ul className={classes["web-links"]}>
        <li className={classes.explore}>
          <a href="/explore">Explore</a>
        </li>
        <li className={classes.create}>
          <a href="/create-marketplace">Create Marketplace</a>
        </li>
      </ul>
    </header>
  );
};

interface MobileNavProps {
  open: boolean;
  close: () => void;
}

const MobileNav: FC<MobileNavProps> = ({ open, close }) => {
  return (
    <div
      className={classes["mobile-nav"] + " " + classes[open ? "open" : "close"]}
    >
      <IconButton sx={{ p: 0, m: 1 }} onClick={close}>
        <CloseIcon />
      </IconButton>
      <ul className={classes.links}>
        <li className={classes.explore}>
          <a href="/explore">Explore</a>
        </li>
        <li className={classes.create}>
          <a href="/create-marketplace">Create Marketplace</a>
        </li>
      </ul>
    </div>
  );
};

export default Header;
