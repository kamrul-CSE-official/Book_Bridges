import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Components/Layouts/MainLayout";
import Home from "../Pages/Home/Home";
import About from "../Pages/About/About";
import PageNotFound from "../Pages/PageNotFound/PageNotFound";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import AllBooks from "../Pages/AllBooks/AllBooks";
import PostBook from "../Pages/PostBook/PostBook";
import ProductDetails from "../Pages/ProductDetails/ProductDetails";
import WishList from "../Pages/WishList/WishList";
import AddToCart from "../Pages/AddToCart/AddToCart";
import Checkout from "../Pages/Checkout/Checkout";
import PrivateRoute from "./PrivateRoutes";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "/allBooks",
        element: <AllBooks />,
      },
      {
        path: "/postBook",
        element: (
          <PrivateRoute>
            <PostBook />
          </PrivateRoute>
        ),
      },
      {
        path: "/wish",
        element: <WishList />,
      },
      {
        path: "/addToCart",
        element: (
          <PrivateRoute>
            <AddToCart />
          </PrivateRoute>
        ),
      },
      {
        path: "/checkout",
        element: <Checkout />,
      },
      {
        path: "/productDetails/:id",
        element: <ProductDetails />,
      },
    ],
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);
