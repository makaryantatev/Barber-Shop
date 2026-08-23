import { useNavigate } from 'react-router-dom';
import '../../assets/css/signUp.css';
import Navbar from '../navbar';
import { useState } from 'react';

export default function SignUp() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError(''); // Clear error on change
  };

  const addUser = async () => {
    // Validation
    if (!formData.name || !formData.surname || !formData.email || !formData.password) {
      setError("All fields are required");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email");
      return;
    }

    setLoading(true);
    
    try {
      const req = await fetch("https://barber-shop-api.vercel.app/userSignUp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: formData.name,
          surname: formData.surname,
          email: formData.email,
          password: formData.password
        })
      });
      
      const res = await req.json();
      
      if (!req.ok) {
        setError(res.message);
        return;
      }
      
      alert("Sign up successful! Please sign in.");
      navigate('/signIn');

    } catch (error) {
      console.error(error);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* <Navbar /> */}
      <section className='sc-signUp'>
        <div className='signUpDiv'>
          <h1>Sign Up Now!</h1>
          
          {error && <div className="error-message">{error}</div>}
          
          <label htmlFor="nm">Name*</label>
          <input 
            name="name"
            value={formData.name} 
            type="text" 
            placeholder='Name' 
            id='nm' 
            onChange={handleChange}
          />

          <label htmlFor="snm">Surname*</label>
          <input 
            name="surname"
            value={formData.surname} 
            type="text" 
            placeholder='Surname' 
            id='snm' 
            onChange={handleChange}
          />

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
            placeholder='Password (min 6 characters)' 
            id='pw' 
            onChange={handleChange}
          />

          <label htmlFor="cpw">Confirm Password*</label>
          <input 
            name="confirmPassword"
            value={formData.confirmPassword} 
            type="password" 
            placeholder='Confirm Password' 
            id='cpw' 
            onChange={handleChange}
          />

          <button onClick={addUser} className='btnSignUp' disabled={loading}>
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </div>
      </section>
    </>
  )
}