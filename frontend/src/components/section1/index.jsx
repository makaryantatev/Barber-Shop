import '../../assets/css/section1.css';
import { useEffect, useState } from 'react';

export default function Section1() {

    const [data, setData] = useState([]);

    const [tiv1, setTiv1] = useState(0);
    const [tiv2, setTiv2] = useState(0);
    const [tiv3, setTiv3] = useState(0);
    const [tiv4, setTiv4] = useState(0);

    const getData = async () => {
        try {
            const req = await fetch('https://barber-shop-pearl-sigma.vercel.app/getQuantities');
            const res = await req.json();
            setData(res);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    useEffect(() => {
        if (!data || data.length < 4) return;

        const duration = 1000;
        const intervalTime = 20;
        const steps = duration / intervalTime;

        const target1 = data[0].quantity;
        const target2 = data[1].quantity;
        const target3 = data[2].quantity;
        const target4 = data[3].quantity;

        const step1 = target1 / steps;
        const step2 = target2 / steps;
        const step3 = target3 / steps;
        const step4 = target4 / steps;

        const interval = setInterval(() => {
            setTiv1(prev => (prev < target1 ? prev + step1 : target1));
            setTiv2(prev => (prev < target2 ? prev + step2 : target2));
            setTiv3(prev => (prev < target3 ? prev + step3 : target3));
            setTiv4(prev => (prev < target4 ? prev + step4 : target4));
        }, intervalTime);

        return () => clearInterval(interval);
    }, [data]);

    return (
         <section className='sec1'>  {/* Add dark mode support in CSS */}
            <div className='sc-div'>
                {data.map((e, index) => (
                    <div key={index} className="stat-card">  {/* Added class */}
                        <p className="stat-number">
                            {index === 3
                                ? [tiv1, tiv2, tiv3, tiv4][index].toFixed(1)
                                : Math.floor([tiv1, tiv2, tiv3, tiv4][index])
                            }
                            {(index < 2 ? '+' : '')}
                        </p>
                        <p className="stat-category">{e.category}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}