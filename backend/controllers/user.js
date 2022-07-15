import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import UserModel from "../model/user.js";


export const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await UserModel.findOne({ email });
    if (!result) {
      return res.status(404).json({ message: "user does'nt exist" });
    }
    const isPasswordCorrect = await bcrypt.compare(password, result.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "password incorrect" });
    }
    if(result && isPasswordCorrect){
            res.status(200).json({
               result: result, token: generateToken(result._id)
            })
    }
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
    console.log(error);
  }
};

export const signup = async (req, res) => {
  const { email, password, firstName, lastName, roles} = req.body;
  
  try {
    const oldUser = await UserModel.findOne({ email });
    if (oldUser) {
      return res.status(400).json("user aleady exist, you are a thief");
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const result = await UserModel.create({
      email,
      roles,
      password: hashPassword,
      name: `${firstName} ${lastName}`,
    });
    res.status(201).json({
      result,
      token: generateToken(result._id),
    });
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
    console.log(error);
  }
};
// npm i @reduxjs/toolkit react-router-dom monent react-file-base64 react-google-login react-redux react-toastify axios

//Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};
