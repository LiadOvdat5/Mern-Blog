import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';

export const signup = async (req, res) => {
    const { username, email, password } = req.body;

    // Validate the request
    if (!username || !email || !password ||
         username === '' || email === '' || password === '') {
        return res.status(400).json({ message: 'All fields are required' });
    }

    // Hash the password
    const hashedPassword = bcryptjs.hashSync(password, 10);

    // Create a new user
    const newUser = new User({ 
        username, 
        email, 
        password: hashedPassword 
    });

    try {
        await newUser.save();
        res.json('User created' );
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
    
};