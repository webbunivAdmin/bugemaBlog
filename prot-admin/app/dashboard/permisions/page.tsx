import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"

const permissions = [
  { id: 1, name: "Create Posts", admin: true, editor: true, writer: true },
  { id: 2, name: "Edit Posts", admin: true, editor: true, writer: false },
  { id: 3, name: "Delete Posts", admin: true, editor: false, writer: false },
  { id: 4, name: "Manage Users", admin: true, editor: false, writer: false },
]

export default function PermissionsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Permissions</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Permission</TableHead>
            <TableHead>Admin</TableHead>
            <TableHead>Editor</TableHead>
            <TableHead>Writer</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {permissions.map((permission) => (
            <TableRow key={permission.id}>
              <TableCell>{permission.name}</TableCell>
              <TableCell>
                <Checkbox checked={permission.admin} />
              </TableCell>
              <TableCell>
                <Checkbox checked={permission.editor} />
              </TableCell>
              <TableCell>
                <Checkbox checked={permission.writer} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Button>Save Changes</Button>
    </div>
  )
}

