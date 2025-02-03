import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { AiOutlineArrowRight } from "react-icons/ai"
import Markdown from "markdown-to-jsx"

const Card = ({ post, index }) => {
  return (
    <motion.div
      key={post?._id}
      className="w-full flex flex-col gap-8 items-center rounded-lg shadow-lg overflow-hidden bg-white dark:bg-gray-800 transition-all duration-300 hover:shadow-xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className="flex flex-col md:flex-row w-full">
        <Link to={`/${post?.slug}/${post._id}`} className="w-full md:w-2/5 h-64 overflow-hidden">
          <motion.img
            src={post?.img}
            alt={post?.title}
            className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
            whileHover={{ scale: 1.05 }}
          />
        </Link>

        <div className="w-full md:w-3/5 flex flex-col gap-4 p-6">
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {new Date(post?.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
            <span className="text-sm font-semibold text-rose-600 dark:text-rose-400 bg-rose-100 dark:bg-rose-900 px-2 py-1 rounded-full">
              {post?.cat}
            </span>
          </div>

          <h2 className="text-2xl font-bold text-gray-800 dark:text-white transition-colors duration-300 hover:text-rose-600 dark:hover:text-rose-400">
            {post?.title}
          </h2>

          <div className="flex-1 overflow-hidden text-gray-600 dark:text-gray-300 text-sm">
            <Markdown options={{ wrapper: "article" }}>{post?.desc?.slice(0, 150) + "..."}</Markdown>
          </div>

          <Link
            to={`/${post?.slug}/${post._id}`}
            className="inline-flex items-center gap-2 text-rose-600 dark:text-rose-400 font-semibold transition-colors duration-300 hover:text-rose-700 dark:hover:text-rose-300"
          >
            <span>Read More</span>
            <motion.span whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 400 }}>
              <AiOutlineArrowRight />
            </motion.span>
          </Link>
        </div>
      </div>
    </motion.div>
  )
}

export default Card

