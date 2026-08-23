import { useEffect, useState } from 'react';
import '../../assets/css/faq.css';
import { FiPlus } from "react-icons/fi";


export default function Faq() {
    const [data, setData] = useState([]);
    const [openIndex, setOpenIndex] = useState(null);

    const getData = async () => {
        try {
            const req = await fetch('https://barber-shop-pearl-sigma.vercel.app/getFaq');
            const res = await req.json();
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
            <section className='faqSection'>
                <div>
                    <p className="section-subtitle">FAQ</p>
                    <p className="section-title">Frequently Asked Questions</p>
                    <p className="section-description"> Got questions? We've got answers. </p>
                </div>
                <div className='questDiv'>
                    {data.map((e, i) => {
                        return (
                            <div key={i}>
                                <div className='eachQuest'>
                                    <div>
                                        <p> {e.question} </p>
                                    </div>
                                    <div onClick={() => setOpenIndex(openIndex === i ? null : i)}>
                                        <span><FiPlus /></span>
                                    </div>
                                </div>
                                <p className={`answer ${openIndex === i ? 'open' : ''}`}>
                                    {e.answer}
                                </p>
                                <hr />
                            </div>
                        )
                    })}
                </div>
            </section>
        </>
    )
}