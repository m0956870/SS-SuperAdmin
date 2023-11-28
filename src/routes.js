import Dashboard from "./components/Dashboard/Dashboard";
// company
import CompanyListing from "./components/CompanyListing/CompanyListing";
import PurchasedPlan from "./components/CompanyListing/PurchasedPlan";
// user
import User from "./components/User/User";
import AddUser from "./components/User/AddUser";
// plan
import PlanListing from "./components/Plan/PlanListing";
import AddPlan from "./components/Plan/AddPlan";
import EditPlan from "./components/Plan/EditPlan";

const routeArray = [
  { params: undefined, component: <CompanyListing /> },
  { params: "dashboard", component: <CompanyListing /> },
  { params: "company_listing", component: <CompanyListing /> },
  { params: "purchased_plan", component: <PurchasedPlan /> },
  // user
  { params: "user", component: <User /> },
  { params: "add_user", component: <AddUser /> },
  // plan
  { params: "plan", component: <PlanListing /> },
  { params: "add_plan", component: <AddPlan /> },
  { params: "edit_plan", component: <EditPlan /> },
];

export default routeArray;