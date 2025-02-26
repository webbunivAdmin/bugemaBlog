"use client"

import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import { format } from "date-fns"
import { ArrowLeft, Calendar, Eye, MessageSquare, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { usePost } from "@/lib/hooks/use-posts"
import { Comments } from "@/components/comments"
import { cn } from "@/lib/utils"

export default function ViewPostPage() {
  const params = useParams()
  const router = useRouter()
  const { data: post, isLoading, error } = usePost(params.id as string)

  if (isLoading) {
    return (
      <div className="container mx-auto max-w-4xl py-8">
        <div className="mb-8 flex items-center justify-between">
          <Skeleton className="h-10 w-[100px]" />
          <Skeleton className="h-10 w-[100px]" />
        </div>
        <Card>
          <CardHeader className="space-y-6">
            <Skeleton className="aspect-video w-full rounded-lg" />
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-4">
                <Skeleton className="h-6 w-[100px]" />
                <Skeleton className="h-6 w-[100px]" />
              </div>
              <Skeleton className="h-12 w-3/4" />
              <div className="flex flex-wrap items-center gap-6">
                <Skeleton className="h-6 w-[120px]" />
                <Skeleton className="h-6 w-[200px]" />
                <Skeleton className="h-6 w-[100px]" />
                <Skeleton className="h-6 w-[100px]" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto py-8">
        <div className="flex h-[50vh] items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold">Error</h1>
            <p className="text-muted-foreground">Failed to load post. Please try again.</p>
            <Button variant="link" onClick={() => router.back()}>
              Go back
            </Button>
          </div>
        </div>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="container mx-auto py-8">
        <div className="flex h-[50vh] items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold">Post not found</h1>
            <p className="text-muted-foreground">The post you&apos;re looking for doesn&apos;t exist.</p>
            <Button variant="link" onClick={() => router.back()}>
              Go back
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto max-w-4xl py-8">
      <div className="mb-8 flex items-center justify-between">
        <Button variant="ghost" onClick={() => router.back()} className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
        <Button onClick={() => router.push(`/dashboard/posts/edit/${post._id}`)}>Edit Post</Button>
      </div>

      <Card>
        <CardHeader className="space-y-6">
          {post.image && (
            <div className="aspect-video overflow-hidden rounded-lg border">
              <Image
                src={post.image || "/placeholder.svg"}
                alt={post.title}
                width={1200}
                height={630}
                className="h-full w-full object-cover"
                priority
              />
            </div>
          )}
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-4">
              <Badge variant="outline" className="capitalize">
                {post.cat}
              </Badge>
              <Badge
                variant={post.state === "Published" ? "default" : post.state === "Pending" ? "secondary" : "outline"}
              >
                {post.state}
              </Badge>
            </div>
            <h1 className="text-4xl font-bold">{post.title}</h1>
            <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <time dateTime={post.createdAt}>{format(new Date(post.createdAt), "PPP")}</time>
              </div>
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <div className="flex items-center gap-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={post.user.image} alt={post.user.name} />
                    <AvatarFallback>{post.user.name[0]}</AvatarFallback>
                  </Avatar>
                  <span>{post.user.name}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Eye className="h-4 w-4" />
                <span>1.2K views</span>
              </div>
              <div className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                <span>8 comments</span>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <Tabs defaultValue="content" className="w-full">
            <TabsList className="w-full grid grid-cols-2 mb-6">
              <TabsTrigger value="content" className="flex items-center gap-2">
                Content
              </TabsTrigger>
              <TabsTrigger value="comments" className="flex items-center gap-2">
                Comments{" "}
                <Badge variant="secondary" className="ml-2">
                  8
                </Badge>
              </TabsTrigger>
            </TabsList>
            <TabsContent value="content" className="mt-0">
              <div
                className={cn(
                  "prose prose-stone max-w-none dark:prose-invert",
                  "prose-headings:font-bold prose-headings:tracking-tight",
                  "prose-a:text-primary prose-a:underline-offset-4 hover:prose-a:text-primary/80",
                  "prose-img:rounded-lg prose-img:border",
                )}
                dangerouslySetInnerHTML={{ __html: post.desc }}
              />
            </TabsContent>
            <TabsContent value="comments" className="mt-0">
              <Comments postId={post._id} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

