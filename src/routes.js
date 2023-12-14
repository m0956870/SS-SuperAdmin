import Dashboard from "./components/Dashboard/Dashboard";
// company
import CompanyListing from "./components/CompanyListing/CompanyListing";
import CompanyActionPage from "./components/CompanyListing/CompanyActionPage";
import PurchasedPlan from "./components/CompanyListing/PurchasedPlan";
import ChangePassword from "./components/Auth/ChangePassword";
// user
import User from "./components/User/User";
import AddUser from "./components/User/AddUser";
// plan
import PlanListing from "./components/Plan/PlanListing";
import AddPlan from "./components/Plan/AddPlan";
import EditPlan from "./components/Plan/EditPlan";
// action
import Action from "./components/Action/Action";
// banner
import Banner from "./components/Banner/Banner";
import AddBanner from "./components/Banner/AddBanner";
import EditBanner from "./components/Banner/EditBanner";

const routeArray = [
  { params: undefined, component: <CompanyListing /> },
  { params: "dashboard", component: <CompanyListing /> },
  { params: "company_listing", component: <CompanyListing /> },
  { params: "company_action_page", component: <CompanyActionPage /> },
  { params: "purchased_plan", component: <PurchasedPlan /> },
  // user
  { params: "user", component: <User /> },
  { params: "add_user", component: <AddUser /> },
  // plan
  { params: "plan", component: <PlanListing /> },
  { params: "add_plan", component: <AddPlan /> },
  { params: "edit_plan", component: <EditPlan /> },
  // action
  { params: "action", component: <Action /> },
  { params: "change_password", component: <ChangePassword /> },
  // banner
  { params: "banner", component: <Banner /> },
  { params: "add_banner", component: <AddBanner /> },
  { params: "edit_banner", component: <EditBanner /> },
];

export default routeArray;