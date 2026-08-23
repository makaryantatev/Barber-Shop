// Profile.jsx
import '../../assets/css/profile.css';
import { useEffect, useState } from 'react';
import Navbar from '../navbar';
import { useNavigate } from 'react-router-dom';
import ReviewSection from '../reviews';

export default function Profile() {
    const [signIns, setSignIns] = useState([]);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem("user"));

        if (!userData) {
            navigate('/signIn');
            return;
        }

        setUser(userData);
        getData(userData._id);
    }, [navigate]);

    const getData = async (userId) => {
        try {
            const req = await fetch(`http://localhost:3001/getUsersLoggedIn/${userId}`);
            const res = await req.json();
            setSignIns(res);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        const signInId = localStorage.getItem("signInId");

        if (signInId) {
            await fetch("http://localhost:3001/logout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ signInId })
            });
        }

        localStorage.removeItem("user");
        localStorage.removeItem("signInId");
        navigate('/signIn');
    };

    if (loading) return <div>Loading...</div>;

    return (
        <>
            {/* <Navbar /> */}
            <section className='profile'>
                <div className="profile-header">
                    <h2>Welcome, {user?.name} {user?.surname}!</h2>
                    <button onClick={handleLogout} className="logout-btn">Logout</button>
                </div>
                <ReviewSection
                    userId={user?._id}
                    onlyUserReviews={true}
                />
            </section>
        </>
    );
}