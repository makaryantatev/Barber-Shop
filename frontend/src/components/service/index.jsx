import { useState, useEffect } from "react";
import '../../assets/css/service.css';
import { Link } from "react-router-dom";
import { IoCheckmarkOutline } from "react-icons/io5";
import { VscSmiley } from "react-icons/vsc";
import { PiStarFourLight } from "react-icons/pi";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { PiScissorsLight } from "react-icons/pi";
import { LuKeyRound } from "react-icons/lu";
import { HiOutlinePaintBrush } from "react-icons/hi2";

export default function Service() {
    const icons = {
        scissors: PiScissorsLight,
        key: LuKeyRound,
        brush: HiOutlinePaintBrush,
        smile: VscSmiley,
        star: PiStarFourLight,
        group: HiOutlineUserGroup
    };
    const [data, setData] = useState([])

    const getData = async () => {
        try {
            const req = await fetch('https://barber-shop-api.vercel.app/fullServ');
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
            <section className="barberSec">
                <div className="fDiv">
                    <h1>Our Services</h1>
                    <p>Complete grooming services from classic haircuts to premium shaves. Every service includes a consultation.</p>
                    <p> <span> <Link to={'/'}>Home</Link> /</span> Services </p>
                </div>
                <div className="bsecdiv">
                    <div>
                        <p className="section-title">Full Service Menu</p>
                        <p className="section-description">We offer a comprehensive range of men's grooming services for every style and need.</p>
                    </div>
                    <div className="servDiv">
                        {data.map((e, i) => {
                            const Icon = icons[e.icon];

                            return (
                                <div key={i} className="eachFServ">
                                    <div className="icDiv">
                                        <span>{Icon && <Icon />}</span>
                                    </div>
                                    <p>{e.sname}</p>
                                    <p>{e.desc}</p>
                                    <div className="subtask">
                                        {e.subtasks.map((e) => (
                                            <p className="subtask-p"><span><IoCheckmarkOutline /></span>{e}</p>
                                        ))}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <div>
                        <p className="section-title">Your Visit</p>
                        <p className="section-description">A simple, relaxed process from door to chair.</p>
                        <div className="serv-div2">
                            <div>
                                <div>1</div>
                                <p>Book Online</p>
                                <p>Pick your barber, service, and time. It takes 30 seconds.</p>
                            </div>
                            <div>
                                <div>2</div>
                                <p>Check In</p>
                                <p>Arrive, grab a drink, and relax. Your barber will be ready for you.</p>
                            </div>
                            <div>
                                <div>3</div>
                                <p>Get Styled</p>
                                <p>Consult with your barber and enjoy a precision cut tailored to you.</p>
                            </div>
                            <div>
                                <div>4</div>
                                <p>Look Sharp</p>
                                <p>Leave looking and feeling your absolute best. See you next time.</p>
                            </div>
                        </div>
                    </div>
                    <div className="fDiv">
                        <h1>Ready to Get Sharp?</h1>
                        <p>Book your appointment today. Walk-ins welcome, appointments recommended.</p>
                        <button>Book Now</button>
                    </div>
                </div>
            </section>
        </>
    )
}


