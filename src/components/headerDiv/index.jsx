import '../../assets/css/headerDiv.css';
import { useEffect, useState } from 'react';
import { FiPhone } from "react-icons/fi";
import { MdArrowRightAlt } from "react-icons/md";
import { GoDotFill } from "react-icons/go";
import Appointment from '../appointment';


const words = ['Defining Character', 'Sharpening Looks', 'Elevating Standards', 'Building Confidence'];

export default function HeaderDiv() {
    const [index, setIndex] = useState(0);
    const [fade, setFade] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
            setFade(false);

            setTimeout(() => {
                setIndex((prev) => (prev + 1) % words.length);
                setFade(true);
            }, 500);
        }, 2000);

        return () => clearInterval(interval);
    }, []);

    return (
        <>
            <div style={{ display: 'flex' }}>
                <div className='animationDiv'></div>
                <div className='headerDiv'>
                    <div className='hd-d2'>
                        <p>Crafting Style,</p>
                        <p className={fade ? "fade-in" : "fade-out"}>
                            {words[index]}
                        </p>
                        <p>Brooklyn's premier barbershop where classic craftsmanship meets modern style. Expert barbers, premium products, and an experience you'll look forward to every time.</p>
                        <div>
                            <button> Book Apointment <span><MdArrowRightAlt /></span></button>
                            <button> <span><FiPhone /></span> Call (555) 741-2580</button>
                        </div>
                        <div className='hd2-d2'> <span><GoDotFill /></span> Open Now · Closes 8:00 PM</div>
                    </div>
                    <Appointment />
                </div>
            </div>
        </>
    )
}