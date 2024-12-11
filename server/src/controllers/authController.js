import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';


// REGISTER USER
export const register = async (req, res) => {
    try {
        const {  firstName, lastName, email, password } = req.body;
console.log(req.body)
        // Check if the email already exists
        if (!firstName || !lastName || !email || !password) {
            return res.status(400).json({ msg: 'All fields are required.' });
        }
        
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ msg: 'Email already exists.' });
        }

        // Hash the password
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

       

        // Save the user in the database
        const newUser = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            stripeCustomerId:'',
          
        });
        const savedUser = await newUser.save();

        res.status(201).json({ msg: 'User registered successfully.' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// LOGIN USER
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find the user in the database
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'User does not exist.' });
        }

        // Verify the password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials.' });
        }

        // Generate a JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

        // Return user data (excluding the password)
        const { password: _, ...userData } = user.toObject();
        res.status(200).json({ token, user: userData });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
