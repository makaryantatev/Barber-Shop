import { useEffect, useState } from 'react';
import '../../assets/css/section2.css';

export default function Section2() {

    const [data, setData] = useState([])
    const [cate, setCat] = useState('all')

    const getService = async () => {
        try {
            const req = await fetch('https://barber-shop-pearl-sigma.vercel.app/getServices');
            const res = await req.json()
            setData(res);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getService()
    }, [])

    const uniqueCategories = [...new Set(data.map(item => item.category))]
    const capitalize = (word) => {
        return word.charAt(0).toUpperCase() + word.slice(1)
    }
    const filteredData =
        cate === 'all'
            ? data
            : data.filter(item => item.category === cate)

    const groupedData = filteredData.reduce((acc, item) => {
        if (!acc[item.category]) {
            acc[item.category] = []
        }
        acc[item.category].push(item)
        return acc
    }, {})
    return (
        <>
            <section className="section2">  {/* Added class */}
                <div className="container">  {/* Added class */}
                    <p className="section-subtitle">Services</p>
                    <p className="section-title">Our Service Menu</p>
                    <p className="section-description">
                        From classic cuts to premium grooming, we offer a full range of barbershop services to keep you looking sharp.
                    </p>

                    <div className="category-buttons">
                        <button className={cate === 'all' ? 'active' : ''} onClick={() => setCat('all')}> All </button>
                        {uniqueCategories.map((cat, index) => {
                            return (
                                <button key={index} onClick={() => setCat(cat)} className={cate === cat ? 'active' : ''}>
                                    {capitalize(cat)}
                                </button>
                            )
                        })}
                    </div>

                    <div className="services-list">
                        {Object.keys(groupedData).map((cat) => (
                            <div key={cat} className="category-block">

                                <div style={{ width: '70%', margin: 'auto' }}>
                                    <h2 className="service-category">{capitalize(cat)}</h2>
                                    <hr />
                                </div>
                                {groupedData[cat].map((e, index) => (
                                    <div key={index} className="service-card">

                                        <div className="service-content">
                                            <div className="service-info">
                                                <span className="service-name">{e.serName}</span>
                                                <span className="service-duration">{e.duration} min</span>
                                                <p className="service-description">{e.describ}</p>
                                            </div>

                                            <div className="service-price">
                                                <p>${e.price}</p>
                                            </div>
                                        </div>

                                    </div>
                                ))}

                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    )
}