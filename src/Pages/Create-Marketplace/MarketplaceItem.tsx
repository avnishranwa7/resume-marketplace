import { FC } from "react";
import { IconButton } from "@mui/material";

// icons imports
import EditIcon from "@mui/icons-material/Edit";

// styles imports
import classes from "./MarketplaceItem.module.css";

// local imports
import { MarketplaceItemType } from "./types";
import Tag from "./Tag";

interface Props {
  place: MarketplaceItemType;
}

const MarketplaceItem: FC<Props> = ({ place }) => {
  return (
    <div className={classes["marketplace-item"]}>
      <h3>{place.name}</h3>
      <h4>Category: {place.category}</h4>
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

export default MarketplaceItem;
