import { NextApiRequest, NextApiResponse } from "next";
import { fetchRedis } from "@/helpers/redis";
import { db } from "@/lib/db";
import DefaultUserImg from "@/public/default-user-img.png"

const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require('uuid');

const handleSignup = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      const { emailSignup, nameSignup, passwordSignup } = req.body;

      const existingUser = await fetchRedis("get", `user:email:${emailSignup}`);
      if (existingUser) {
        return res.status(400).json({ message: "An account has already been created with this email." });
      }

      if (!emailSignup || !nameSignup || !passwordSignup) {
        return res.status(400).json({ message: "All fields need to be completed." });
      }

      const hashedPassword = await bcrypt.hash(passwordSignup, 10);

      const userId = uuidv4();
      const user = {
        id: userId,
        email: emailSignup,
        password: hashedPassword,
        image: DefaultUserImg,
        name: nameSignup
      };

      await db.set(`user:${userId}`, JSON.stringify(user));
      await db.set(`user:email:${emailSignup}`, user.id);

      return res.status(201).json(user);
    } catch (err) {
      return res.status(500).json({ err });
    }
  }
};
export default handleSignup;
