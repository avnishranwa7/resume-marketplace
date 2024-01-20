// icons imports
import MenuIcon from "@mui/icons-material/Menu";

// styles imports
import classes from "./Header.module.css";

const Header = () => {
  return (
    <header className={classes.header}>
      <span className={classes["mobile-menu"]}>
        <MenuIcon sx={{ verticalAlign: "middle" }} fontSize="inherit" />
      </span>
      <span className={classes.logo}>
        RESUME <span className={classes.market}>MARKET</span>
        <span className={classes.place}>PLACE</span>
      </span>
    </header>
  );
};

export default Header;
