"use client";

import { Eye, Pencil, Trash2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Surface } from "@/components/layout/surface";
import { RoleBadge } from "@/components/layout/role-badge";
import { InterestChips } from "@/components/layout/interest-chips";
import { IconButton } from "@/components/layout/icon-button";
import { UserAvatar } from "@/components/layout/user-avatar";
import type { User } from "@/types/user";

export function UserTable({
  users,
  onDelete,
}: {
  users: User[];
  onDelete: (user: User) => void;
}) {
  return (
    <>
      <div className="grid gap-3 md:hidden">
        {users.map((user) => (
          <Surface key={user._id} className="p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="flex min-w-0 items-center gap-3">
                <UserAvatar name={user.name} size="sm" />
                <div className="min-w-0">
                  <p className="truncate font-medium">{user.name}</p>
                  <p className="truncate text-sm text-muted-foreground">{user.email}</p>
                </div>
              </div>
              <RoleBadge role={user.role} />
            </div>
            <div className="mt-3">
              <InterestChips interests={user.interests} />
            </div>
            <div className="mt-3 flex items-center justify-end border-t border-violet-100/80 pt-2">
              <IconButton href={`/admin/users/${user._id}`} label="Edit user" icon={Pencil} />
              <IconButton href={`/posts/${user._id}`} label="View posts" icon={Eye} />
              <IconButton
                label="Delete user"
                icon={Trash2}
                tone="danger"
                onClick={() => onDelete(user)}
              />
            </div>
          </Surface>
        ))}
      </div>

      <Surface padded={false} className="hidden overflow-hidden md:block">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="px-5">Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Interests</TableHead>
              <TableHead className="pr-5 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user._id}>
                <TableCell className="px-5">
                  <div className="flex items-center gap-3">
                    <UserAvatar name={user.name} size="sm" />
                    <span className="font-medium">{user.name}</span>
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground">{user.email}</TableCell>
                <TableCell>
                  <RoleBadge role={user.role} />
                </TableCell>
                <TableCell>
                  <InterestChips interests={user.interests} />
                </TableCell>
                <TableCell className="pr-5 text-right">
                  <div className="flex justify-end">
                    <IconButton href={`/admin/users/${user._id}`} label="Edit user" icon={Pencil} />
                    <IconButton href={`/posts/${user._id}`} label="View posts" icon={Eye} />
                    <IconButton
                      label="Delete user"
                      icon={Trash2}
                      tone="danger"
                      onClick={() => onDelete(user)}
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Surface>
    </>
  );
}
