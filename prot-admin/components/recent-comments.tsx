import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const recentComments = [
  { id: 1, author: "John Doe", post: "Getting Started with Next.js", comment: "Great article! Very helpful." },
  {
    id: 2,
    author: "Jane Smith",
    post: "React Hooks Explained",
    comment: "This cleared up a lot of confusion for me. Thanks!",
  },
  { id: 3, author: "Bob Johnson", post: "CSS Grid Layout", comment: "Could you elaborate more on grid areas?" },
  {
    id: 4,
    author: "Alice Brown",
    post: "TypeScript Best Practices",
    comment: "I learned a lot from this. Keep up the good work!",
  },
  {
    id: 5,
    author: "Charlie Green",
    post: "Introduction to GraphQL",
    comment: "This is a great introduction to GraphQL. Looking forward to more advanced topics.",
  },
]

export function RecentComments() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Author</TableHead>
          <TableHead>Post</TableHead>
          <TableHead>Comment</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {recentComments.map((comment) => (
          <TableRow key={comment.id}>
            <TableCell>{comment.author}</TableCell>
            <TableCell>{comment.post}</TableCell>
            <TableCell>{comment.comment}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

