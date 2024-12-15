import { Route, Switch, useLocation } from "react-router-dom";
import Header from "./sections/Header.jsx";
import Hero from "./sections/Hero.jsx";
import Features from "./sections/Features.jsx";
import Pricing from "./sections/Pricing.jsx";
import Faq from "./sections/Faq.jsx";
import Testimonials from "./sections/Testimonials.jsx";
import TrainingPlan from "./sections/TrainingPlan.jsx";
import Footer from "./sections/Footer.jsx";
import SignUp from "./auth/SignUp.jsx";
import Login from "./auth/Login.jsx";
import MealPlan from "./sections/MealPlan.jsx";
import MemberDetail from "./pagesLogin/MemberDetail.jsx";
import LogOut from "./pagesLogin/LogOut.jsx";
import ForgotPassword from "./auth/ForgotPassword.jsx";
import CoursesList from "./pagesLogin/CoursesList.jsx";
import CoursesDetail from "./pagesLogin/CourseDetail.jsx";
import Bookings from "./pagesLogin/Bookings.jsx";
import BookingDetail from "./pagesLogin/BookingDetail.jsx";
import MealPlanList from "./pagesLogin/MealplansList.jsx";
import Kalendar from "./pagesLogin/CourseCalendar.jsx";
import MealPlanAdd from "./pagesLogin/MealPlanAdd.jsx";
import CourseAdd from "./pagesLogin/CoursesAdd.jsx";
import TrainingPlanDetail from "./pagesLogin/TrainingPlanDetail.jsx";
import TrainingPlanList from "./pagesLogin/TrainingPlanList.jsx";
const App = () => {
  const location = useLocation();

  const hideHeaderPaths = [
    "/osobni-slozka",
    "/kurzy",
    "/auth/registrace",
    "/auth/prihlaseni",
    "/zapomenute-heslo",
    "/jidelnicky",
    "/kalendar",
    "/kurz-pridani",
    "/jidelnicek-pridani",
    "/treninky",
  ];

  const hideHeaderPatterns = [
    /^\/kurz\/[a-zA-Z0-9]+$/,
    /^\/treninky\/[a-zA-Z0-9]+$/,
  ];

  const showHeader =
    !hideHeaderPaths.includes(location.pathname) &&
    !hideHeaderPatterns.some((pattern) => pattern.test(location.pathname));

  return (
    <main className="overflow-hidden">
      {showHeader && <Header />}
      <Switch>
        <Route path="/auth/registrace" component={SignUp} />
        <Route path="/auth/prihlaseni" component={Login} />
        <Route path="/osobni-slozka" component={MemberDetail} />
        <Route path="/odhlaseni" component={LogOut} />
        <Route path="/zapomenute-heslo" component={ForgotPassword} />
        <Route path="/kurzy" component={CoursesList} />
        <Route path="/kalendar" component={Kalendar} />
        <Route path="/kurz/:id" component={CoursesDetail} />
        <Route path="/bookings" component={Bookings}></Route>
        <Route path="/bookings/:id" component={BookingDetail}></Route>
        <Route path="/jidelnicky" component={MealPlanList}></Route>
        <Route path="/jidelnicek-pridani" component={MealPlanAdd}></Route>
        <Route path="/kurz-pridani" component={CourseAdd}></Route>
        <Route path="/treninky/:id" component={TrainingPlanDetail}></Route>
        <Route path="/treninky" component={TrainingPlanList}></Route>
        <Route path="/" exact>
          <Hero />
          <Features />
          <Pricing />
          <MealPlan />
          <TrainingPlan />
          <Faq />
          <Testimonials />
        </Route>
      </Switch>
      <Footer />
    </main>
  );
};

export default App;
