import '../../assets/css/navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import ThemeToggle from '../themeToggle';
import logo from '../../assets/image/logo.svg'

export default function Navbar() {

    const navigate = useNavigate();

    const user = localStorage.getItem("user");

    const handleLogout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("signInId");

        navigate("/signIn");
    };

    return(
        <>
            <nav>
                <div className='nav-d1'>
                    <Link to={'/'}>
                        <img src={logo} alt="" />
                    </Link>
                </div>

                <div className='nav-d2'>
                    <span><Link to={'/about'}>About</Link></span>
                    <span><Link to={'/servicesFull'}>Services</Link></span>
                    <span><Link to={'/barber'}>Barbers</Link></span>
                    <span><Link to={'/pricing'}>Pricing</Link></span>
                    <span><Link to={'/blog'}>Blog</Link></span>
                    <span><Link to={'/contact'}>Contact</Link></span>
                </div>

                <div className='nav-d3'>

                    {
                        user ? (
                            <button onClick={handleLogout}>
                                Log Out
                            </button>
                        ) : (
                            <>
                                <span className='s1'>
                                    <Link to={'/signUp'}>Sign Up</Link>
                                </span>

                                <span>/</span>

                                <span className='s1'>
                                    <Link to={'/signIn'}>Sign In</Link>
                                </span>
                            </>
                        )
                    }

                    <span className='theme'><ThemeToggle/></span>

                    <button className='profilee'>
                        <Link to={'/profile'}>Profile</Link>
                    </button>

                </div>
            </nav>
        </>
    )
}