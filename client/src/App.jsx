import "./index.css";
import HomePage from "./pages/HomePage";
import AccountPage from "./pages/AccountPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import LeaderboardPage from "./pages/LeaderboardPage";
import MainLayout from "./layouts/MainLayout";
import LogoutPage from "./pages/LogoutPage";
import GamePage from "./pages/GamePage";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        // Default route for ("/")
        index: true,
        element: <HomePage />,
      },
      {
        path: "account",
        element: <AccountPage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
      {
        path: "leaderboards",
        element: <LeaderboardPage />,
      },
      {
        path: "logout",
        element: <LogoutPage />,
      },
      {
        path: "/games/:gameName",
        element: <GamePage />,
      },
    ],
  },
]);

const App = () => {
  return (
    <div>
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
};

export default App;
