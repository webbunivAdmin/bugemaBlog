"use client"

import { useParams, useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Loader2 } from "lucide-react"
import { toast } from "sonner"
import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Editor } from "@/components/editor"
import { ImageUpload } from "@/components/ui/image-upload"
import { usePost, useUpdatePost } from "@/lib/hooks/use-posts"
import { Card, CardContent } from "@/components/ui/card"

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  desc: z.string().min(1, "Content is required"),
  cat: z.string().min(1, "Category is required"),
  img: z.string().optional(),
})

type FormData = z.infer<typeof formSchema>

const categories = ["TECHNOLOGY", "BUSINESS", "SCIENCE", "HEALTH", "ENTERTAINMENT", "SPORTS"]

export default function EditPostPage() {
  const params = useParams()
  const router = useRouter()
  const { data: post, isLoading: isLoadingPost, error } = usePost(params.id as string)
  const { mutate: updatePost, isPending } = useUpdatePost()
  const [isFormReady, setIsFormReady] = useState(false)

  // Set up form with empty default values initially
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      desc: "",
      cat: "",
      img: "",
    },
  })

  // Update form values when post data is loaded
  useEffect(() => {
    if (post) {
      console.log("Loading post data:", post)

      // Force a delay to ensure the form reset happens after rendering
      setTimeout(() => {
        // Make sure img is properly set from post.img
        const formValues = {
          title: post.title || "",
          desc: post.desc || "",
          cat: post.cat || "",
          img: post.img || "",
        }

        console.log("Setting form values:", formValues)
        form.reset(formValues)

        // Force an update to the img field specifically
        form.setValue("img", post.img || "")

        setIsFormReady(true)
      }, 100)
    }
  }, [post, form])

  function onSubmit(values: FormData) {
    console.log("Submitting values:", values)
    updatePost(
      { postId: params.id as string, data: values },
      {
        onSuccess: () => {
          toast.success("Post updated successfully")
          router.push("/dashboard/posts")
        },
      },
    )
  }

  if (isLoadingPost) {
    return (
      <div className="container mx-auto py-8">
        <div className="flex h-[calc(100vh-4rem)] items-center justify-center">
          <Loader2 className="h-6 w-6 animate-spin" />
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto py-8">
        <div className="flex h-[calc(100vh-4rem)] items-center justify-center">
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
        <div className="flex h-[calc(100vh-4rem)] items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold">Post not found</h1>
            <p className="text-muted-foreground">The post you&apos;re trying to edit doesn&apos;t exist.</p>
            <Button variant="link" onClick={() => router.back()}>
              Go back
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Edit Post</h2>
          <p className="text-muted-foreground">Make changes to your post here. Click save when you&apos;re done.</p>
        </div>
      </div>
      <Card className="mt-8">
        <CardContent className="p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

              <FormField
                control={form.control}
                name="img"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cover Image</FormLabel>
                    <FormControl>
                      <ImageUpload
                        value={field.value}
                        onChange={(url) => {
                          console.log("Image changed to:", url)
                          field.onChange(url)
                        }}
                        onError={(error) => {
                          console.error("Image upload error:", error)
                          toast.error("Failed to upload image. Please try again.")
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid gap-8 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Post title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="cat"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              {isFormReady && (
                <FormField
                  control={form.control}
                  name="desc"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Content</FormLabel>
                      <FormControl>
                        <Editor
                          value={field.value}
                          onChange={field.onChange}
                          placeholder="Write your post content here..."
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              <div className="flex justify-end gap-4">
                <Button type="button" variant="outline" onClick={() => router.back()}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isPending}>
                  {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Save Changes
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}

