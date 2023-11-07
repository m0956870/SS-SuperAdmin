import Dashboard from "./components/Dashboard/Dashboard";
import CompanyListing from "./components/CompanyListing/CompanyListing";
import User from "./components/User/User";

const routeArray = [
  { params: undefined, component: <CompanyListing /> },
  { params: "dashboard", component: <CompanyListing /> },
  { params: "company_listing", component: <CompanyListing /> },
  // user
  { params: "user", component: <User /> },
];

export default routeArray;