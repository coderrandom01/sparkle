import React, { useState } from "react";
import "./App.css";
// pages
import Home from "./pages/Home";
import ProductDetails from "pages/productDetails";
import Products from "pages/products";
import Wishlist from "./pages/Wishlist";
// admin pages
import ManageCategory from "admin/pages/manageCategory";
import AddListing from "admin/pages/addListing";
import ManageListings from "admin/pages/manageListings";
// page not found
import NotFound from "NotFound";
// state management
import { ApolloProvider } from "@apollo/client";
import { Outlet, createBrowserRouter, RouterProvider } from "react-router-dom";
import client from "./apollo/apolloClient";
import { Box, Container, createTheme, ThemeProvider } from "@mui/material";
import { GlobalStyle } from "./assets/style/index";
// components
import Header from "Navigation/Header/Header";
import Footer from "Navigation/Footer/Footer";
import AdminHeader from "admin/Navigation/Header/adminHeader";
import AdminSideBar from "admin/Navigation/Sidebar/adminSideBar";
import { Advertisment } from "admin/pages/addAdvertisment";
// instruction modal
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AdManagement } from "admin/pages/addManagement";
import PrivateRoute from "protectedRoutes";
import ShoppingCart from "pages/ShoppingCart";
import UserManagement from "admin/pages/userManagement";
// comon layout
const DefaultLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

// admin layout
const AdminLayout = () => {
  const [isMenuOpen, setMenuOpen] = useState<boolean>(false);

  const handleMobileMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  return (
    <div className="overflow-hidden relative h-dvh">
      <AdminHeader handleMobileMenu={handleMobileMenu} isMobileMenuOpen={isMenuOpen} />
      <Container className="h-full my-3" maxWidth="xl">
        <Box className="grid sm:grid-cols-6 gap-4 overflow-hidden h-[calc(100vh-60px)] sm:h-[calc(100vh-100px)]">
          <div className="hidden sm:block">
            <Box
              className="h-[calc(100vh-60px)] sm:h-[calc(100vh-100px)] bg-primary text-white rounded-md shadow-sm overflow-y-auto scroll-p-4 
              scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar scrollbar-thumb-slate-700 scrollbar-track-slate-300 "
            >
              <AdminSideBar />
            </Box>
          </div>
          <div className="h-[calc(100vh-60px)] sm:h-[calc(100vh-100px)] col-span-5 overflow-y-auto relative custom-scroll-bar">
            <Outlet />
          </div>
        </Box>
      </Container>
    </div>
  );
};

const RootRouter = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "productdetails", element: <ProductDetails /> },
      { path: "productdetails/:id", element: <ProductDetails /> },
      { path: "products", element: <Products /> },
      { path: 'wishlist', element: <Wishlist />},
      { path: 'mycart', element: <ShoppingCart />}
    ],
  },
  {
    element: <PrivateRoute />,
    children: [
      {
        path: "/admin",
        element: <AdminLayout />,
        children: [
          { path: "manageCategory", element: <ManageCategory /> },
          { path: "addListing", element: <AddListing /> },
          { path: "addListing/:id", element: <AddListing /> },
          { path: "manageListings", element: <ManageListings /> },
          {path : "userManagement",element : <UserManagement/>},
          { path: "addAdvertisment", element: <Advertisment />},
      { path: "addAdvertisment/:id", element: <Advertisment /> },
      { path: "adManagement", element: <AdManagement />}
    ],
      },
    ],
  },

  { path: "*", element: <NotFound /> },
]);

// import GlobalStyle from '../'
function App() {
  const theme = createTheme({
    palette:{
      primary: {
        main: '#F68B29'
      }
    },
    components: {
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: "#ffffff", // Force white background
            color: "#000",
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "gray", // Default color
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "orange", // Hover color
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "orange", // Focused color
            },
          },
        },
      },
      MuiInputLabel: {
        styleOverrides: {
          root: {
            color: "gray",
            top: "-6px",
            fontSize: "14px", // Default label color
            "&.Mui-focused": {
              color: "orange",
              fontSize: "1rem !important", // Focused label color
            },
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <ApolloProvider client={client}>
        <RouterProvider router={RootRouter} />
      </ApolloProvider>
      <ToastContainer position="top-right" />
    </ThemeProvider>
  );
}

export default App;
