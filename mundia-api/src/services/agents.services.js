import { Agents } from "../models/Agents.js";
import bcrypt from "bcrypt";

export const getAgents = async (req, res) => {
  try {
    const agents = await Agents.findAll();
    res.json(agents);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createAgents = async (req, res) => {
  try {
    const { name, last_name, email, password, phone_number, image_url } =
      req.body;


    const saltRounds = 10;
    
    const salt = await bcrypt.genSalt(saltRounds);
    
    const hashedPassword = await bcrypt.hash(password, salt);
      
    const newAgent = await Agents.create({
      name,
      last_name,
      email,
      password: hashedPassword,
      phone_number,
      image_url,
    });
    res.json(newAgent);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
