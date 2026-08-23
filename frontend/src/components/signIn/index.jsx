import { useNavigate } from 'react-router-dom';
import '../../assets/css/signUp.css';
import Navbar from '../navbar';
import { useState } from 'react';

export default function SignIn() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError("");
  };

  const getUser = async () => {
    if (!formData.email || !formData.password) {
      setError("All fields are required");
      return;
    }

    setLoading(true);
    
    try {
      const req = await fetch("https://barber-shop-pearl-sigma.vercel.app/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ 
          email: formData.email, 
          password: formData.password 
        })
      });

      const res = await req.json();

      if (!req.ok) {
        setError(res.message);
        return;
      }
      
      localStorage.setItem("user", JSON.stringify(res.user));
      localStorage.setItem("signInId", res.signInId);
      
      // alert("Login success");
      navigate('/profile');

    } catch (error) {
      console.error(error);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* <Navbar /> */}
      <section className='sc-signUp'>
        <div className='signUpDiv'>
          <h1>Sign In Now!</h1>
          
          {error && <div className="error-message">{error}</div>}
          
          <label htmlFor="em">Email*</label>
          <input 
            name="email"
            value={formData.email} 
            type="email" 
            placeholder='Email' 
            id='em' 
            onChange={handleChange}
          />

          <label htmlFor="pw">Password*</label>
          <input 
            name="password"
            value={formData.password} 
            type="password" 
            placeholder='Password' 
            id='pw' 
            onChange={handleChange}
          />

          <button onClick={getUser} className='btnSignUp' disabled={loading}>
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </div>
      </section>
    </>
  )
}