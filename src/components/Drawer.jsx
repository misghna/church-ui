import { Fragment, useContext } from "react";

import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { List, ListItem, ListItemIcon, ListItemText, Drawer, Divider } from "@mui/material";
import { makeStyles } from "@mui/styles";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

import SettingContext from "~/contexts/settingContext";

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: 240,
    flexShrink: 0
  },
  drawerPaper: {
    display: "flex",
    flexDirection: "column"
  },
  listItem: {
    paddingLeft: theme.spacing(2)
  },
  listItemIcon: {
    minWidth: 50
  }
}));

const ChurchDrawer = ({ open, handleDrawerClose }) => {
  const classes = useStyles();
  const { state } = useContext(SettingContext);
  const navigate = useNavigate();
  const { setting } = state;
  const menu = setting.menu;
  const groupedMenu = menu.reduce((acc, item) => {
    acc[item.type] = acc[item.type] || [];
    acc[item.type].push(item);
    return acc;
  }, []);

  return (
    <Drawer
      variant="temporary"
      className={classes.drawer}
      anchor="left"
      open={open}
      classes={{ paper: classes.drawerPaper }}
    >
      <List>
        {groupedMenu &&
          Object.entries(groupedMenu).map((items, index) => (
            <Fragment key={items[index]}>
              <Divider />
              {items[1].map((item) => (
                <ListItem
                  key={item.name}
                  button
                  onClick={() => {
                    navigate(item.url);
                    handleDrawerClose();
                  }}
                >
                  <ListItemIcon className={classes.listItemIcon}>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.name} />
                  <ChevronRightIcon />
                </ListItem>
              ))}
            </Fragment>
          ))}
      </List>
    </Drawer>
  );
};

ChurchDrawer.propTypes = {
  open: PropTypes.bool.isRequired,
  handleDrawerClose: PropTypes.func.isRequired
};

export default ChurchDrawer;
