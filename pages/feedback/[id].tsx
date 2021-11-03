import React from 'react'
import Link from 'next/link'

import { prisma } from 'lib/prisma'

export default function SingleFeedback({ feedbackItem }) {
  return (
    <div className="h-screen mx-auto prose text-white prose-blue">
      <Link href="/feedback">
        <a>Go back</a>
      </Link>
      <p>{feedbackItem.message}</p>
      <p>
        {feedbackItem.name} - {feedbackItem.email}
      </p>
    </div>
  )
}

export async function getServerSideProps(context) {
  const { id } = context.params

  const feedbackItem = await prisma.feedback.findUnique({
    where: {
      id,
    },
    select: {
      name: true,
      email: true,
      message: true,
      feedbackType: true,
    },
  })

  return {
    props: {
      feedbackItem,
    },
  }
}
