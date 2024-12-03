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
const App = () => {
  const location = useLocation();

  const hideHeaderPaths = [
    "/osobni-slozka",
    "/vsechny-kurzy",
    "/auth/Registrace",
    "/auth/registrace",
    "/auth/prihlaseni",
  ];
  const showHeader = !hideHeaderPaths.includes(location.pathname);

  return (
    <main className="overflow-hidden">
      {showHeader && <Header />}
      <Switch>
        <Route path="/auth/registrace" component={SignUp} />
        <Route path="/auth/prihlaseni" component={Login} />
        <Route path="/osobni-slozka" component={MemberDetail} />
        <Route path="/odhlaseni" component={LogOut} />
        <Route path="/zapomenute-heslo" component={ForgotPassword} />
        <Route path="/vsechny-kurzy" component={CoursesList} />
        <Route path="/detail/:id" component={CoursesDetail} />
        <Route path="/" exact>
          <Hero />
          <Features />
          <Pricing />
          <MealPlan />
          <TrainingPlan />
          <Faq />
          <Testimonials />
        </Route>
        <toastContainer />
      </Switch>
      <Footer />
    </main>
  );
};

export default App;
