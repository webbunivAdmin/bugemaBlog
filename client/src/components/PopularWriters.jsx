import { Link } from "react-router-dom"
import Profile from "../assets/profile.png"
import { formatNumber } from "../utils"
import { FiUser, FiTrendingUp } from "react-icons/fi"

const PopularWriters = ({ data }) => {
  return (
    <div className="w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white flex items-center">
        <FiTrendingUp className="mr-2 text-blue-500" />
        Popular Writers
      </h2>
      <div className="space-y-6">
        {data?.map((el, id) => (
          <Link
            to={`/writer/${el?._id}`}
            key={el?._id + id}
            className="flex items-center space-x-4 p-3 rounded-lg transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <div className="relative">
              <img
                src={el?.image || Profile}
                alt={el?.name}
                className="w-16 h-16 rounded-full object-cover border-2 border-blue-500"
              />
              <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-1">
                <FiUser className="text-white" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-semibold text-gray-800 dark:text-white">{el?.name}</span>
              <span className="text-sm text-gray-600 dark:text-gray-300">
                {formatNumber(el?.followers)} <span className="text-blue-500 font-medium">Followers</span>
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default PopularWriters

