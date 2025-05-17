import React from "react";
import { AppBar, Badge, Container, Drawer, IconButton, Toolbar, Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { CloseOutlined, MenuOpen, Notifications } from "@mui/icons-material";
import AdminSideBar from "../Sidebar/adminSideBar";
import { logo_dark, logoName_dark } from "config/property/image-property";

interface adminHeaderProps{ 
  isMobileMenuOpen: boolean, handleMobileMenu: Function 
}

export default function AdminHeader({ isMobileMenuOpen, handleMobileMenu }: adminHeaderProps) {
  const navigate = useNavigate();
  const redirection = () => {
    navigate("/")
  }
  return (
    <>
      <AppBar elevation={0} className="!text-black !border-b">
        <Container maxWidth="xl">
          <Toolbar sx={{ px: { xs: 0, md: 3 }, minHeight: { xs: "48px", sm: "60px" } }}>
            <div className="flex justify-between items-center w-full">
              <div className="block sm:hidden">
                <IconButton size="small" onClick={()=> handleMobileMenu()}>
                  <MenuOpen className="!!text-xl sm:!text-2xl" />
                </IconButton>
              </div>
              <div className="flex gap-2 items-center " onClick = {redirection}>
                <img className="h-4 md:h-6" src={logo_dark} alt="logo" />
                <img className="h-4 md:h-6" src={logoName_dark} alt="company name" />
              </div>
              <div className="sm:grow">
                <div className="flex items-center justify-end space-x-3">
                  <div className="">
                    <Tooltip title="Notifications">
                      <IconButton size="small">
                        <Badge variant="dot" overlap="circular" color="error" anchorOrigin={{ vertical: "top", horizontal: "right" }}>
                          <Notifications className="!text-xl sm:!text-2xl" />
                        </Badge>
                      </IconButton>
                    </Tooltip>
                  </div>
                </div>
              </div>
            </div>
          </Toolbar>
        </Container>
      </AppBar>
      <Toolbar />
      <Drawer
        slotProps={{
          backdrop: {
            className: "!bg-transparent",
          },
        }}
        PaperProps={{
          className: "!w-56",
        }}
        open={isMobileMenuOpen}
        anchor="left"
        className="!max-w-56"
      >
        <div className="flex justify-between p-2 border-b">
          <div className="flex gap-2 items-center">
            <img className="h-4" src={logo_dark} alt="logo" />
            <img className="h-4" src={logoName_dark} alt="company name" />
          </div>
          <div>
            <IconButton className="!p-1" onClick={() => handleMobileMenu()}>
              <CloseOutlined />
            </IconButton>
          </div>
        </div>
        <AdminSideBar handleMobileMenu={handleMobileMenu} />
      </Drawer>
    </>
  );
}
