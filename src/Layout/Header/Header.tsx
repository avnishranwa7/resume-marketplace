import { FC, useState } from "react";
import { IconButton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Avatar from "@mui/material/Avatar";
import Menu, { MenuProps } from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import { styled, alpha } from "@mui/material/styles";

// icons imports
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

// styles imports
import classes from "./Header.module.css";
import { RootState } from "../../redux";
import { logout } from "../../redux/auth";
import { update } from "../../redux/navigate";

function stringToColor(string: string) {
  let hash = 0;
  let i;

  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }

  return color;
}

function stringAvatar(name: string) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(" ")[0][0].toUpperCase()}`,
  };
}

const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
      display: "flex",
      flexDirection: "column",
      "& li": {
        width: "100%",
        display: "flex",
        flexDirection: "row",
      },
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

const Header = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const dispatch = useDispatch();
  const open = Boolean(anchorEl);
  const username = useSelector((state: RootState) => state.auth.user.email);

  function handleClose() {
    setAnchorEl(null);
  }

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
        {username !== "" && (
          <li>
            <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
              <Avatar {...stringAvatar(username)} />
            </IconButton>
          </li>
        )}
        <StyledMenu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
        >
          <MenuItem onClick={handleClose} sx={{ p: "0.7rem", pl: "1rem" }}>
            Profile
          </MenuItem>
          <MenuItem onClick={handleClose} sx={{ p: "0.7rem", pl: "1rem" }}>
            My account
          </MenuItem>
          <Divider sx={{ width: "100%" }} />
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <PersonAdd fontSize="small" />
            </ListItemIcon>
            Add another account
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <Settings fontSize="small" />
            </ListItemIcon>
            Settings
          </MenuItem>
          <MenuItem
            onClick={() => {
              dispatch(logout());
              dispatch(update({ was_logged_in: true }));
              handleClose();
            }}
          >
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        </StyledMenu>
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
