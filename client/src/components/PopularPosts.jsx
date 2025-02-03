import { Link } from "react-router-dom"
import { CATEGORIES } from "../utils/dummyData"
import { FiClock, FiTrendingUp } from "react-icons/fi"

const PopularPosts = ({ posts }) => {
  const Card = ({ post }) => {
    let catColor = ""
    CATEGORIES.map((cat) => {
      if (cat.label === post?.cat) {
        catColor = cat?.color
      }
      return null
    })

    return (
      <div className="flex items-center space-x-4 p-4 rounded-lg transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-700">
        <img
          src={post?.img }
          alt={post?.user?.name}
          className="w-20 h-20 rounded-lg object-cover shadow-md"
        />
        <div className="flex flex-col space-y-2">
          <span className={`${catColor} w-fit rounded-full px-3 py-1 text-white text-xs font-medium`}>{post?.cat}</span>
          <Link
            to={`/${post?.slug}/${post?._id}`}
            className="text-lg font-semibold text-gray-800 dark:text-white hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-300"
          >
            {post?.title}
          </Link>
          <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
            <span className="font-medium">{post?.user?.name}</span>
            <span>•</span>
            <span className="flex items-center">
              <FiClock className="mr-1" />
              {new Date(post?.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white flex items-center">
        <FiTrendingUp className="mr-2 text-blue-500" />
        Popular Articles
      </h2>
      <div className="space-y-6">
        {posts?.map((post, id) => (
          <Card post={post} key={id} />
        ))}
      </div>
    </div>
  )
}

export default PopularPosts

