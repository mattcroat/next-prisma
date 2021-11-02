import { prisma } from 'lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { name, email, feedbackType, message } = req.body

  try {
    await prisma.feedback.create({
      data: {
        email,
        message,
        feedbackType,
        name,
      },
    })

    res.status(200).json({ message: 'Success! 🎉' })
  } catch (error) {
    res.status(400).json({ error })
  }
}
