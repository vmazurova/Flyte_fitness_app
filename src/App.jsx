import { Route, Switch } from "react-router-dom"; // Importujte Route a Switch
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
//import TrainingPlanLogin from "./pagesLogin/TrainingPlan.jsx";
//import Settings from "./pagesLogin/Settings.jsx";
//import Payments from "./pagesLogin/Payments.jsx";
import MemberDetail from "./pagesLogin/MemberDetail.jsx";
//import Courses from "./pagesLogin/Courses.jsx";
import LogOut from "./pagesLogin/LogOut.jsx";
import ForgotPassword from "./auth/ForgotPassword.jsx";
import CoursesList from "./pagesLogin/CoursesList.jsx";
const App = () => {
  return (
    <main className="overflow-hidden">
      <Header />
      <Switch>
        {/* <Route path="/nastaveni" component={Settings} />
        <Route path="/platby" component={Payments} />
        <Route path="/jidelnicek" component={MealPlan} />
        
        <Route path="/kurzy" component={Courses} /> 
         <Route path="/treninkovy-plan" component={TrainingPlanLogin} />*/}
        <Route path="/auth/registrace" component={SignUp} />
        <Route path="/auth/prihlaseni" component={Login} />
        <Route path="/osobni-slozka" component={MemberDetail} />
        <Route path="/odhlaseni" component={LogOut} />
        <Route path="/zapomenute-heslo" component={ForgotPassword} />
        <Route path="/vsechny-kurzy" component={CoursesList} />

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
