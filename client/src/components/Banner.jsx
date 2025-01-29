// import Markdown from "markdown-to-jsx";
// import { Link } from "react-router-dom";

// const Banner = ({ post }) => {
//   return (
//     <div className='w-full mb-10'>
//       <div className='relative w-full h-[500px] 2xl:h-[600px] flex  px-0 lg:px-20'>
//         <Link to={`/${post?.slug}/${post?._id}`} className='w-full '>
//           <img
//             src={post?.img}
//             alt='Banner'
//             className='w-full md:w-3/4 h-64 md:h-[420px] 2xl:h-[560px] rounded'
//           />
//         </Link>

//         <div className='absolute flex flex-col md:right-10 bottom-10 md:bottom-2 w-full md:w-2/4 lg:w-1/3 2xl:w-[480px] bg-white dark:bg-[#05132b] shadow-2xl p-5 rounded-lg gap-3'>
//           <Link to={`/${post?.slug}/${post?._id}`}>
//             <h1 className='font-semibold text-2xl text-black dark:text-white'>
//               {post?.title.slice(0, 60) + "..."}
//             </h1>
//           </Link>

//           <div className='flex-1 overflow-hidden text-gray-600 dark:text-slate-500 text-sm text-justify'>
//             <Markdown options={{ wrapper: "article" }}>
//               {post?.desc?.slice(0, 160) + "..."}
//             </Markdown>
//           </div>
//           <Link
//             to={`/${post?.slug}/${post?._id}`}
//             className='w-fit bg-rose-600 bg-opacity-20 text-rose-700 px-4 py-1 rounded-full text-sm cursor-pointer '
//           >
//             Read more...
//           </Link>
//           <Link
//             to={`/writer/${post?.user?._id}`}
//             className='flex gap-3 mt-4 items-center'
//           >
//             <img
//               src={post?.user?.image}
//               alt='User profile'
//               className='object-cover w-10 h-10 rounded-full'
//             />
//             <span className='font-medium text-gray-700 dark:text-slate-500'>
//               {post?.user?.name}
//             </span>
//             <span className='text-gray-500 dark:text-gray-600'>
//               {new Date(post?.createdAt).toDateString()}
//             </span>
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Banner;

"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Markdown from "markdown-to-jsx"
import { CalendarIcon, UserIcon, TagIcon, ClockIcon, HeartIcon, ShareIcon, BookmarkIcon } from "lucide-react"

const Banner = ({ post }) => {
  const [isHovered, setIsHovered] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      const banner = document.getElementById("banner-image")
      if (banner) {
        banner.style.height = `${window.innerHeight * 0.7}px`
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  }

  const handleLike = () => setIsLiked(!isLiked)
  const handleBookmark = () => setIsBookmarked(!isBookmarked)

  return (
    <div className="relative w-full mb-10 overflow-hidden bg-gradient-to-b from-blue-100 to-blue-500 dark:from-blue-900 dark:to-blue-800">
      <div className="container mx-auto px-4 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row lg:items-center lg:space-x-8">
          <motion.div
            className="relative w-full lg:w-1/2 mb-8 lg:mb-0"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <a href={`/${post?.slug}/${post?._id}`}>
              <div
                id="banner-image"
                className="relative w-full h-[50vh] lg:h-[70vh] cursor-pointer rounded-2xl overflow-hidden shadow-2xl transform transition-all duration-300 hover:scale-105"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <img src={post?.img || "/placeholder.svg"} alt="Banner" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70" />
                <AnimatePresence>
                  {isHovered && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 p-6 text-white"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: 20, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h2 className="text-2xl font-bold mb-2">{post?.title}</h2>
                      <p className="text-sm">{post?.desc?.slice(0, 100)}...</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </a>
          </motion.div>

          <motion.div
            className="w-full lg:w-1/2 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8"
            variants={fadeInUp}
            initial="initial"
            animate="animate"
          >
            <a href={`/${post?.slug}/${post?._id}`}>
              <h1 className="font-bold text-3xl md:text-4xl text-gray-900 dark:text-white mb-4 hover:text-rose-600 dark:hover:text-rose-400 transition-colors">
                {post?.title}
              </h1>
            </a>

            <div className="flex flex-wrap items-center text-sm text-gray-600 dark:text-gray-400 mb-6 space-x-4">
              <div className="flex items-center">
                <UserIcon className="w-4 h-4 mr-1" />
                <a href={`/writer/${post?.user?._id}`} className="hover:underline">
                  {post?.user?.name}
                </a>
              </div>
              <div className="flex items-center">
                <CalendarIcon className="w-4 h-4 mr-1" />
                <span>{new Date(post?.createdAt).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center">
                <ClockIcon className="w-4 h-4 mr-1" />
                <span>{post?.readTime || "5 min read"}</span>
              </div>
              <div className="flex items-center">
                <TagIcon className="w-4 h-4 mr-1" />
                <span>{post?.category}</span>
              </div>
            </div>

            <div className="text-gray-600 dark:text-gray-300 text-base md:text-lg mb-6 line-clamp-4">
              <Markdown options={{ wrapper: "article" }}>{post?.desc}</Markdown>
            </div>

            <div className="flex items-center justify-between">
              <a
                href={`/${post?.slug}/${post?._id}`}
                className="inline-flex items-center px-6 py-3 bg-rose-600 text-white rounded-full text-sm font-medium hover:bg-rose-700 transition-colors"
              >
                Read more
                <svg
                  className="ml-2 w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>

              <div className="flex items-center space-x-4">
                <button
                  onClick={handleLike}
                  className={`p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 ${
                    isLiked ? "text-rose-500" : "text-gray-500"
                  }`}
                  title={isLiked ? "Unlike" : "Like"}
                >
                  <HeartIcon className="w-5 h-5" />
                </button>
                <button
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500"
                  title="Share"
                >
                  <ShareIcon className="w-5 h-5" />
                </button>
                <button
                  onClick={handleBookmark}
                  className={`p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 ${
                    isBookmarked ? "text-blue-500" : "text-gray-500"
                  }`}
                  title={isBookmarked ? "Remove Bookmark" : "Bookmark"}
                >
                  <BookmarkIcon className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-full overflow-hidden">
                  <img
                    src={post?.user?.image }
                    alt={post?.user?.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-gray-100">{post?.user?.name}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{post?.user?.role || "Author"}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Banner
