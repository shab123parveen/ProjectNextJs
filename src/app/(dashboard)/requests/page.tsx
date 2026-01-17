"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageSquare,
  CheckCircle2,
  XCircle,
  Clock,
  Mail,
  AlertCircle,
  Search,
  Filter,
} from "lucide-react";
import { Header } from "@/components/layout/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAppStore } from "@/lib/store";
import { useToast } from "@/components/ui/use-toast";
import { formatDate } from "@/lib/utils";
import { ClientRequest } from "@/lib/mock-data";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function RequestsPage() {
  const { clientRequests, updateRequestStatus, addActivity } = useAppStore();
  const { toast } = useToast();

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [priorityFilter, setPriorityFilter] = useState<string>("all");

  const filteredRequests = clientRequests.filter((request) => {
    const matchesSearch =
      request.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.subject.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || request.status === statusFilter;
    const matchesPriority =
      priorityFilter === "all" || request.priority === priorityFilter;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const handleApprove = (request: ClientRequest) => {
    updateRequestStatus(request.id, "approved");
    addActivity({
      userId: "user-1",
      userName: "You",
      action: "approved request from",
      target: request.clientName,
      type: "request",
    });
    toast({
      title: "Request Approved",
      description: `Request from ${request.clientName} has been approved.`,
      variant: "success",
    });
  };

  const handleReject = (request: ClientRequest) => {
    updateRequestStatus(request.id, "rejected");
    addActivity({
      userId: "user-1",
      userName: "You",
      action: "rejected request from",
      target: request.clientName,
      type: "request",
    });
    toast({
      title: "Request Rejected",
      description: `Request from ${request.clientName} has been rejected.`,
      variant: "error",
    });
  };

  const getStatusBadge = (status: ClientRequest["status"]) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="warning" className="gap-1">
            <Clock className="h-3 w-3" />
            Pending
          </Badge>
        );
      case "approved":
        return (
          <Badge variant="success" className="gap-1">
            <CheckCircle2 className="h-3 w-3" />
            Approved
          </Badge>
        );
      case "rejected":
        return (
          <Badge variant="error" className="gap-1">
            <XCircle className="h-3 w-3" />
            Rejected
          </Badge>
        );
    }
  };

  const getPriorityBadge = (priority: ClientRequest["priority"]) => {
    switch (priority) {
      case "high":
        return (
          <Badge variant="error" className="gap-1">
            <AlertCircle className="h-3 w-3" />
            High Priority
          </Badge>
        );
      case "medium":
        return <Badge variant="warning">Medium</Badge>;
      case "low":
        return <Badge variant="default">Low</Badge>;
    }
  };

  const stats = {
    pending: clientRequests.filter((r) => r.status === "pending").length,
    approved: clientRequests.filter((r) => r.status === "approved").length,
    rejected: clientRequests.filter((r) => r.status === "rejected").length,
  };

  return (
    <div className="min-h-screen">
      <Header
        title="Client Requests"
        description="Review and manage incoming client requests."
      />

      <div className="p-6">
        {/* Stats */}
        <div className="mb-6 grid gap-4 sm:grid-cols-3">
          <Card>
            <CardContent className="flex items-center gap-4 p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-yellow-400 to-orange-500">
                <Clock className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stats.pending}
                </p>
                <p className="text-sm text-gray-500">Pending Review</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-4 p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-green-500 to-emerald-500">
                <CheckCircle2 className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stats.approved}
                </p>
                <p className="text-sm text-gray-500">Approved</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-4 p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-red-500 to-rose-500">
                <XCircle className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stats.rejected}
                </p>
                <p className="text-sm text-gray-500">Rejected</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Toolbar */}
        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-1 flex-wrap gap-4">
            <div className="relative flex-1 min-w-[200px] max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search requests..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priority</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Requests List */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-4"
        >
          <AnimatePresence mode="popLayout">
            {filteredRequests.map((request) => (
              <motion.div
                key={request.id}
                variants={itemVariants}
                layout
                exit={{ opacity: 0, x: -20 }}
              >
                <Card className="transition-all hover:shadow-md cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-900/50">
                  <CardContent className="p-6">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            {request.subject}
                          </h3>
                          {getStatusBadge(request.status)}
                          {getPriorityBadge(request.priority)}
                        </div>

                        <div className="mt-2 flex items-center gap-4 text-sm text-gray-500">
                          <span className="font-medium text-gray-900 dark:text-gray-100">
                            {request.clientName}
                          </span>
                          <div className="flex items-center gap-1">
                            <Mail className="h-4 w-4" />
                            {request.clientEmail}
                          </div>
                          <span>{formatDate(request.createdAt)}</span>
                        </div>

                        <p className="mt-3 text-gray-600 dark:text-gray-400">
                          {request.message}
                        </p>
                      </div>

                      {request.status === "pending" && (
                        <div className="flex gap-2 lg:flex-col">
                          <Button
                            variant="success"
                            size="sm"
                            onClick={() => handleApprove(request)}
                            className="flex-1"
                          >
                            <CheckCircle2 className="mr-2 h-4 w-4" />
                            Approve
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleReject(request)}
                            className="flex-1"
                          >
                            <XCircle className="mr-2 h-4 w-4" />
                            Reject
                          </Button>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredRequests.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-12"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
              <MessageSquare className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">
              No requests found
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchQuery || statusFilter !== "all" || priorityFilter !== "all"
                ? "Try adjusting your search or filters"
                : "No client requests at this time"}
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
