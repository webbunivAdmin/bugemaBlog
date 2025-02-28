import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const recentPosts = [
  { id: 1, title: "Getting Started with Next.js", author: "John Doe", views: 1200 },
  { id: 2, title: "React Hooks Explained", author: "Jane Smith", views: 980 },
  { id: 3, title: "CSS Grid Layout", author: "Bob Johnson", views: 750 },
  { id: 4, title: "TypeScript Best Practices", author: "Alice Brown", views: 600 },
  { id: 5, title: "Introduction to GraphQL", author: "Charlie Green", views: 450 },
]

export function RecentPosts() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>Author</TableHead>
          <TableHead>Views</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {recentPosts.map((post) => (
          <TableRow key={post.id}>
            <TableCell>{post.title}</TableCell>
            <TableCell>{post.author}</TableCell>
            <TableCell>{post.views}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

