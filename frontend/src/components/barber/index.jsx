import { useState, useEffect } from "react";
import '../../assets/css/barber.css';
import { FaInstagram } from "react-icons/fa6";
import Navbar from "../navbar";
import { Link } from "react-router-dom";



export default function Barber() {
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
            {/* <Navbar/> */}
            <section className="barberSec">
                <div className="fDiv">
                    <h1>Our Barbers</h1>
                    <p>Meet the master barbers behind every perfect cut at BarberKraft.</p>
                    <p> <span> <Link to={'/'}>Home</Link> /</span> Barbers </p>
                </div>
                <div className="bsecdiv">
                    <div>
                        <p className="section-subtitle">The Crew</p>
                        <p className="section-title">Skilled Hands, Sharp Results</p>
                        <p className="section-description">Each of our barbers brings a unique specialty and years of experience to the chair. Find <br /> the right barber for your style.</p>
                    </div>
                    <div className="divB">
                        {data.map((e, i) => {
                            return (
                                <div key={i} className="eachB">
                                    <div className="eachbImg" style={{ backgroundImage: `url(${e.img})` }}></div>
                                    <div className="eachpDiv">
                                        <p className="barber-name">{e.name}</p>
                                        <p className="barber-post">{e.post}</p>
                                        <p className="desc">{e.desc}</p>
                                        <div className="post-div">
                                            {e.specialties.map((e, i) => {
                                                return (
                                                    <p className="post-p" key={i}>{e}</p>
                                                )
                                            })}
                                        </div>
                                        <div className="post-div">
                                            <div>
                                                <p className="experience">{e.experience}+ years experience</p>
                                            </div>
                                            <div>
                                                <span><FaInstagram /></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <div className="fDiv">
                        <h1>Find Your Barber</h1>
                        <p>Book with any of our barbers online. Not sure who to choose? We'll match <br /> you with the right barber for your style.</p>
                        <button>Book Now</button>
                    </div>
                </div>
            </section>
        </>
    )
}


// import { LuKeyRound } from "react-icons/lu";
// import { PiScissorsLight } from "react-icons/pi";
// import { HiOutlinePaintBrush } from "react-icons/hi2";
// import { VscSmiley } from "react-icons/vsc";
// import { PiStarFourLight } from "react-icons/pi";
// import { HiOutlineUserGroup } from "react-icons/hi2";
