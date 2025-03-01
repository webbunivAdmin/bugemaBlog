"use client"

import { useState, useEffect } from "react"
import { parseISO } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { FileText, Users, Eye, TrendingUp } from "lucide-react"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts"
import { format } from "date-fns"
import { Skeleton } from "@/components/ui/skeleton"
import { useAdminStats } from "@/lib/hooks/use-dashboard"
import { AdminRecentPosts } from "@/components/dashboard/admin-recent-posts"
import { AdminRecentComments } from "@/components/dashboard/admin-recent-comments"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function AdminDashboard() {
  const { data: stats, isLoading, error } = useAdminStats()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (error) {
    return <div className="p-4 text-destructive">Error loading dashboard data. Please try again later.</div>
  }

  interface StatCardProps {
    title: string;
    value: number;
    icon: React.ComponentType<{ className?: string }>;
    description?: string;
  }

  const StatCard = ({ title, value, icon: Icon, description }: StatCardProps) => (
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
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Posts"
          value={stats?.totalPosts ?? 0}
          icon={FileText}
          description={`${stats?.postsThisWeek ?? 0} new this week`}
        />
        <StatCard
          title="Total Views"
          value={stats?.totalViews ?? 0}
          icon={Eye}
          description={`${stats?.viewsGrowth ?? 0}% from last month`}
        />
        <StatCard
          title="Total Writers"
          value={stats?.totalWriters ?? 0}
          icon={Users}
          description={`${stats?.activeWriters ?? 0} active this month`}
        />
        <StatCard
          title="Total Followers"
          value={stats?.totalFollowers ?? 0}
          icon={TrendingUp}
          description={`${stats?.followerGrowth ?? 0}% from last month`}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Platform Growth</CardTitle>
            <CardDescription>Views and engagement over time</CardDescription>
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
            <CardTitle>Content Distribution</CardTitle>
            <CardDescription>Posts by category</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              {mounted && (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={stats?.postsByCategory ?? []} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="category" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="posts">
        <TabsList>
          <TabsTrigger value="posts">Recent Posts</TabsTrigger>
          <TabsTrigger value="comments">Recent Comments</TabsTrigger>
        </TabsList>
        <TabsContent value="posts">
          <Card>
            <CardHeader>
              <CardTitle>Recent Posts</CardTitle>
              <CardDescription>Latest content across the platform</CardDescription>
            </CardHeader>
            <CardContent>
              <AdminRecentPosts />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="comments">
          <Card>
            <CardHeader>
              <CardTitle>Recent Comments</CardTitle>
              <CardDescription>Latest engagement from readers</CardDescription>
            </CardHeader>
            <CardContent>
              <AdminRecentComments />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

