"use client"

import * as React from "react"
import type { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal, Loader2, UserCheck, UserX, Shield, Ban } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DataTable } from "@/components/ui/data-table"
import { useUsers, useDeleteUser, useApproveUser, useSuspendUser, useChangeAccountType, useMakeWriter } from "@/lib/hooks/use-users"

interface User {
  _id: string
  name: string
  email: string
  accountType: "Admin" | "Writer"
  status: "Pending" | "Active" | "Suspended"
  image?: string
  createdAt: string
}

export default function UsersPage() {
  const [statusFilter, setStatusFilter] = React.useState<string>("")
  const [searchQuery, setSearchQuery] = React.useState<string>("")

  const { data: users = [], isLoading } = useUsers(statusFilter, searchQuery)
  const { mutate: deleteUser } = useDeleteUser()
  const { mutate: approveUser } = useApproveUser()
  const { mutate: suspendUser } = useSuspendUser()
  const { mutate: changeAccountType } = useChangeAccountType()
  const { mutate: makeWriter } = useMakeWriter()

  const columns: ColumnDef<User>[] = [
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => {
        const user = row.original
        return (
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src={user.image} alt={user.name} />
              <AvatarFallback>{user.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium">{user.name}</div>
              <div className="text-sm text-muted-foreground">{user.email}</div>
            </div>
          </div>
        )
      },
    },
    {
      accessorKey: "accountType",
      header: ({ column }) => {
        return (
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            Role
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => (
        <Badge variant={row.original.accountType === "Admin" ? "default" : "secondary"}>
          {row.original.accountType}
        </Badge>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.original.status
        return (
          <Badge variant={status === "Active" ? "success" : status === "Pending" ? "warning" : "destructive"}>
            {status}
          </Badge>
        )
      },
    },
    {
      accessorKey: "createdAt",
      header: ({ column }) => {
        return (
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            Joined
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => new Date(row.original.createdAt).toLocaleDateString(),
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const user = row.original

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              {user.status === "Pending" && (
                <DropdownMenuItem onClick={() => approveUser(user._id)}>
                  <UserCheck className="mr-2 h-4 w-4" />
                  Approve User
                </DropdownMenuItem>
              )}

              {user.status === "Suspended" && (
                <DropdownMenuItem onClick={() => approveUser(user._id)}>
                  <UserCheck className="mr-2 h-4 w-4" />
                  Approve User
                </DropdownMenuItem>
              )}
              {/* {user.accountType === "Admin" && (
                <DropdownMenuItem onClick={() => changeAccountType(user._id)}>
                <Shield className="mr-2 h-4 w-4" />
                Change to Writer
              </DropdownMenuItem>
              )} */}

              {user.accountType === "Writer" && (
                <DropdownMenuItem onClick={() => changeAccountType(user._id)}>
                  <Shield className="mr-2 h-4 w-4" />
                  Change to Admin
                </DropdownMenuItem>
              )}
              {user.accountType === "Admin" && (
                <DropdownMenuItem onClick={() => makeWriter(user._id)}>
                  <Shield className="mr-2 h-4 w-4" />
                  Change to Writer
                </DropdownMenuItem>
              )}
              {user.status !== "Pending" && (
                <DropdownMenuItem onClick={() => suspendUser(user._id)}>
                  <Ban className="mr-2 h-4 w-4" />
                  {user.status === "Active" ? "Suspend" : "Suspend"} User
                </DropdownMenuItem>
              )}
              <DropdownMenuSeparator />
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="text-destructive">
                    <UserX className="mr-2 h-4 w-4" />
                    Delete User
                  </DropdownMenuItem>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete the user account and remove their data
                      from our servers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => deleteUser(user._id)}
                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    >
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]

  if (isLoading) {
    return (
      <div className="flex h-[calc(100vh-4rem)] items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    )
  }

  return (
    <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Users</h2>
          <p className="text-muted-foreground">Manage user accounts, roles and permissions.</p>
        </div>
      </div>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex flex-1 items-center space-x-2">
            <Input
              placeholder="Search users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-[150px] lg:w-[250px]"
            />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  Status
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setStatusFilter("")}>All</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("Active")}>Active</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("Pending")}>Pending</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("Suspended")}>Suspended</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <DataTable columns={columns} data={users} />
      </div>
    </div>
  )
}

