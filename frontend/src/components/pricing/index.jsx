    import '../../assets/css/pricing.css';
import Faq from '../faq/index';
import { IoIosCheckmark } from "react-icons/io";
import { Link } from 'react-router-dom';
import { IoMdClose } from "react-icons/io";


export default function Pricing() {
    return (
        <>
            <section className='princing-sec'>
                <div className="fDiv">
                    <h1>Pricing</h1>
                    <p>Transparent pricing for every service. No hidden fees, no surprises.</p>
                    <p> <span> <Link to={'/'}>Home</Link> /</span> Pricing </p>
                </div>
                <div className='pricingDiv'>
                    <div>
                        <p className="section-subtitle">Pricing</p>
                        <p className="section-title">Service Prices</p>
                        <p className="section-description">Quality grooming at fair prices. Membership plans available for regular clients.</p>
                    </div>
                    <div>
                        <div className='priceDiv'>
                            <div className='pr-d1'>
                                <div className='pr-d'>
                                    <p>Classic Cut</p>
                                    <p>Essential grooming for the sharp man</p>
                                    <p>$35</p>
                                    <p>Per visit</p>
                                </div>
                                <div className='prc-p'>
                                    <p><span><IoIosCheckmark /></span>Traditional scissor or clipper cut</p>
                                    <p><span><IoIosCheckmark /></span>Hot lather neck shave</p>
                                    <p><span><IoIosCheckmark /></span>Hair wash and style</p>
                                    <p><span><IoIosCheckmark /></span>Product recommendations</p>
                                    <p><span className='greyspan'><IoMdClose /></span>Beard trim included</p>
                                    <p><span className='greyspan'><IoMdClose /></span>Premium add-ons</p>
                                </div>
                                <div>
                                    <button>
                                        <Link to={'/'}>Book Classic</Link>
                                    </button>
                                </div>
                            </div>
                            <div className='pr-d2'>
                                <div className='pr-d'>
                                    <p>Premium Experience</p>
                                    <p>The complete grooming package</p>
                                    <p>$65</p>
                                    <p>Per visit</p>
                                </div>
                                <div className='prc-p'>
                                    <p><span><IoIosCheckmark /></span>Haircut + beard trim</p>
                                    <p><span><IoIosCheckmark /></span>Hot towel treatment</p>
                                    <p><span><IoIosCheckmark /></span>Scalp massage</p>
                                    <p><span><IoIosCheckmark /></span>Premium product styling</p>
                                    <p><span><IoIosCheckmark /></span>Eyebrow cleanup</p>
                                    <p><span><IoIosCheckmark /></span>Complimentary beverage</p>
                                </div>
                                <div>
                                    <button>
                                        <Link to={'/'}>Book Premium</Link>
                                    </button>
                                </div>
                            </div>
                            <div className='pr-d3'>
                                <div className='pr-d'>
                                    <p>VIP Package</p>
                                    <p>The ultimate barbershop experience</p>
                                    <p>$95</p>
                                    <p>Per visit</p>
                                </div>
                                <div className='prc-p'>
                                    <p><span><IoIosCheckmark /></span>Full haircut + beard design</p>
                                    <p><span><IoIosCheckmark /></span>Hot towel straight razor shave</p>
                                    <p><span><IoIosCheckmark /></span>Scalp and face massage</p>
                                    <p><span><IoIosCheckmark /></span>Premium product styling</p>
                                    <p><span><IoIosCheckmark /></span>Face mask treatment</p>
                                    <p><span><IoIosCheckmark /></span>Take-home product sample</p>
                                </div>
                                <div>
                                    <button>
                                        <Link to={'/'}>Book VIP</Link>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <p className='mecPp'>All prices include consultation. Tips are appreciated but never expected.</p>
                    </div>
                </div>
                <Faq />
                <div className="fDiv">
                    <h1>Can't Decide? Come Try Us</h1>
                    <p>First-time clients get 20% off any service. No commitment, no pressure.</p>
                    <div>
                        <button>Book First Visit</button>
                        <button>Call (555) 741-2580</button>
                    </div>
                </div>
            </section>
        </>
    )
}