"use client"

import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Banner,
  Card,
  Pagination,
  PopularPosts,
  PopularWriters,
} from "../components";

import { CATEGORIES } from "../utils/dummyData";
import { usePopularPosts, usePosts } from "../hooks/post-hook";
import RelatedContent from "../components/related-content";
import BecomeBlogger from "../components/become-blogger";
import Hero from "../components/hero";
import { Button } from "../components/ui/button"
import { motion } from "framer-motion"
import { Search } from "lucide-react"
import { Input } from "../components/ui/input"

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState(null)
  const { posts, numOfPages, setPage } = usePosts({ writerId: "" })
  const popular = usePopularPosts()

  const randomIndex = Math.floor(Math.random() * posts.length)

  const handlePageChange = (val) => {
    setPage(val)
  }

  const filteredCategories = CATEGORIES.filter((cat) => cat.label.toLowerCase().includes(searchTerm.toLowerCase()))

  if (posts?.length < 1) {
    return (
      <div className="w-full h-full py-8 flex items-center justify-center">
        <span className="text-lg text-slate-500">No Posts Available</span>
      </div>
    )
  }

  return (
    <div className="py-10 2xl:py-5">
      <Hero />
      <Banner post={posts[randomIndex]} />

      <div className="px-4 py-8 md:px-6 lg:px-8 xl:px-20 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Explore Popular Categories</h2>
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-4 md:mb-0">
              Discover trending topics and expand your knowledge
            </p>
            <div className="relative w-full md:w-64">
              <Input
                type="text"
                placeholder="Search categories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
          {filteredCategories.map((cat) => (
            <motion.div key={cat.label} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link to={`/category?cat=${cat?.label}`} passHref>
                <Button
                  className={`w-full h-18 ${cat.color} hover:opacity-90 transition-all duration-300 rounded-lg shadow-lg flex flex-col items-center justify-center gap-2 text-white font-semibold text-lg`}
                  onClick={() => setSelectedCategory(cat.label)}
                >
                  <span className="text-2xl">{cat.icon}</span>
                  <span>{cat.label}</span>
                </Button>
              </Link>
            </motion.div>
          ))}
        </div>

        {selectedCategory && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-12 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg"
          >
            <h3 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">{selectedCategory} Highlights</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Explore the latest trends, news, and insights in {selectedCategory.toLowerCase()}.
            </p>
            <Button className="mt-4" variant="outline">
              View All {selectedCategory} Content
            </Button>
          </motion.div>
        )}
      </div>

      <div className=" flex flex-col md:flex-row gap-10 2xl:gap-20 px-4 md:px-6 lg:px-8 xl:px-20">
        {/* LEFT */}
        <div className="w-full md:w-2/3 flex flex-col gap-y-28 md:gap-y-14">
          {posts?.map((post, index) => (
            <Card key={post?._id} post={post} index={index} />
          ))}

          <div className="w-full flex items-center justify-center">
            <Pagination totalPages={Number.parseInt(numOfPages)} onPageChange={handlePageChange} />
          </div>
        </div>

        {/* RIGHT */}
        <div className="w-full md:w-1/4 flex flex-col gap-y-12">
          {/* POPULAR POSTS */}
          <PopularPosts posts={popular?.posts} />

          {/* POPULAR WRITERS */}
          <PopularWriters data={popular?.writers} />
        </div>
      </div>

      <BecomeBlogger />

      {/* <RelatedContent /> */}
    </div>
  )
}

