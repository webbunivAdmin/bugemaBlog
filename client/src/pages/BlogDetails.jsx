import React, { useEffect, useState, useRef } from "react"
import Markdown from "markdown-to-jsx"
import { useParams, Link } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { PopularPosts, PopularWriters, PostComments } from "../components"
import useStore from "../store"
import { getSinglePost } from "../utils/apiCalls"
import { usePopularPosts } from "../hooks/post-hook"
import {
  CalendarIcon,
  EyeIcon,
  BookmarkIcon,
  ShareIcon,
  ThumbsUpIcon,
  MessageCircleIcon,
  TagIcon,
  ClockIcon,
  ChevronUpIcon,
} from "lucide-react"

const BlogDetails = () => {
  const { setIsLoading } = useStore()
  const { id } = useParams()
  const [post, setPost] = useState(null)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [likes, setLikes] = useState(0)
  const [showShareOptions, setShowShareOptions] = useState(false)
  const [readingProgress, setReadingProgress] = useState(0)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const shareRef = useRef(null)
  const articleRef = useRef(null)

  const popular = usePopularPosts()

  useEffect(() => {
    const fetchPost = async () => {
      setIsLoading(true)
      const data = await getSinglePost(id)
      setPost(data || {})
      setLikes(data?.likes || 0)
      setIsLoading(false)
    }

    if (id) {
      fetchPost()
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" })
    }

    const handleClickOutside = (event) => {
      if (shareRef.current && !shareRef.current.contains(event.target)) {
        setShowShareOptions(false)
      }
    }

    const handleScroll = () => {
      if (articleRef.current) {
        const element = articleRef.current
        const totalHeight = element.clientHeight - element.offsetTop - window.innerHeight
        const windowScrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0
        if (windowScrollTop === 0) {
          setReadingProgress(0)
          setShowScrollTop(false)
        } else {
          if (windowScrollTop > element.offsetTop) {
            const scrolled = windowScrollTop - element.offsetTop
            const progress = (scrolled / totalHeight) * 100
            setReadingProgress(progress)
          }
          setShowScrollTop(true)
        }
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    window.addEventListener("scroll", handleScroll)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [id, setIsLoading])

  const handleBookmark = () => setIsBookmarked(!isBookmarked)
  const handleLike = () => setLikes(likes + 1)
  const handleShare = () => setShowShareOptions(!showShareOptions)
  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  if (!post) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full"
        />
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full px-4 md:px-10 py-8 2xl:px-20 bg-gray-50 dark:bg-gray-900"
    >
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row lg:gap-12">
        <div className="lg:w-2/3">
          <motion.h1
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6"
          >
            {post.title}
          </motion.h1>

          <div className="flex flex-wrap items-center gap-6 mb-8 text-gray-600 dark:text-gray-400">
            <span className="flex items-center">
              <CalendarIcon className="w-5 h-5 mr-2" />
              {new Date(post.createdAt).toLocaleDateString()}
            </span>
            <span className="flex items-center">
              <EyeIcon className="w-5 h-5 mr-2" />
              {post.views?.length} views
            </span>
            <span className="flex items-center">
              <MessageCircleIcon className="w-5 h-5 mr-2" />
              {post.comments?.length || 0} comments
            </span>
            <span className="flex items-center">
              <TagIcon className="w-5 h-5 mr-2" />
              {post.cat}
            </span>
            <span className="flex items-center">
              <ClockIcon className="w-5 h-5 mr-2" />
              {post.readTime || "5 min read"}
            </span>
          </div>

          <motion.img
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            src={post.img}
            alt={post.title}
            className="w-full h-[400px] object-cover rounded-lg shadow-lg mb-8"
          />

          <div className="flex items-center gap-4 mb-8">
            <Link to={`/writer/${post.user?._id}`}>
              <img
                src={post.user?.image || "/placeholder.svg"}
                alt={post.user?.name}
                className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-lg"
              />
            </Link>
            <div>
              <Link
                to={`/writer/${post.user?._id}`}
                className="text-xl font-semibold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400"
              >
                {post.user?.name}
              </Link>
              <p className="text-gray-600 dark:text-gray-400">{post.user?.bio || "Writer"}</p>
            </div>
          </div>

          <div className="sticky top-0 z-10 bg-gray-50 dark:bg-gray-900 py-2 mb-4">
            <div className="h-1 w-full bg-gray-200 rounded-full">
              <div
                style={{ width: `${readingProgress}%` }}
                className="h-1 bg-blue-600 rounded-full transition-all duration-300 ease-out"
              ></div>
            </div>
          </div>

          <div ref={articleRef} className="prose prose-lg dark:prose-invert max-w-none mb-12">
            <Markdown options={{ wrapper: "article" }}>{post.desc}</Markdown>
          </div>

          <div className="flex items-center justify-between mb-12">
            <div className="flex items-center gap-4">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={handleLike}
                className="flex items-center gap-2 px-4 py-2 bg-rose-100 text-rose-600 rounded-full hover:bg-rose-200 transition-colors"
              >
                <ThumbsUpIcon className="w-5 h-5" />
                <span>{likes}</span>
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={handleBookmark}
                className={`p-2 rounded-full ${
                  isBookmarked ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-600"
                } hover:bg-opacity-80 transition-colors`}
              >
                <BookmarkIcon className="w-5 h-5" />
              </motion.button>
              <div className="relative" ref={shareRef}>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={handleShare}
                  className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
                >
                  <ShareIcon className="w-5 h-5" />
                </motion.button>
                <AnimatePresence>
                  {showShareOptions && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute left-0 mt-2 py-2 w-48 bg-white rounded-md shadow-xl z-20"
                    >
                      {["Twitter", "Facebook", "LinkedIn"].map((platform) => (
                        <button
                          key={platform}
                          className="block px-4 py-2 text-sm capitalize text-gray-700 hover:bg-gray-100 w-full text-left"
                        >
                          Share on {platform}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Comments</h2>
            <PostComments postId={id} />
          </div>
        </div>

        <div className="lg:w-1/3 space-y-12">
          <div className="sticky top-20 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Popular Posts</h2>
            <PopularPosts posts={popular?.posts} />
          </div>
          <div className="sticky top-96 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Popular Writers</h2>
            <PopularWriters data={popular?.writers} />
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={handleScrollTop}
            className="fixed bottom-8 right-8 p-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors"
          >
            <ChevronUpIcon className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default BlogDetails

