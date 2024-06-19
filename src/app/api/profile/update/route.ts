import { NextApiRequest, NextApiResponse } from 'next';
import { fetchRedis } from '@/helpers/redis';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { name, email, image } = req.body;

    try {
      const userKey = `user:${email}`;

      await fetchRedis('hset', userKey, 'name', name, 'email', email, 'image', image);

      res.status(200).json({ message: 'Profile updated successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Error updating profile' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
