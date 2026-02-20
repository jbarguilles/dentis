"use client";

import React, { useState, useEffect } from "react";
import {
  getAllUsersAction,
  freezeUserAction,
  unfreezeUserAction,
  createUserAction,
  type ActionResult,
} from "@/actions/userActions";
import { type User, type SignUpRequest } from "@/services/userService";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { CreateUserDialog } from "./create-user-dialog";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { UserPlus, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

function UsersPage() {
  const { isAuthenticated, isLoading: authLoading, user } = useAuth();
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [createUserOpen, setCreateUserOpen] = useState(false);
  const [createUserLoading, setCreateUserLoading] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState<{
    open: boolean;
    user: User | null;
    action: "freeze" | "unfreeze" | null;
  }>({
    open: false,
    user: null,
    action: null,
  });

  // Check authentication and redirect if necessary
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push("/login");
      return;
    }
  }, [authLoading, isAuthenticated, router, user]);

  // Check if user has admin privileges
  useEffect(() => {
    if (!authLoading && isAuthenticated && user && !["ADMIN", "SUPERADMIN"].includes(user.role)) {
      router.push("/unauthorized");
      return;
    }
  }, [authLoading, isAuthenticated, user, router]);

  // Fetch users data
  const fetchUsers = async () => {
    if (!isAuthenticated) return;

    setLoading(true);
    try {
      const result: ActionResult<User[]> = await getAllUsersAction();
      if (result.success && result.data) {
        setUsers(result.data);
      } else {
        toast.error(result.error || "Failed to fetch users");
        setUsers([]);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("An unexpected error occurred");
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  // Handle create user
  const handleCreateUser = async (userData: SignUpRequest) => {
    setCreateUserLoading(true);
    try {
      const result = await createUserAction(userData);
      if (result.success) {
        toast.success("User created successfully");
        setCreateUserOpen(false);
        await fetchUsers(); // Refresh data
      } else {
        toast.error(result.error || "Failed to create user");
        throw new Error(result.error);
      }
    } catch (error) {
      console.error("Error creating user:", error);
      throw error; // Re-throw to prevent dialog from closing
    } finally {
      setCreateUserLoading(false);
    }
  };

  // Handle freeze/unfreeze user
  const handleUserAction = async (action: "freeze" | "unfreeze") => {
    if (!confirmDialog.user) return;

    try {
      const result =
        action === "freeze"
          ? await freezeUserAction(confirmDialog.user.userId)
          : await unfreezeUserAction(confirmDialog.user.userId);

      if (result.success) {
        toast.success(`User ${action === "freeze" ? "frozen" : "unfrozen"} successfully`);
        await fetchUsers(); // Refresh data
      } else {
        toast.error(result.error || `Failed to ${action} user`);
      }
    } catch (error) {
      console.error(`Error ${action}ing user:`, error);
      toast.error(`An error occurred while ${action}ing the user`);
    } finally {
      setConfirmDialog({ open: false, user: null, action: null });
    }
  };

  // Load data on mount
  useEffect(() => {
    if (isAuthenticated && user && ["ADMIN", "SUPERADMIN"].includes(user.role)) {
      fetchUsers();
    }
  }, [isAuthenticated, user]);

  // Don't render anything if not authenticated (will redirect)
  if (!isAuthenticated) {
    return null;
  }

  // Show unauthorized message if user doesn't have admin privileges
  if (!user || !["ADMIN", "SUPERADMIN"].includes(user.role)) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Access Denied</h2>
          <p className="text-gray-600">You don't have permission to access this page.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 space-y-6 px-16 py-8 md:py-12">
      <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold text-[#800000] mb-2 tracking-tight">User Management</h1>
        <p className="text-gray-600 mb-6">Manage system users and their permissions</p>

        <div className="mb-6 flex justify-between items-end">
          <div></div>
          <div className="flex items-center gap-2">
            <Button onClick={() => setCreateUserOpen(true)} className="gap-2 bg-gradient-to-br from-[#800000] to-[#990000] text-white hover:shadow-md">
              <UserPlus className="h-4 w-4" />
              Create User
            </Button>
            <Button onClick={fetchUsers} variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          {/* Data Table */}
          <DataTable
            columns={columns({
              onFreezeUser: (user: User) =>
                setConfirmDialog({ open: true, user, action: "freeze" }),
              onUnfreezeUser: (user: User) =>
                setConfirmDialog({ open: true, user, action: "unfreeze" }),
            })}
            data={users}
            searchKey="username"
            searchPlaceholder="Filter by username..."
          />
        </div>

        {/* Create User Dialog */}
        <CreateUserDialog
          open={createUserOpen}
          onOpenChange={setCreateUserOpen}
          onSubmit={handleCreateUser}
          isLoading={createUserLoading}
        />

        {/* Confirmation Dialog */}
        <Dialog
          open={confirmDialog.open}
          onOpenChange={(open) => setConfirmDialog((prev) => ({ ...prev, open }))}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {confirmDialog.action === "freeze"
                  ? "Freeze User Account"
                  : "Unfreeze User Account"}
              </DialogTitle>
              <DialogDescription>
                Are you sure you want to {confirmDialog.action} the account for{" "}
                <strong>{confirmDialog.user?.username}</strong>?
                {confirmDialog.action === "freeze" &&
                  " This will prevent the user from accessing the system."}
                {confirmDialog.action === "unfreeze" &&
                  " This will restore the user's access to the system."}
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setConfirmDialog({ open: false, user: null, action: null })}
              >
                Cancel
              </Button>
              <Button
                variant={confirmDialog.action === "freeze" ? "destructive" : "default"}
                onClick={() => handleUserAction(confirmDialog.action!)}
              >
                {confirmDialog.action === "freeze" ? "Freeze Account" : "Unfreeze Account"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      </div>
    </div>
  );
}

export default UsersPage;
