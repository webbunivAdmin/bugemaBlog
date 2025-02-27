import { useQuery } from "@tanstack/react-query"
import axios from "axios"

const API_URI = process.env.NEXT_PUBLIC_API_URL

// Admin Dashboard Stats
interface AdminDashboardStats {
  totalPosts: number
  totalViews: number
  totalWriters: number
  totalFollowers: number
  postsThisWeek: number
  viewsGrowth: number
  activeWriters: number
  followerGrowth: number
  viewsOverTime: { date: string; views: number }[]
  postsByCategory: { category: string; count: number }[]
}

export function useAdminStats() {
  return useQuery<AdminDashboardStats>({
    queryKey: ["adminDashboardStats"],
    queryFn: async () => {
      const { data } = await axios.get(`${API_URI}/analytics/admin-stats`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      return data
    },
    refetchInterval: 60000,
  })
}

// Writer Dashboard Stats
interface WriterDashboardStats {
  writerName: string
  totalPosts: number
  totalViews: number
  totalComments: number
  avgReadTime: number
  draftPosts: number
  viewsGrowth: number
  newComments: number
  viewsOverTime: { date: string; views: number }[]
  topPosts: { title: string; views: number }[]
}

export function useWriterStats(writerId: string) {
  return useQuery<WriterDashboardStats>({
    queryKey: ["writerDashboardStats"],
    queryFn: async () => {
      const { data } = await axios.get(`${API_URI}/analytics/writer-stats/${writerId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      return data
    },
    refetchInterval: 60000,
  })
}

interface RecentPost {
  _id: string
  title: string
  author: {
    _id: string
    name: string
  }
  category: string
  status: string
  views: number
  commentsCount: number
  createdAt: string
}

export function useAdminRecentPosts() {
  return useQuery<RecentPost[]>({
    queryKey: ["adminRecentPosts"],
    queryFn: async () => {
      const { data } = await axios.get(`${API_URI}/posts/recent-admin`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      return data.data
    },
  })
}

interface RecentComment {
  _id: string
  user: {
    _id: string
    name: string
    image?: string
  }
  post: {
    _id: string
    title: string
  }
  desc: string
  status: "Approved" | "Pending" | "Rejected"
  createdAt: string
}

export function useAdminRecentComments() {
  return useQuery<RecentComment[]>({
    queryKey: ["adminRecentComments"],
    queryFn: async () => {
      const { data } = await axios.get(`${API_URI}/analytics/recent-comments`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      return data.data
    },
  })
}

interface WriterComment {
    _id: string
    user: {
      _id: string
      name: string
      image: string
    }
    post: {
      _id: string
      title: string
    }
    desc: string
    createdAt: string
  }
export function useWriterRecentComments(writerId: string) {
    return useQuery<WriterComment[]>({
      queryKey: ["writerRecentComments"],
      queryFn: async () => {
        const { data } = await axios.get(`${API_URI}/posts/writer-comments/${writerId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        return data.data
      },
    })
  }
  
  interface WriterPost {
    _id: string
    title: string
    cat: string
    state: string
    views: number
    commentsCount: number
    createdAt: string
  }
  
  export function useWriterRecentPosts(writerId: string) {
    return useQuery<WriterPost[]>({
      queryKey: ["writerRecentPosts"],
      queryFn: async () => {
        const { data } = await axios.get(`${API_URI}/posts/writer/${writerId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        return data.data
      },
    })
  }
  
  
