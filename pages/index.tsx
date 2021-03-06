import Head from 'next/head'
import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'
import { ExclamationCircleIcon } from '@heroicons/react/solid'
import toast, { Toaster } from 'react-hot-toast'

export default function Home() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted },
  } = useForm()

  async function create(data) {
    fetch('http://localhost:3000/api/create', {
      body: JSON.stringify(data),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }

  async function onSubmit(data) {
    toast.promise(
      create(data),
      {
        loading: 'Working on it...',
        success: 'Feedback submitted successfully!',
        error: 'Oops! something went wrong.',
      },
      {
        duration: 3000,
      }
    )
  }

  return (
    <div>
      <Head>
        <title>Feedback App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className="">
        <Toaster />
        <div className="max-w-md px-4 mx-auto ">
          <h1 className="mb-10 text-3xl font-bold tracking-wide text-center text-white md:text-4xl">
            Submit Your Feedback!
          </h1>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-1 p-10 bg-gray-800 rounded-lg shadow-lg gap-y-6"
          >
            <div>
              <label htmlFor="name" className="sr-only">
                Full name
              </label>
              <div className="relative">
                <input
                  {...register('name', { required: true })}
                  type="text"
                  name="name"
                  id="name"
                  autoComplete="name"
                  className={`block w-full shadow-sm py-3 text-white px-4 mb-2 bg-gray-700 placeholder-gray-500  border-gray-500 rounded-md ${
                    errors.name
                      ? 'focus:ring-red-500 border-red-500'
                      : 'focus:ring-blue-500 focus:border-blue-500'
                  }`}
                  placeholder="Full name"
                />

                {errors.name && (
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <ExclamationCircleIcon
                      className="w-5 h-5 text-red-600"
                      aria-hidden="true"
                    />
                  </div>
                )}
              </div>
            </div>
            <div className="relative">
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <input
                id="email"
                name="email"
                {...register('email', { required: true })}
                type="email"
                autoComplete="email"
                className={`block w-full shadow-sm py-3 text-white px-4 mb-2 bg-gray-700 placeholder-gray-500   border-gray-500 rounded-md ${
                  errors.name
                    ? 'focus:ring-red-500 border-red-500'
                    : 'focus:ring-blue-500 focus:border-blue-500'
                }`}
                placeholder="Email"
              />
              {errors.email && (
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <ExclamationCircleIcon
                    className="w-5 h-5 text-red-600"
                    aria-hidden="true"
                  />
                </div>
              )}
            </div>
            <div>
              <label htmlFor="phone" className="sr-only">
                Feedback Type
              </label>
              <select
                id="feedbackType"
                name="feedbackType"
                className="block w-full py-2 pl-3 pr-10 mt-1 text-base text-white placeholder-gray-500 bg-gray-700 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                defaultValue="Feedback"
                {...register('feedbackType', { required: true })}
              >
                <option>Feedback</option>
                <option>Issue</option>
                <option>Idea</option>
              </select>
            </div>
            <div className="relative">
              <label htmlFor="message" className="sr-only">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                {...register('message', { required: true })}
                rows={4}
                className={`block w-full shadow-sm py-3 text-white px-4 mb-2 bg-gray-700 placeholder-gray-500   border-gray-500 rounded-md ${
                  errors.name
                    ? 'focus:ring-red-500 border-red-500'
                    : 'focus:ring-blue-500 focus:border-blue-500'
                }`}
                placeholder="Message"
                defaultValue={''}
              />
            </div>
            <div>
              <motion.button
                disabled={isSubmitted}
                whileHover={{
                  scale: 1.05,
                  transition: { duration: 0.2 },
                }}
                whileTap={{
                  scale: 0.9,
                  transition: { duration: 0.2 },
                }}
                type="submit"
                className="justify-center w-full px-6 py-3 text-base font-medium text-white bg-blue-700 border border-transparent rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Submit
              </motion.button>
            </div>
          </form>
        </div>
      </section>
    </div>
  )
}
