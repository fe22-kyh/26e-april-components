import LoginComponent from "../component/LoginComponent";
import RegisterComponent from "../component/RegisterComponent";
import ProfileComponent from "../component/ProfileComponent";

const routes = [
  {
    path: "*",
    element: <h2>Path not found</h2>
  },
  {
    path: "/login",
    element: <LoginComponent />
  },
  {
    path: "/register",
    element: <RegisterComponent />
  },
  {
    path: "/profile",
    element: <ProfileComponent />
  }
];

export default routes;