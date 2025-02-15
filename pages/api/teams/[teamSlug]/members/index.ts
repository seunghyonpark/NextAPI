import type { NextApiRequest, NextApiResponse } from "next";
import { getCurrentUser } from "@/lib/server/user";
import { getTeam } from "@/lib/server/team";
import { isTeamMember, getTeamMembers } from "@/lib/server/team";
import { sendApiError } from "@/lib/error";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  try {
    switch (method) {
      case "GET":
        return await handleGET(req, res);
      default:
        res.setHeader("Allow", "GET");
        throw new Error(`Method ${method} Not Allowed`);
    }
  } catch (error: any) {
    return sendApiError(res, error);
  }
}

// Get all members of a team
const handleGET = async (req: NextApiRequest, res: NextApiResponse) => {
  const { teamSlug } = req.query as {
    teamSlug: string;
  };

  const currentUser = await getCurrentUser(req);
  const team = await getTeam(teamSlug);

  if (!(await isTeamMember(currentUser, team))) {
    throw new Error("You do not have permission to access this team");
  }

  const members = await getTeamMembers(team);

  return res.status(200).json({
    data: members,
  });
};
