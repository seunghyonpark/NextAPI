import type { NextApiRequest, NextApiResponse } from "next";
import z from "zod";
import { prisma } from "@/lib/server/prisma";
import { getCurrentWallet } from "@/lib/server/wallet";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  try {
    switch (method) {
      case "POST":
        return await handlePOST(req, res);
      default:
        res.setHeader("Allow", "POST");
        throw new Error(`Method ${method} Not Allowed`);
    }
  } catch (error: any) {
    return res.status(400).json({
      error: {
        message: error.message,
      },
    });
  }
}

// Get current user
const handlePOST = async (req: NextApiRequest, res: NextApiResponse) => {
  const currentUser = await getCurrentWallet(req);


  /*
  return res.status(200).json({
    data: currentUser,
  });
  */

  const walletAddress = "0x023b36e2601b455431ce8b0d946d69e2026790a1";

  return res.status(200).json({
    address: walletAddress,
  });


};

