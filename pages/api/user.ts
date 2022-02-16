import type { NextApiRequest, NextApiResponse } from "next";
import { getProfileData } from "../../lib/spotify";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const user = await getProfileData();
  
  return res.status(200).json({ user });

}

