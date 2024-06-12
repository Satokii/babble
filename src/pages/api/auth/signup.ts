import { NextApiRequest, NextApiResponse } from "next";
import { fetchRedis } from "@/helpers/redis";
import { db } from "@/lib/db";

const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require('uuid');

const handleSignup = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      const { email, password } = req.body;

      const existingUser = await fetchRedis("get", `user:email:${email}`);
      if (existingUser) {
        return res.status(400).json({ message: "User already exists." });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const userId = uuidv4();
      const user = {
        id: userId,
        email,
        password: hashedPassword,
      };

      await db.set(`user:${userId}`, JSON.stringify(user));
      await db.set(`user:email:${email}`, JSON.stringify(user));

      return res.status(201).json(user);
    } catch (err) {
        console.log(err)
      return res.status(500).json({ err });
    }
  }
};
export default handleSignup;
