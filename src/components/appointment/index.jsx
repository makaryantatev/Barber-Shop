import { useEffect, useState } from 'react';
import '../../assets/css/appointment.css';
import { FaRegCircleQuestion } from "react-icons/fa6";
import { IoIosCheckmark } from "react-icons/io";




// import e from 'express';

export default function Appointment() {

    const [data, setData] = useState([]);
    const [barb, setBarb] = useState([]);
    const [step, setStep] = useState(1);
    const [comfirm, setComfirm] = useState(false)

    const [booking, setBooking] = useState({
        service: null,
        barber: null,
        time: null,
        name: '',
        phone: ''
    });

    const getData = async () => {
        try {
            const req = await fetch('http://localhost:3001/fullServHeader');
            const barbRes = await fetch('http://localhost:3001/getBarbers');
            const res = await req.json();
            const barbReq = await barbRes.json();

            setData(res);
            setBarb(barbReq);

        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    const handleSubmit = async () => {
        try {
            await fetch('http://localhost:3001/appointments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(booking)
            });

            setBooking({
                service: null,
                barber: null,
                time: null,
                name: '',
                phone: ''
            });

            setStep(1);
            setComfirm(true)
            setComfirm(true);

            setTimeout(() => {
                const el = document.querySelector('.booked');
                if (el) el.classList.add('hide');

                setTimeout(() => {
                    setComfirm(false);
                }, 300);
            }, 3000);


        } catch (err) {
            console.log(err);
        }
    };

    const generateTimes = () => {
        const times = [];   

        for (let hour = 9; hour <= 17; hour++) {
            times.push(`${hour}:00`);
            if (hour !== 17) times.push(`${hour}:30`);
        }

        return times;
    };

    const times = generateTimes();

    const formatTime = (time) => {
        let [hour, min] = time.split(':');
        hour = Number(hour);

        const ampm = hour >= 12 ? 'PM' : 'AM';
        const h = hour % 12 === 0 ? 12 : hour % 12;

        return `${h}:${min} ${ampm}`;
    };

    const formatDate = (date) => {
        return date
            .toLocaleDateString('en-US', {
                weekday: 'short',
                month: 'short',
                day: 'numeric'
            })
            .replace(
                /(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)/,
                m => m.toLowerCase()
            );
    };
    // const today = formatDate(new Date());
    return (
        <div className={`hd-d3 ${step === 4 ? 'big' : 'small'}`}>

            {comfirm &&
                <div className='booked'>
                    <p><span><IoIosCheckmark /></span></p>
                    <p>Appointment booked successfully! Check your email for confirmation.</p>
                </div>
            }

            <div className='hd-d11'>
                <p>Book Your Appointment</p>
                <p>Quick & easy online booking</p>
            </div>

            <div className='hd-d hd-d1'>
                <p className={step === 1 ? 'activeStep' : ''}><span>1</span> Service</p>
                <p className={step === 2 ? 'activeStep' : ''}><span>2</span> Barber</p>
                <p className={step === 3 ? 'activeStep' : ''}><span>3</span> Time</p>
                <p className={step === 4 ? 'activeStep' : ''}><span>4</span> Confirm</p>
            </div>

            <div className='hd-d'>

                {step === 1 && (
                    <>
                        <p className='ser'>Select a service:</p>
                        {data.map((item) => (
                            <div
                                key={item._id}
                                onClick={() => setBooking(prev => ({ ...prev, service: item }))}
                                className={`diver ${booking.service?._id === item._id ? 'active' : ''}`}
                            >
                                <div>
                                    <div className='radio'></div>
                                    <p className='text'>{item.name}</p>
                                    <p className='min'>{item.min} min</p>
                                </div>
                                <p className='price'>${item.price}</p>
                            </div>
                        ))}
                    </>
                )}

                {step === 2 && (
                    <>
                        <p className='ser'>Choose your barber:</p>
                        <div className='barb'>

                            {barb.map((item) => (
                                <div
                                    key={item._id}
                                    onClick={() => setBooking(prev => ({ ...prev, barber: item }))}
                                    className={`diver1 ${booking.barber?._id === item._id ? 'active' : ''}`}
                                >
                                    <div style={{ backgroundImage: `url(${item.img})` }}></div>
                                    <p>{item.name}</p>
                                </div>
                            ))}

                            <div
                                className={`diver1 ${booking.barber === null ? 'active' : ''}`}
                                onClick={() => setBooking(prev => ({ ...prev, barber: null }))}
                            >
                                <div className='any'>
                                    <FaRegCircleQuestion />
                                </div>
                                <p>Any?</p>
                            </div>

                        </div>
                    </>
                )}

                {step === 3 && (
                    <>
                        <p className='ser'>Choose time:</p>
                        <div className='barb3'>
                            {times.map((time, i) => (
                                <div
                                    key={i}
                                    onClick={() => setBooking(prev => ({ ...prev, time }))}
                                    className={`diver2 ${booking.time === time ? 'active' : ''}`}
                                >
                                    <p>{formatTime(time)}</p>
                                </div>
                            ))}
                        </div>
                    </>
                )}

                {step === 4 && (
                    <>
                        <p className='ser'>Confirm your booking:</p>

                        <div className='confirmBox'>
                            <div className='comfirm-div'>
                                <div>
                                    <p>Service:</p>
                                </div>
                                <div>
                                    <p>{booking.service?.name}</p>
                                </div>
                            </div>
                            <div className='comfirm-div'>
                                <div>
                                    <p>Barber:</p>
                                </div>
                                <div>
                                    <p>{booking.barber ? booking.barber.name : 'Any'}</p>
                                </div>
                            </div>
                            <div className='comfirm-div'>
                                <div>
                                    <p>Date: </p>
                                </div>
                                <div>
                                    <p>{formatDate(new Date())}</p>
                                </div>
                            </div>
                            <div className='comfirm-div'>
                                <div>
                                    <p>Time: </p>
                                </div>
                                <div>
                                    <p>{formatTime(booking.time)}</p>
                                </div>
                            </div>
                            <div className='comfirm-div'>
                                <div>
                                    <p>Duration: </p>
                                </div>
                                <div>
                                    <p>{booking.service?.min} min</p>
                                </div>
                            </div>
                            <hr style={{ margin: '10px 0' }} />
                            <div className='comfirm-div'>
                                <div>
                                    <p>Price:</p>
                                </div>
                                <div>
                                    <p>${booking.service?.price}</p>
                                </div>
                            </div>
                        </div>
                        <div className='confirm-input'>
                            <input type="text" name="" id="" placeholder='Your name' />
                            <input type="tel" name="" id="" placeholder='Phone number' />
                        </div>


                    </>
                )}

            </div>

            <div className='hd-d btns'>

                {step > 1 && (
                    <button className='backBtn' onClick={() => setStep(prev => prev - 1)}>
                        Back
                    </button>
                )}

                {step < 4 ? (
                    <button
                        style={{ width: step >= 2 ? '49%' : '100%' }}
                        className='nextBtn'
                        onClick={() => {
                            if (step === 1 && !booking.service) return;
                            if (step === 2 && !booking.barber && booking.barber !== null) return;
                            if (step === 3 && !booking.time) return;

                            setStep(prev => prev + 1);
                        }}
                    >
                        Next Step
                    </button>
                ) : (
                    <button className='confirmBtn' onClick={handleSubmit}>
                        Confirm
                    </button>
                )}

            </div>

        </div>
    );
}