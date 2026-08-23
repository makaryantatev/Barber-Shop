import '../../assets/css/footer.css';
import logo from '../../assets/image/logo.svg';
import { FaFacebook } from "react-icons/fa";
import { BsInstagram } from "react-icons/bs";
import { FaXTwitter } from "react-icons/fa6";
import { FiMapPin } from "react-icons/fi";
import { FiPhone } from "react-icons/fi";
import { MdOutlineEmail } from "react-icons/md";


export default function FooterDiv() {
    return (
        <>
            <footer>
                <div className='f-d1'>
                    <div>
                        <img src={logo} alt="BarberKraft Logo" />
                        <p>Premium grooming for the modern gentleman. Expert barbers, classic techniques, and a barbershop experience you'll look forward to every time.</p>
                        <div>
                            <span><FaFacebook /></span>
                            <span><BsInstagram /></span>
                            <span><FaXTwitter /></span>
                        </div>
                    </div>
                    <div>
                        <p>Services</p>
                        <p>Classic Haircut</p>
                        <p>Skin Fade</p>
                        <p>Beard Trim</p>
                        <p>Hot Towel Shave</p>
                    </div>
                    <div>
                        <p>Info</p>
                        <p>About Us</p>
                        <p>Our Barbers</p>
                        <p>Gallery</p>
                        <p>Blog</p>
                    </div>
                    <div>
                        <p>Shop</p>
                        <p>Pricing</p>
                        <p>Book Now</p>
                        <p>Contact</p>
                        <p>FAQ</p>
                    </div>
                    <div>
                        <p>Contact Us</p>
                        <p><span><FiMapPin /></span> 123 Main Street Brooklyn, NY 11201 </p>
                        <p><span><FiPhone /></span> (555) 741-2580 </p>
                        <p><span><MdOutlineEmail /></span> hello@barberkraft.com</p>
                    </div>
                </div>
                <hr />
                <div className='f-d2'>
                    <div>
                        <p>© {new Date().getFullYear()} BarberKraft. All rights reserved.</p>
                    </div>
                    <div>
                        <p>Privacy Policy</p>
                        <p>Terms of Service</p>
                        <p>Style Guide</p>
                    </div>
                </div>
            </footer>
        </>
    )
}