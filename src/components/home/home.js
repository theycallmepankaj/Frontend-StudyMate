// import About from "../About";
// import CTASection from "../HowItWork";
import Features from "../Features";
import Header from "../Header";
import HeroSection from "../HeroSection";
import Register from "../Register";
import HowItWorks from "../HowItWork";
import GetStart from "../GetStart";
import Footer from "../Footer";
import LogIn from "../login";

function Home(){
    return <>
  <Header/>
  <HeroSection/>
  <Features/> 
   {/* <About/> */}
  <HowItWorks/>
  <GetStart/>
  {/* <Footer/> */}
  {/* <Register/> 
   <LogIn/> */}
    </>
}

export default Home;