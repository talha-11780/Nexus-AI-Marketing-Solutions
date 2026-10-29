import { createBrowserRouter } from "react-router-dom";
import LandingPage from "./landing/LandingPage.jsx";
import SiteLayout from "./navigation/SiteLayout.jsx";
import AdminOnly from "./navigation/AdminOnly.jsx";
import Login from "./Forms/login.jsx";
import Registration from "./Forms/Registration.jsx";
import ContactUs from "./Forms/ContactUs.jsx";
import Feedback from "./Forms/Feedback.jsx";
import CompaignCreation from "./Forms/CompaignCreation.jsx";
import ContentApproval from "./Forms/ContentApproval.jsx";
import PostScheduler from "./Forms/PostScheduler.jsx";
import AddTeamMember from "./Forms/AddTeamMmeber.jsx";
import AddService from "./Forms/AddService.jsx";
import DeleteService from "./Forms/DeleteService.jsx";
import EditService from "./Forms/EditService.jsx";
import BookFreeCall from "./Forms/BookFreeCall.jsx";
import AdminMenu from "./stakeholders/AdminMenu.jsx";
import CustomerMenu from "./stakeholders/CustomerMenu.jsx";
import MarketingMenu from "./stakeholders/MarketingMenu.jsx";

export const router = createBrowserRouter([
  {
    element: <SiteLayout />,
    children: [
      { path: "/", element: <LandingPage /> },
      { path: "/admin", element: <AdminOnly><AdminMenu /></AdminOnly> },
      { path: "/customer", element: <CustomerMenu /> },
      { path: "/marketing", element: <AdminOnly><MarketingMenu /></AdminOnly> },
      { path: "/admin/login", element: <><AdminMenu /><Login /></> },
      { path: "/marketing/login", element: <><MarketingMenu /><Login /></> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Registration /> },
      { path: "/contact", element: <ContactUs /> },
      { path: "/feedback", element: <Feedback /> },
      { path: "/customer/register", element: <><CustomerMenu /><Registration /></> },
      { path: "/customer/login", element: <><CustomerMenu /><Login /></> },
      { path: "/customer/contact", element: <><CustomerMenu /><ContactUs /></> },
      { path: "/customer/feedback", element: <><CustomerMenu /><Feedback /></> },
      { path: "/customer/book-call", element: <><CustomerMenu /><BookFreeCall /></> },
      { path: "/campaign", element: <AdminOnly><><MarketingMenu /><CompaignCreation /></></AdminOnly> },
      { path: "/content-approval", element: <AdminOnly><><MarketingMenu /><ContentApproval /></></AdminOnly> },
      { path: "/post-scheduler", element: <AdminOnly><><MarketingMenu /><PostScheduler /></></AdminOnly> },
      { path: "/add-team-member", element: <AdminOnly><><MarketingMenu /><AddTeamMember /></></AdminOnly> },
      { path: "/add-service", element: <AdminOnly><><AdminMenu /><AddService /></></AdminOnly> },
      { path: "/delete-service", element: <AdminOnly><><AdminMenu /><DeleteService /></></AdminOnly> },
      { path: "/edit-service", element: <AdminOnly><><AdminMenu /><EditService /></></AdminOnly> },
      { path: "/book-call", element: <BookFreeCall /> },
    ],
  },
]);