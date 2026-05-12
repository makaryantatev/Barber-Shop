import Faq from "../../components/faq";
import ReviewSection from "../../components/reviews";
import Section1 from "../../components/section1";
import Section2 from "../../components/section2";
import Section3 from "../../components/section3";
import Section6 from "../../components/section6";

export default function Main(){
    return(
        <>
            <Section1/>
            <Section2/>
            <Section3/>
            {/* <Section6/> */}
            <ReviewSection limit={4}/>
            <Faq/>
        </>
    )
}