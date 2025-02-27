"use client"

import { useState, useEffect } from "react"
import { parseISO } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { FileText, Eye, MessageSquare, Clock } from "lucide-react"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts"
import { format } from "date-fns"
import { Skeleton } from "@/components/ui/skeleton"
import { useWriterStats } from "@/lib/hooks/use-dashboard"
import { WriterRecentPosts } from "@/components/dashboard/writer-recent-posts"
import { WriterRecentComments } from "@/components/dashboard/writer-recent-comments"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useAuthStore } from "@/lib/store"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function WriterDashboard() {
  const user = useAuthStore((state) => state.user)
  const { data: stats, isLoading, error } = useWriterStats(user?._id ?? "")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (error) {
    return <div className="p-4 text-destructive">Error loading dashboard data. Please try again later.</div>
  }

  const StatCard = ({ title, value, icon: Icon, description }) => (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {isLoading ? <Skeleton className="h-8 w-20" /> : value.toLocaleString()}
        </div>
        {description && <p className="text-xs text-muted-foreground mt-1">{description}</p>}
      </CardContent>
    </Card>
  )

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-lg font-medium">Welcome back, {stats?.writerName || "Writer"}</h2>
          <p className="text-sm text-muted-foreground">Here's how your content is performing</p>
        </div>
        <Button asChild>
          <Link href="/dashboard/posts/new">Create New Post</Link>
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Your Posts"
          value={stats?.totalPosts ?? 0}
          icon={FileText}
          description={`${stats?.draftPosts ?? 0} drafts pending`}
        />
        <StatCard
          title="Total Views"
          value={stats?.totalViews ?? 0}
          icon={Eye}
          description={`${stats?.viewsGrowth ?? 0}% from last month`}
        />
        <StatCard
          title="Comments"
          value={stats?.totalComments ?? 0}
          icon={MessageSquare}
          description={`${stats?.newComments ?? 0} new this week`}
        />
        <StatCard
          title="Avg. Read Time"
          value={`${stats?.avgReadTime ?? 0}m`}
          icon={Clock}
          description="Based on your last 10 posts"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Your Content Performance</CardTitle>
            <CardDescription>Views over the past 30 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              {mounted && (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={stats?.viewsOverTime ?? []} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="_id" 
                      tickFormatter={(date) => {
                        const validDate = parseISO(date)
                        return isNaN(validDate.getTime()) ? "" : format(validDate, "MMM dd")
                      }} 
                    />
                    <YAxis />
                    <Tooltip
                      labelFormatter={(date) => {
                        const validDate = parseISO(date)
                        return isNaN(validDate.getTime()) ? "Invalid Date" : format(validDate, "MMMM dd, yyyy")
                      }}
                      formatter={(value) => [value, "Views"]}
                    />
                    <Area type="monotone" dataKey="views" stroke="#8884d8" fill="#8884d8" />
                  </AreaChart>
                </ResponsiveContainer>
              )}
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Top Performing Posts</CardTitle>
            <CardDescription>Your most viewed content</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              {mounted && (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={stats?.topPosts ?? []}
                    layout="vertical"
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis
                      type="category"
                      dataKey="title"
                      width={100}
                      tickFormatter={(title) => (title.length > 15 ? `${title.substring(0, 15)}...` : title)}
                    />
                    <Tooltip />
                    <Bar dataKey="views" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="posts">
        <TabsList>
          <TabsTrigger value="posts">Your Recent Posts</TabsTrigger>
          <TabsTrigger value="comments">Recent Comments</TabsTrigger>
        </TabsList>
        <TabsContent value="posts">
          <Card>
            <CardHeader>
              <CardTitle>Your Recent Posts</CardTitle>
              <CardDescription>Manage and monitor your content</CardDescription>
            </CardHeader>
            <CardContent>
              <WriterRecentPosts />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="comments">
          <Card>
            <CardHeader>
              <CardTitle>Recent Comments</CardTitle>
              <CardDescription>Latest feedback on your content</CardDescription>
            </CardHeader>
            <CardContent>
              <WriterRecentComments />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

