import '../../assets/css/contact.css';
import Navbar from '../navbar';
import { MdOutlineMailOutline } from "react-icons/md";
import { FiPhone } from "react-icons/fi";
import { LuMapPin } from "react-icons/lu";
import { HiOutlineClock } from "react-icons/hi";
import { useState } from 'react';


export default function Contact() {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [subject, setSubject] = useState('')
    const [message, setMessage] = useState('')

    const [nameError, setNameError] = useState('')
    const [emailError, setEmailError] = useState('')
    const [subjectError, setSubjectError] = useState('')
    const [messageError, setMessageError] = useState('')

    const addMessage = async () => {
        const regexAnun = /^[A-Z](?=.*[!@#$%^&*]).{7,9}$/;
        const regexEmail = /^[a-zA-Z0-9._%+-]{8,16}@(gmail\.com|mail\.ru|yahoo\.com)$/;

        const nameValid = regexAnun.test(name);
        const emailValid = regexEmail.test(email);
        const subjectValid = subject.length > 0;
        const messageValid = message.length > 0;

        setNameError(nameValid ? '' : 'Անունը սխալ է');
        setEmailError(emailValid ? '' : 'Email-ը սխալ է');
        setSubjectError(subjectValid ? '' : 'Թեման սխալ է');
        setMessageError(messageValid ? '' : 'Հաղորդագրությունը սխալ է');

        if (nameValid && emailValid && subjectValid && messageValid) {
            try {
                await fetch("https://barber-shop-api.vercel.app/contacts", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        name,
                        email,
                        subject,
                        message
                    })
                });
                alert("Հաղորդագրությունը հաջողությամբ ուղարկվեց");
            } catch (error) {
                console.error(error);
            }
        }
    }

    return (
        <>
            {/* <Navbar /> */}
            <div className="contact">
                <div className="contact-container">

                    <div className="contact-left">
                        <h2>Send Us a Message</h2>
                        <p>Drop us a line and we’ll get back to you within 24 hours.</p>

                        <div className="form-row">
                            <div style={{ flex: 1 }}>
                                <input type="text" placeholder="John Doe" onChange={(e) => setName(e.target.value)} />
                                {nameError && <p style={{ color: "red", fontSize: "12px", marginTop: "-10px", marginBottom: "10px" }}>{nameError}</p>}
                            </div>
                            <div style={{ flex: 1 }}>
                                <input type="email" placeholder="john@example.com" onChange={(e) => setEmail(e.target.value)} />
                                {emailError && <p style={{ color: "red", fontSize: "12px", marginTop: "-10px", marginBottom: "10px" }}>{emailError}</p>}
                            </div>
                        </div>

                        <div style={{ width: "100%" }}>
                            <input onChange={(e) => setSubject(e.target.value)}
                                type="text"
                                placeholder="Booking inquiry, group event, feedback..."
                            />
                            {subjectError && <p style={{ color: "red", fontSize: "12px", marginTop: "-10px", marginBottom: "10px" }}>{subjectError}</p>}
                        </div>

                        <div style={{ width: "100%" }}>
                            <textarea placeholder="Tell us how we can help..." onChange={(e) => setMessage(e.target.value)}></textarea>
                            {messageError && <p style={{ color: "red", fontSize: "12px", marginTop: "-10px", marginBottom: "10px" }}>{messageError}</p>}
                        </div>

                        <button onClick={addMessage}>
                            Send Message →
                        </button>
                    </div>

                    <div className="contact-right">
                        <h2>Visit the Shop</h2>
                        <p>Walk-ins welcome. Located in the heart of Brooklyn.</p>

                        <div className="info">
                            <div className="info-item">
                                <span><MdOutlineMailOutline /></span>
                                <div>
                                    <h4>Email</h4>
                                    <p>hello@barberkraft.com</p>
                                </div>
                            </div>

                            <div className="info-item">
                                <span><FiPhone /></span>
                                <div>
                                    <h4>Phone</h4>
                                    <p>(555) 741-2580</p>
                                </div>
                            </div>

                            <div className="info-item">
                                <span><LuMapPin /></span>
                                <div>
                                    <h4>Address</h4>
                                    <p>123 Main Street, Brooklyn, NY 11201</p>
                                </div>
                            </div>

                            <div className="info-item">
                                <span><HiOutlineClock /></span>
                                <div>
                                    <h4>Business Hours</h4>
                                    <p>Mon: Closed</p>
                                    <p>Tue - Fri: 9:00 AM - 7:00 PM</p>
                                    <p>Sat: 8:00 AM - 6:00 PM</p>
                                    <p>Sun: 10:00 AM - 4:00 PM</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );

}


