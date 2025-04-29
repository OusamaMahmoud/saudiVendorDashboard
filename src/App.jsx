import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { ThemeProvider } from "@/contexts/theme-context";
import DashboardPage from "@/routes/dashboard/page";
import Users from "./pages/Users/Users";
import Login from "./pages/login/Login";
import { ToastContainer } from "react-toastify";
import ProtectedRoute from "./components/shared/ProtectedRoute";
import Orders from "./pages/Orders/Orders";
import OrdersDetails from "./pages/Orders/components/OrdersDetails";
import Categories from "./pages/Categories/Categories";
import AddSubCategory from "./pages/Categories/components/AddSubCategory";
import { AnimatePresence, motion } from "framer-motion";
import Coupons from "./pages/coupons/Coupons";
import Vendors from "./pages/Vendors/Vendors";
import AddProductForm from "./pages/Product/AddProductForm";

function App() {
    const router = createBrowserRouter([
        {
            path: "login",
            element: <Login />,
        },
        {
            path: "/",
            element: <ProtectedRoute />,
            children: [
                {
                    index: true,
                    element: <DashboardPage />,
                },
                {
                    path: "orders",
                    element: <Orders />,
                },
                {
                    path: "order-details/:id",
                    element: <OrdersDetails />,
                },
                {
                    path: "reports",
                    element: <h1 className="title">Reports</h1>,
                },
                {
                    path: "coupons",
                    element: <Coupons />,
                },
                {
                    path: "customers",
                    element: <Users />,
                },
                {
                    path: "vendors",
                    element: <Vendors />,
                },
                {
                    path: "add-product",
                    element: <AddProductForm />,
                },
                {
                    path: "new-customer",
                    element: <h1 className="title">New Customer</h1>,
                },
                {
                    path: "verified-customers",
                    element: <h1 className="title">Verified Customers</h1>,
                },
                {
                    path: "categories/add",
                    element: (
                        <motion.div
                            initial={{ opacity: 0, x: 100 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -100 }}
                            transition={{ duration: 0.5 }}
                        >
                            <Categories />
                        </motion.div>
                    ),
                },
                {
                    path: "categories/update",
                    element: (
                        <motion.div
                            initial={{ opacity: 0, x: 100 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -100 }}
                            transition={{ duration: 0.5 }}
                        >
                            <Categories />
                        </motion.div>
                    ),
                },
                {
                    path: "add-sub-category",
                    element: (
                        <AnimatePresence mode="wait">
                            <motion.div
                                initial={{ opacity: 0, x: 100 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -100 }}
                                transition={{ duration: 0.5 }}
                            >
                                <AddSubCategory />
                            </motion.div>
                        </AnimatePresence>
                    ),
                },
                {
                    path: "new-product",
                    element: <h1 className="title">New Product</h1>,
                },
                {
                    path: "inventory",
                    element: <h1 className="title">Inventory</h1>,
                },
                {
                    path: "settings",
                    element: <h1 className="title">Settings</h1>,
                },
            ],
        },
    ]);

    return (
        <ThemeProvider storageKey="theme">
            <ToastContainer />
            <RouterProvider router={router} />
        </ThemeProvider>
    );
}

export default App;
