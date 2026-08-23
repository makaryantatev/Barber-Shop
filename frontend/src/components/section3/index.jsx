import { useState, useEffect } from "react";
import '../../assets/css/section3.css';
import { CiClock2 } from "react-icons/ci";
import { IoIosArrowRoundForward } from "react-icons/io";
import { IoIosArrowRoundBack } from "react-icons/io";


export default function Section3() {
    const [data, setData] = useState([])
    const [index, setIndex] = useState(0);
    const visibleBarbers =
        data.length >= 3
            ? [
                data[index % data.length],
                data[(index + 1) % data.length],
                data[(index + 2) % data.length],
            ]
            : data;

    const getData = async () => {
        try {
            const req = await fetch('https://barber-shop-api.vercel.app/getBarbers');
            const res = await req.json()
            setData(res)
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getData()
    }, [])

    const next = () => {
        setIndex((prevIndex) => (prevIndex + 1) % data.length);
    };

    const prev = () => {
        setIndex((prevIndex) =>
            prevIndex === 0 ? data.length - 1 : prevIndex - 1
        );
    };

    return (
        <>
            <section className="section3">
                <div>
                    <p className="section-subtitle">Our Team</p>
                    <p className="section-title">Meet Your Barbers</p>
                    <p className="section-description">
                        Our master barbers bring decades of combined experience and a passion for the craft.
                    </p>
                </div>
                <div className="barber-div">

                    <div onClick={prev} className="arrows">
                        <span><IoIosArrowRoundBack /></span>
                    </div>

                    {visibleBarbers.map((e, i) => {
                        return (
                            <div className="barber" key={i}>
                                <div className="img-barber">
                                    <img src={e.img}/>
                                    <div>
                                        <p className="barber-name">{e.name}</p>
                                        <p className="barber-post">{e.post}</p>
                                    </div>
                                </div>

                                <div className="barber-text">
                                    <p className="desccc">{e.desc}</p>
                                    <p className="specialties">Specialties</p>

                                    <div className="post-div">
                                        {e.specialties.map((s, j) => (
                                            <p className="post-p" key={j}>{s}</p>
                                        ))}
                                    </div>

                                    <p className="experience">
                                        <span><CiClock2 /></span> <span>{e.experience}+ years</span>
                                    </p>
                                </div>
                            </div>
                        )
                    })}

                    <div onClick={next} className="arrows">
                        <span><IoIosArrowRoundForward /></span>
                    </div>

                </div>
            </section>
        </>
    )
}