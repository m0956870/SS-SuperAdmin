import Dashboard from "./components/Dashboard/Dashboard";
import CompanyListing from "./components/CompanyListing/CompanyListing";

const routeArray = [
  // { params: undefined, component: <Dashboard /> },
  // { params: "dashboard", component: <Dashboard /> },
  { params: undefined, component: <CompanyListing /> },
  { params: "dashboard", component: <CompanyListing /> },
  { params: "company_listing", component: <CompanyListing /> },
];

export default routeArray;