import { useState, useEffect } from "react";
import '../../assets/css/about.css';
import { FaInstagram } from "react-icons/fa6";
import Navbar from "../navbar";
import { GoShieldCheck } from "react-icons/go";
import { Link } from "react-router-dom";



export default function About() {
    const [data, setData] = useState([])

    const getData = async () => {
        try {
            const req = await fetch('https://barber-shop-pearl-sigma.vercel.app/getBarbers');
            const res = await req.json()
            setData(res)
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <>
            {/* <Navbar /> */}
            <section className="aboutSec">
                <div className="fDiv">
                    <h1>About BarberKraft</h1>
                    <p>Brooklyn's trusted barbershop since 2011. Classic craftsmanship, modern <br /> style.</p>
                    <p> <span> <Link to={'/'}>Home</Link> /</span> About </p>
                </div>
                <div className="ab">
                    <p className="ab-subtitle">Our Story</p>
                    <p className="ab-title">Built on Brotherhood & Blades</p>
                    <p className="ab-orange"><i>“A great barbershop isn't just about haircuts. It's about community, craft, and making every man who walks through the door feel like a million bucks.”</i></p>
                    <p className="ab-description">BarberKraft was founded by Marcus Johnson in 2011 in the heart of Brooklyn. What started as a single chair in a small storefront has grown into one of the borough's most respected grooming destinations, serving over 10,000 clients.</p>
                    <p className="ab-description">We believe the barbershop is more than a place to get a cut. It's a community hub, a place to decompress, and a space where every man can look and feel his best. Our barbers are craftsmen who take pride in every fade, every shave, and every conversation.</p>
                </div>
                <div className="valueDiv">
                    <p className="section-title">Our Values</p>
                    <p className="section-description">The principles that guide every cut.</p>
                    <div className="vDiv">
                        <div>
                            <span><GoShieldCheck /></span>
                            <p>Mastery of Craft</p>
                            <p>Our barbers train continuously to perfect both classic and modern techniques. We never stop learning.</p>
                        </div>
                        <div>
                            <span><GoShieldCheck /></span>
                            <p>Respect & Community</p>
                            <p>Every client is treated like family. Our shop is an inclusive space where everyone is welcome.</p>
                        </div>
                        <div>
                            <span><GoShieldCheck /></span>
                            <p>Premium Experience</p>
                            <p>From the products we use to the atmosphere we create, every detail is designed for excellence.</p>
                        </div>
                    </div>
                </div>
                <div className="bDiv">
                    <p className="section-title">Meet the Crew</p>
                    <p className="section-description">The barbers behind the chairs.</p>
                    <div className="bDiv-d">
                        {data.map((e, i) => {
                            return (
                                <div key={i} className="bbDiv">
                                    <div className="bimg" style={{backgroundImage: `url(${e.img})`}}></div>
                                    <p>{e.name}</p>
                                    <p>{e.post}</p>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div className="fDiv">
                    <h1>Ready for Your Best Cut?</h1>
                    <p>Book your appointment today and experience the BarberKraft difference.</p>
                    <button>Book Now</button>
                </div>
            </section>
        </>
    )
}