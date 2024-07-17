import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === 'PATCH') {
    const {
      dateOfBirth,
      gender,
      nationality,
      maritalStatus,
      drivingLicense,
      currentLocation,
      languagesKnown,
      visaStatus,
      religion,
      alternateEmail,
      alternateContactNumber,
    } = req.body;

    try {
      const updatedProfile = await prisma.personalDetails.update({
        where: { profileId: String(id) },
        data: {
          dateOfBirth: new Date(dateOfBirth),
          gender,
          nationality,
          maritalStatus,
          drivingLicense,
          currentLocation,
          languagesKnown,
          visaStatus,
          religion,
          alternateEmail,
          alternateContactNumber,
        },
      });

      res.status(200).json(updatedProfile);
    } catch (error) {
      res.status(500).json({ message: 'Error updating profile', error });
    }
  } else {
    res.setHeader('Allow', ['PATCH']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
