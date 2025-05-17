import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Divider, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Menu, MenuItem, Tooltip } from "@mui/material";
import { sidebarMenu } from "./sidebar-property";
import { AccountCircle, Logout, Settings } from "@mui/icons-material";
import { logoutSuccess } from "HelperFunctions/message";
import { infoToast } from "HelperFunctions/utils";
import useScreenSize from "HelperFunctions/hooks/useScreenSize";

interface adminSideBarPorps{
  handleMobileMenu?: Function
}

export default function AdminSideBar({ handleMobileMenu = () => {} }: adminSideBarPorps) {
  const navigate = useNavigate();
  const { width } = useScreenSize();
  const isSmallDevice = width <= 480
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const isMenuOpen = Boolean(menuAnchorEl);

  const handleMenuOpen = (e: any) => {
    setMenuAnchorEl(e.target);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  const handleProfile = () => {
    navigate("/admin/managelistings");
  };

  const logOut = () => {
    const message = logoutSuccess("User");
    infoToast(message);
    setTimeout(() => {
      localStorage.removeItem('loginUserToken');
      localStorage.removeItem('isAdmin');
      // document.cookie = "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;";
      navigate("/");
    }, 2000);
  };

  const handleMenuItemNavigate = (path : string) =>{
      navigate(path);
      if(isSmallDevice){
        handleMobileMenu();
      }
  }

  const CustomListItem = ({ key, handleRounte, Icon, listName }: { key: string; handleRounte: string; Icon: any; listName: string }) => {
    return (
      <ListItem className="!p-2 sidebar-menu" key={key}>
        <ListItemButton className="sidebar-menu-button" onClick={() => (handleRounte !== "" ? handleMenuItemNavigate(handleRounte) : console.log())}>
          <ListItemIcon className="!min-w-8">
            <Icon className="icon" />
          </ListItemIcon>
          <ListItemText className="!flex-initial" sx={{ "& .MuiTypography-root": { fontSize: { xs: '0.75rem' ,sm: "0.875rem" }, width: "fit-content" } }}>
            {listName}
          </ListItemText>
        </ListItemButton>
      </ListItem>
    );
  };

  return (
    <>
      <div className="overflow-y-auto custom-scroll-bar pt-4 h-[calc(100%-60px)] sm:h-[calc(100%-80px)]">
        <List>
          {sidebarMenu.map((menuitem, index: number) => {
            const key = `menu-item-${index}`;
            return (
              <>
                <CustomListItem key={key} handleRounte={menuitem.navigate} Icon={menuitem.icon} listName={menuitem.name} />
              </>
            );
          })}
        </List>
      </div>
      <Divider className="!border-white" />
      <List>
        <ListItem className="!p-2">
          <div className="bg-primary sm:bg-white text-white sm:text-black rounded-lg flex justify-between items-center w-full">
            <ListItemButton>
              <ListItemIcon className="!min-w-8">
                <AccountCircle className="!text-white sm:!text-gray-600 !text-lg" />
              </ListItemIcon>
              <ListItemText className="!flex-initial !text-white sm:!text-gray-600" sx={{ "& .MuiTypography-root": { fontSize: { sm: "0.875rem" }, fontWeight: 500, letterSpacing: "0.0275rem", width: "fit-content" } }}>
                User
              </ListItemText>
            </ListItemButton>
            <Divider orientation="vertical" flexItem className="!border-white sm:!border-gray-500 !self-center !border !h-6" />
            <Tooltip title="Settings">
              <IconButton size="medium" className="size-8 broder rounded-md !flex-1" onClick={(e) => handleMenuOpen(e)}>
                <Settings className="!text-white sm:!text-gray-600 !text-lg" />
              </IconButton>
            </Tooltip>
          </div>
        </ListItem>
      </List>
      <Menu
        elevation={0}
        anchorEl={menuAnchorEl}
        open={isMenuOpen}
        onClose={() => handleMenuClose()}
        onClick={() => handleMenuClose()}
        classes={{
          paper: "!border !text-sm drop-shadow-md",
        }}
        className="profile-menu"
        transformOrigin={{ horizontal: isSmallDevice ? 'right' : "left", vertical: "bottom" }}
        anchorOrigin={{ horizontal: "center", vertical: "top" }}
      >
        <MenuItem className="menu-item" onClick={() => handleProfile()}>
          Profile
        </MenuItem>
        <Divider />
        <MenuItem className="menu-item" onClick={() => logOut()}>
          <ListItemIcon className="!min-w-5">
            <Logout className="!text-sm sm:!text-base" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
}
