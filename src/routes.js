import Dashboard from "./components/Dashboard/Dashboard";
import CompanyListing from "./components/CompanyListing/CompanyListing";
import User from "./components/User/User";
import AddUser from "./components/User/AddUser";

const routeArray = [
  { params: undefined, component: <CompanyListing /> },
  { params: "dashboard", component: <CompanyListing /> },
  { params: "company_listing", component: <CompanyListing /> },
  // user
  { params: "user", component: <User /> },
  { params: "add_user", component: <AddUser /> },
];

export default routeArray;