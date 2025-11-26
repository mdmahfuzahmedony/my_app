
import FeatureProduct from "./Component/FeatureProduct";
import HeroSection from "./Component/Herosection";
import TestimonialSection from "./Component/testimonial";
import WhyChoose from "./Component/WhyChoose";

export default function Home() {
  return (
    <div>
  <HeroSection></HeroSection>
   <FeatureProduct/>
   <WhyChoose></WhyChoose>
   <TestimonialSection></TestimonialSection>
    </div>
 
   
   
  );
}
