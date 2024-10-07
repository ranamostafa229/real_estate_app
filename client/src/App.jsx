import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import PrivateRoute from "./components/PrivateRoute";
import UserPanel from "./pages/UserPanel";
import EditProperty from "./pages/EditProperty";
import AddProperty from "./pages/AddProperty";
import Profile from "./pages/Profile";
import Property from "./pages/Property";
import Search from "./pages/Search";
import Layout from "./components/Layout";
import MyProperties from "./pages/MyProperties";

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/search" element={<Search />} />
        <Route path="/property/:id" element={<Property />} />
        <Route element={<PrivateRoute />}>
          <Route path="/user-panel" element={<UserPanel />}>
            <Route element={<Profile />} index />
            <Route path="/user-panel/add-property" element={<AddProperty />} />
            <Route path="/user-panel/my-property" element={<MyProperties />} />
            <Route
              path="/user-panel/edit-property/:id"
              element={<EditProperty />}
            />
          </Route>
        </Route>
      </Route>
    )
  );
  return <RouterProvider router={router} />;
};

export default App;
