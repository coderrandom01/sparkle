import { AppBar, Autocomplete, Avatar, Button, Card, CardContent, CardMedia, Container, CssBaseline, Divider, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Menu, MenuItem, TextField, Toolbar, Tooltip } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { Search } from "lucide-react";
import Login from "../../Components/Login";
import { getCookie } from "../../HelperFunctions/basicHelpers";
import { useLocation, useNavigate } from "react-router-dom";
import { FavoriteBorder, KeyboardArrowRight, Logout, ShoppingCartOutlined } from "@mui/icons-material";
import { infoToast, productList } from "HelperFunctions/utils";
import { logoName_dark, logo_dark } from "config/property/image-property";
import { logoutSuccess } from "HelperFunctions/message";
import { ElevationScroll, HideOnScroll } from "../../Components/HeaderScroll";
import { useQuery } from "@apollo/client";
import { GET_CATEGORIES } from "apollo/query";

interface Props {
  window?: () => Window;
  children?: React.ReactElement<{ elevation?: number }>;
}

function Header(props: Props) {
  const location = useLocation();
  const navigate = useNavigate();
  const [isAuthModal, setIsAuthModal] = useState<boolean>(false);
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [openProductEl, setOpenProductEl] = useState<string>("");
  const isMenuOpen = Boolean(menuAnchorEl);
  // const isAuth = getCookie("accessToken");
  const isAuth = localStorage.getItem("loginUserToken");
  const [categories, setCategories] = useState([]);
  //fetch data
  const { data: categoryData, refetch } = useQuery(GET_CATEGORIES, {
    notifyOnNetworkStatusChange: true,
  });

  useEffect(() => {
    refetch();
  }, [location.pathname, refetch]);

  useEffect(() => {
    const categories = categoryData?.getAllCategory?.response || [];
    setCategories(categories);
  }, [categoryData]);

  const handleLogModal = useCallback(() => {
    setIsAuthModal(false);
  }, []);

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
    const message = logoutSuccess('User');
    infoToast(message);
    setTimeout(()=>{
      localStorage.removeItem('loginUserToken');
      localStorage.removeItem('isAdmin');
      // document.cookie = "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;";
      navigate("/");
    }, 2000);
  };
  const redirection = () => {
    navigate("/");
  };
  return (
    <>
      <CssBaseline />
      <ElevationScroll {...props}>
        <AppBar>
          <HideOnScroll {...props}>
            <Container className="bg-primary text-white text-sm text-center p-1 sm:p-1.5" maxWidth="xl" sx={{ display: { xs: "none", sm: "block" } }}>
              <h6 className="text-white tracking-wide">Get Exclusive Offers !!!</h6>
            </Container>
          </HideOnScroll>
          <Container maxWidth="xl">
            <Toolbar sx={{ px: { xs: 0, sm: 3 }, minHeight: { xs: "48px", sm: "60px" } }}>
              <div className="flex justify-between w-full">
                <div className="flex gap-2 items-center" onClick={redirection}>
                  <img className="h-3 sm:h-6" src={logo_dark} alt="logo" />
                  <img className="h-3 sm:h-6" src={logoName_dark} alt="company name" />
                </div>
                <div className="grow">
                  <div className="flex items-center justify-end md:gap-16">
                    <Autocomplete
                      className="w-64 hidden md:block"
                      freeSolo
                      size="small"
                      disableClearable
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "50px", // Adjust the border radius
                          padding: "3px 10px !important",
                          bgcolor: "#8080802e",
                        },
                      }}
                      renderOption={() => <p>hi</p>}
                      options={[]}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          InputProps={{
                            ...params.InputProps,
                            startAdornment: (
                              <>
                                {params.InputProps.endAdornment}
                                <Search size={18} color="gray" />
                              </>
                            ),
                          }}
                          placeholder="Search"
                        />
                      )}
                    />
                    <div className="flex items-center space-x-1 sm:space-x-3">
                      <div className="hover:text-primary cursor-pointer flex items-center">
                        <Tooltip title="Wish List">
                          <IconButton size="small" onClick={() => navigate("/wishlist")}>
                            <FavoriteBorder className="!text-lg md:!text-2xl !font-normal !text-gray-400" />
                          </IconButton>
                        </Tooltip>
                      </div>
                      <div className="flex items-center gap-1 cursor-pointer hover:text-primary">
                        <Tooltip title="cart">
                          <IconButton size="small" onClick={() => navigate("/mycart")}>
                            <ShoppingCartOutlined className="!text-lg md:!text-2xl !text-gray-400" />
                          </IconButton>
                        </Tooltip>
                      </div>
                      <div className="">
                        {isAuth ? (
                          <Tooltip title="Account Settings">
                            <IconButton size="small" onClick={(e) => handleMenuOpen(e)}>
                              <Avatar className="!text-sm sm:!text-base !size-6 sm:!size-8">U</Avatar>
                            </IconButton>
                          </Tooltip>
                        ) : (
                          <Button onClick={() => setIsAuthModal((prev) => !prev)} size="small" variant="outlined" className="!font-normal !text-xs md:!text-sm !capitalize !rounded-md !text-black !border-primary  hover:!bg-transparent hover:!text-primary hover:ring-1 ring-secondary !min-w-min">
                            Login
                          </Button>
                        )}
                      </div>
                      <Menu
                        elevation={0}
                        anchorEl={menuAnchorEl}
                        open={isMenuOpen}
                        onClose={() => handleMenuClose()}
                        onClick={() => handleMenuClose()}
                        classes={{
                          paper: "!border !text-sm mt-2 px-3",
                        }}
                        className="profile-menu"
                        transformOrigin={{ horizontal: "right", vertical: "top" }}
                        anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
                      >
                        <MenuItem disableRipple className="menu-item" onClick={() => handleProfile()}>
                          Profile
                        </MenuItem>
                        <MenuItem disableRipple className="menu-item" onClick={() => navigate("wishlist")}>
                          Wish List
                        </MenuItem>
                        <Divider />
                        <MenuItem disableRipple className="menu-item" onClick={() => logOut()}>
                          <ListItemIcon className="!min-w-7">
                            <Logout className="!text-base" />
                          </ListItemIcon>
                          Logout
                        </MenuItem>
                      </Menu>
                    </div>
                  </div>
                </div>
              </div>
            </Toolbar>
          </Container>
          <Divider />
          <Container maxWidth="xl">
            <div className="p-2 text-xs md:text-sm overflow-scroll md:overflow-visible">
              <List className="flex justify-center space-x-3 md:space-x-20 w-min md:w-full !p-0">
                <ListItemButton disableRipple className="!w-fit !flex-none !p-0 !bg-transparent" onClick={() => navigate("/")}>
                  <ListItemText classes={{ primary: "w-fit !text-sm", root: "!flex-initial !min-w-fit !m-0" }} primary="Home" />
                </ListItemButton>
                {categories?.map((item: any, index) => {
                  const cutstomId = `header-menu-${index}`;
                  return (
                    <div className="relative" onMouseEnter={() => setOpenProductEl(cutstomId)} onMouseLeave={() => setOpenProductEl("")}>
                      <ListItemButton disableRipple className="!w-fit !flex-none !p-0 !bg-transparent">
                        <ListItemText classes={{ primary: "w-fit !text-sm", root: "!flex-initial !min-w-fit !m-0" }} primary={item?.category_name} />
                      </ListItemButton>
                      <div className={`${openProductEl === cutstomId ? "block" : "hidden"} mt-2 header-drop-down absolute animate__animated animate__headShake p-3 border bg-white left-0 top-full drop-shadow shadow-md rounded w-[500px]`}>
                        <div className="grid grid-cols-3 gap-2">
                          <div>
                            <div className="h-64 border"></div>
                          </div>
                          <div className="col-span-2 space-y-2">
                            {productList.slice(0, 4)?.map((item) => (
                              <Card className="flex p-1 border-1 border-primary">
                                <CardMedia sx={{ objectPosition: "top" }} className="!size-14 rounded-sm" component="img" image={item.src} alt="cart" />
                                <CardContent className="flex-1 space-y-2 !py-2">
                                  <div className="w-full h-full flex justify-between items-center">
                                    <div>
                                      <h4 className="text-sm">Slim Fit T-Shirt</h4>
                                    </div>
                                    <div className="bg-primary drop-shadow rounded">
                                      <KeyboardArrowRight className="!text-white" />
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </List>
            </div>
          </Container>
          <Divider />
        </AppBar>
      </ElevationScroll>
      <Toolbar className="!min-h-20 md:!min-h-32" />
      {isAuthModal && <Login onClose={handleLogModal} />}
    </>
  );
}

export default Header;
