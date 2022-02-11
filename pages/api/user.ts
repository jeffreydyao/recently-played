import type { NextApiRequest, NextApiResponse } from "next";
import { getProfileData } from "../../lib/spotify";

// TODO: Add error handling to API route

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const user = await getProfileData();
  
  return res.status(200).json({ user });

}

