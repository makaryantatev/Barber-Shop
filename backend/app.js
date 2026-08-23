import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import Services from "./models/service.js";
import Quantity from "./models/quantity.js";
import Mode from "./models/mode.js";
import Barber from "./models/barber.js";
import SignUp from "./models/signup.js";
import SignIn from "./models/signIn.js";
import Review from "./models/rewievs.js";
import Faq from "./models/faq.js";
import Contact from "./models/contact.js";
import FullServices from "./models/fullservices.js";
import ServicesHeader from "./models/fullservHeader.js";
import Appointment from "./models/appointment.js";
import Blog from "./models/blog.js";

import bcrypt from 'bcrypt';
const saltRounds = 10;

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to DB'))
  .catch((error) => console.log(error))


// ========== SERVICES/SECTION2 ==========


app.get('/getServices', async (req, res) => {
  try {
    const data = await Services.find();
    res.json(data)
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
})

app.get('/getQuantities', async (req, res) => {
  try {
    const data = await Quantity.find();
    res.json(data)
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
})


// ========== BARBERS/SECTION3 ==========

app.get('/getBarbers', async (req, res) => {
  try {
    const data = await Barber.find();
    res.json(data)
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
})


// ========== NEW DARK/LIGHT MODE ROUTES ==========

app.get('/getTheme', async (req, res) => {
  try {
    let theme = await Mode.findOne({ name: "user" });
    if (!theme) {
      theme = await Mode.create({ name: "user", theme: "light" });
    }
    res.json({ theme: theme.theme });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.put('/updateTheme', async (req, res) => {
  try {
    const { theme } = req.body;
    let mode = await Mode.findOne({ name: "user" });

    if (!mode) {
      mode = new Mode({ name: "user", theme: theme });
    } else {
      mode.theme = theme;
    }

    await mode.save();
    res.json({ success: true, theme: mode.theme });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// ========== SIGN UP ==========


app.post('/userSignUp', async (req, res) => {
  try {
    const { name, surname, email, password } = req.body;

    if (!name || !surname || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await SignUp.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({ message: "User with this email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new SignUp({
      name,
      surname,
      email: email.toLowerCase(),
      password: hashedPassword
    });

    await newUser.save();

    const { password: _, ...userWithoutPassword } = newUser.toObject();
    res.status(201).json(userWithoutPassword);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ========== SIGN IN ==========

app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await SignUp.findOne({ email: email.toLowerCase() });

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const signInRecord = new SignIn({
      userId: user._id
    });
    await signInRecord.save();

    const { password: _, ...userWithoutPassword } = user.toObject();

    res.json({
      user: userWithoutPassword,
      signInId: signInRecord._id
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/getUsersLoggedIn/:userId', async (req, res) => {
  try {
    const data = await SignIn.find({ userId: req.params.userId })
      .populate('userId', 'name surname email')
      .sort({ loginTime: -1 });

    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/logout', async (req, res) => {
  try {
    const { signInId } = req.body;
    await SignIn.findByIdAndUpdate(signInId, { logoutTime: new Date() });
    res.json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ========== REVIEWS ==========

app.post('/reviews', async (req, res) => {
  try {
    const { userId, text, rating } = req.body;

    if (!userId || !text || !rating) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const review = new Review({
      userId,
      text,
      rating
    });

    await review.save();
    res.status(201).json(review);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/reviews', async (req, res) => {
  try {
    const reviews = await Review.find()
      .populate('userId', 'name surname email createdAt')
      .sort({ createdAt: -1 });

    const reviewsWithTenure = reviews.map(review => {
      const user = review.userId;
      let tenure = null;

      if (user && user.createdAt) {
        const now = new Date();
        const signupDate = new Date(user.createdAt);
        const diffTime = Math.abs(now - signupDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays < 30) {
          tenure = `${diffDays} days`;
        } else if (diffDays < 365) {
          const months = Math.floor(diffDays / 30);
          tenure = `${months} month${months > 1 ? 's' : ''}`;
        } else {
          const years = Math.floor(diffDays / 365);
          tenure = `${years} year${years > 1 ? 's' : ''}`;
        }
      }

      return {
        _id: review._id,
        text: review.text,
        rating: review.rating,
        createdAt: review.createdAt,
        user: user ? {
          _id: user._id,
          name: user.name,
          surname: user.surname,
          email: user.email
        } : null,
        customerTenure: tenure
      };
    });

    res.json(reviewsWithTenure);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/reviews/user/:userId', async (req, res) => {
  try {
    const reviews = await Review.find({ userId: req.params.userId })
      .populate('userId', 'name surname email createdAt')
      .sort({ createdAt: -1 });

    res.json(reviews);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/reviews/average-rating', async (req, res) => {
  try {
    const result = await Review.aggregate([
      {
        $group: {
          _id: null,
          averageRating: { $avg: "$rating" },
          totalReviews: { $sum: 1 }
        }
      }
    ]);

    res.json({
      averageRating: result[0]?.averageRating?.toFixed(1) || 0,
      totalReviews: result[0]?.totalReviews || 0
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// ========== FAQ ==========

app.get('/getFaq', async (req, res) => {
  try {
    const data = await Faq.find();
    res.json(data)
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
})

// ========== CONTACT ==========

app.post('/contacts', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const contact = new Contact({
      name,
      email,
      subject,
      message
    });

    await contact.save();
    res.status(201).json(contact);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ========== FULL SERVICE ==========


app.get('/fullServ', async (req, res) => {
  try {
    const data = await FullServices.find();
    res.json(data)
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
})

// ========== FULL SERVICE FOR HEADER ==========


app.get('/fullServHeader', async (req, res) => {
  try {
    const data = await ServicesHeader.find();
    res.json(data)
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
})

// ========== APPOINTMENT ==========


app.post('/appointments', async (req, res) => {
  try {
    const { service, barber, time, name, phone } = req.body;

    if (!service || !time) {
      return res.status(400).json({ message: "Missing data" });
    }

    const newAppointment = new Appointment({
      serviceId: service._id,
      barber: barber ? barber.name : null,
      time,
      name,
      phone
    });

    await newAppointment.save();

    res.json({ message: "Booked successfully" });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ========== BLOG ==========
app.get('/getblog', async (req, res) => {
  try {
    const data = await Blog.find();
    res.json(data)
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
})

app.get('/getblog/:id', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    res.json(blog);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

export default app;

