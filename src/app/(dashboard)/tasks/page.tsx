"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  MoreVertical,
  Edit2,
  Trash2,
  CheckSquare,
  Calendar,
  Search,
  AlertCircle,
  Clock,
  CheckCircle2,
  GripVertical,
} from "lucide-react";
import { Header } from "@/components/layout/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useAppStore } from "@/lib/store";
import { useToast } from "@/components/ui/use-toast";
import { formatDate, getInitials } from "@/lib/utils";
import { Task } from "@/lib/mock-data";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 },
};

export default function TasksPage() {
  const { tasks, projects, teamMembers, addTask, updateTask, deleteTask, addActivity } =
    useAppStore();
  const { toast } = useToast();

  const [searchQuery, setSearchQuery] = useState("");
  const [projectFilter, setProjectFilter] = useState<string>("all");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [draggedTask, setDraggedTask] = useState<Task | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    projectId: "",
    assigneeId: "",
    status: "todo" as Task["status"],
    priority: "medium" as Task["priority"],
    dueDate: "",
  });

  // Filter tasks based on search and project, but don't filter by status
  const searchedTasks = tasks.filter((task) => {
    const matchesSearch = task.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesProject =
      projectFilter === "all" || task.projectId === projectFilter;
    return matchesSearch && matchesProject;
  });

  // Group all tasks by status (no status filter)
  const groupedTasks = {
    todo: searchedTasks.filter((t) => t.status === "todo"),
    "in-progress": searchedTasks.filter((t) => t.status === "in-progress"),
    done: searchedTasks.filter((t) => t.status === "done"),
  };

  const handleCreate = () => {
    if (!formData.title || !formData.projectId) {
      toast({
        title: "Please fill in required fields",
        variant: "error",
      });
      return;
    }

    addTask({
      ...formData,
      dueDate: formData.dueDate || new Date().toISOString().split("T")[0],
    });

    // Add activity log
    addActivity({
      userId: "user-1",
      userName: "You",
      action: "created task",
      target: formData.title,
      type: "task",
    });

    toast({
      title: "Task created successfully",
      variant: "success",
    });

    setIsCreateDialogOpen(false);
    resetForm();
  };

  const handleEdit = () => {
    if (!selectedTask) return;

    updateTask(selectedTask.id, formData);

    addActivity({
      userId: "user-1",
      userName: "You",
      action: "updated task",
      target: selectedTask.title,
      type: "task",
    });

    toast({
      title: "Task updated successfully",
      variant: "success",
    });

    setIsEditDialogOpen(false);
    setSelectedTask(null);
    resetForm();
  };

  const handleDelete = (task: Task) => {
    deleteTask(task.id);
    addActivity({
      userId: "user-1",
      userName: "You",
      action: "deleted task",
      target: task.title,
      type: "task",
    });
    toast({
      title: "Task deleted successfully",
      variant: "success",
    });
  };

  const handleStatusChange = (task: Task, newStatus: Task["status"]) => {
    updateTask(task.id, { status: newStatus });
    const actionText = newStatus === "done" ? "completed" : `moved to ${newStatus.replace("-", " ")}`;
    addActivity({
      userId: "user-1",
      userName: "You",
      action: actionText,
      target: task.title,
      type: "task",
    });
    toast({
      title:
        newStatus === "done"
          ? "Task completed! 🎉"
          : `Task moved to ${newStatus.replace("-", " ")}`,
      variant: "success",
    });
  };

  const handleDragStart = (task: Task) => {
    setDraggedTask(task);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (status: Task["status"]) => {
    if (draggedTask && draggedTask.status !== status) {
      handleStatusChange(draggedTask, status);
    }
    setDraggedTask(null);
  };

  const handleDragEnd = () => {
    setDraggedTask(null);
  };

  const openEditDialog = (task: Task) => {
    setSelectedTask(task);
    setFormData({
      title: task.title,
      description: task.description,
      projectId: task.projectId,
      assigneeId: task.assigneeId,
      status: task.status,
      priority: task.priority,
      dueDate: task.dueDate,
    });
    setIsEditDialogOpen(true);
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      projectId: "",
      assigneeId: "",
      status: "todo",
      priority: "medium",
      dueDate: "",
    });
  };

  const getPriorityBadge = (priority: Task["priority"]) => {
    switch (priority) {
      case "high":
        return (
          <Badge variant="error" className="gap-1">
            <AlertCircle className="h-3 w-3" />
            High
          </Badge>
        );
      case "medium":
        return <Badge variant="warning">Medium</Badge>;
      case "low":
        return <Badge variant="default">Low</Badge>;
    }
  };

  const getStatusIcon = (status: Task["status"]) => {
    switch (status) {
      case "todo":
        return <CheckSquare className="h-4 w-4 text-gray-400" />;
      case "in-progress":
        return <Clock className="h-4 w-4 text-blue-500" />;
      case "done":
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
    }
  };

  const TaskCard = ({ task }: { task: Task }) => {
    const project = projects.find((p) => p.id === task.projectId);
    const assignee = teamMembers.find((m) => m.id === task.assigneeId);
    const isDragged = draggedTask?.id === task.id;

    return (
      <motion.div 
        variants={itemVariants} 
        layout
        draggable
        onDragStart={() => handleDragStart(task)}
        onDragEnd={handleDragEnd}
        className={isDragged ? "opacity-50" : ""}
      >
        <Card 
          className="group transition-all hover:shadow-md cursor-move hover:scale-105 select-none"
          onClick={() => openEditDialog(task)}
        >
          <CardContent className="p-4">
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-start gap-2 flex-1 min-w-0">
                <GripVertical className="h-4 w-4 text-gray-400 flex-shrink-0 mt-1" />
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-gray-900 dark:text-white truncate">
                    {task.title}
                  </h4>
                  <p className="mt-1 line-clamp-2 text-sm text-gray-500 dark:text-gray-400">
                    {task.description}
                  </p>
                </div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 opacity-0 group-hover:opacity-100 flex-shrink-0"
                  >
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {task.status !== "todo" && (
                    <DropdownMenuItem
                      onClick={(e) => {
                        e.stopPropagation();
                        handleStatusChange(task, "todo");
                      }}
                    >
                      Move to Todo
                    </DropdownMenuItem>
                  )}
                  {task.status !== "in-progress" && (
                    <DropdownMenuItem
                      onClick={(e) => {
                        e.stopPropagation();
                        handleStatusChange(task, "in-progress");
                      }}
                    >
                      Move to In Progress
                    </DropdownMenuItem>
                  )}
                  {task.status !== "done" && (
                    <DropdownMenuItem
                      onClick={(e) => {
                        e.stopPropagation();
                        handleStatusChange(task, "done");
                      }}
                    >
                      Mark Complete
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem 
                    onClick={(e) => {
                      e.stopPropagation();
                      openEditDialog(task);
                    }}
                  >
                    <Edit2 className="mr-2 h-4 w-4" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(task);
                    }}
                    className="text-red-600 focus:text-red-700"
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                {getPriorityBadge(task.priority)}
                {project && (
                  <Badge variant="outline" className="text-xs">
                    {project.name.slice(0, 15)}
                    {project.name.length > 15 && "..."}
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <Calendar className="h-3 w-3" />
                {formatDate(task.dueDate)}
              </div>
            </div>

            {assignee && (
              <div className="mt-3 flex items-center gap-2 border-t border-gray-100 pt-3 dark:border-gray-800">
                <Avatar className="h-6 w-6">
                  <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-600 text-xs text-white">
                    {getInitials(assignee.name)}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {assignee.name}
                </span>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen">
      <Header
        title="Tasks"
        description="Manage and track all your tasks across projects. Drag cards between columns to change status."
      />

      <div className="p-6">
        {/* Toolbar */}
        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-1 flex-wrap gap-4">
            <div className="relative flex-1 min-w-[200px] max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search tasks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={projectFilter} onValueChange={setProjectFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Project" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Projects</SelectItem>
                {projects.map((project) => (
                  <SelectItem key={project.id} value={project.id}>
                    {project.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button onClick={() => setIsCreateDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            New Task
          </Button>
        </div>

        {/* Kanban Board */}
        <div className="grid gap-6 lg:grid-cols-3">
          {(
            [
              { key: "todo", title: "To Do", color: "bg-gray-500" },
              { key: "in-progress", title: "In Progress", color: "bg-blue-500" },
              { key: "done", title: "Done", color: "bg-green-500" },
            ] as const
          ).map(({ key, title, color }) => (
            <Card 
              key={key} 
              className="bg-gray-50/50 dark:bg-gray-900/50 min-h-[600px] flex flex-col"
              onDragOver={handleDragOver}
              onDrop={() => handleDrop(key)}
            >
              <CardHeader className="pb-3 sticky top-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`h-3 w-3 rounded-full ${color}`} />
                    <CardTitle className="text-sm font-medium">
                      {title}
                    </CardTitle>
                  </div>
                  <Badge variant="outline">{groupedTasks[key].length}</Badge>
                </div>
              </CardHeader>
              <CardContent className="flex-1 overflow-y-auto">
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="space-y-3"
                >
                  <AnimatePresence mode="popLayout">
                    {groupedTasks[key].length > 0 ? (
                      groupedTasks[key].map((task) => (
                        <TaskCard key={task.id} task={task} />
                      ))
                    ) : (
                      <div className="rounded-lg border border-dashed border-gray-200 p-8 text-center dark:border-gray-700">
                        <CheckSquare className="mx-auto h-8 w-8 text-gray-300 dark:text-gray-600" />
                        <p className="mt-2 text-sm text-gray-500">Drag tasks here</p>
                      </div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Create Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Create New Task</DialogTitle>
            <DialogDescription>Add a new task to your project.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <label className="mb-2 block text-sm font-medium">Title</label>
              <Input
                placeholder="Enter task title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium">
                Description
              </label>
              <Textarea
                placeholder="Enter task description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-2 block text-sm font-medium">Project</label>
                <Select
                  value={formData.projectId}
                  onValueChange={(value) =>
                    setFormData({ ...formData, projectId: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select project" />
                  </SelectTrigger>
                  <SelectContent>
                    {projects.map((project) => (
                      <SelectItem key={project.id} value={project.id}>
                        {project.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Assignee
                </label>
                <Select
                  value={formData.assigneeId}
                  onValueChange={(value) =>
                    setFormData({ ...formData, assigneeId: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select member" />
                  </SelectTrigger>
                  <SelectContent>
                    {teamMembers.map((member) => (
                      <SelectItem key={member.id} value={member.id}>
                        {member.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Priority
                </label>
                <Select
                  value={formData.priority}
                  onValueChange={(value: Task["priority"]) =>
                    setFormData({ ...formData, priority: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Due Date
                </label>
                <Input
                  type="date"
                  value={formData.dueDate}
                  onChange={(e) =>
                    setFormData({ ...formData, dueDate: e.target.value })
                  }
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setIsCreateDialogOpen(false);
                resetForm();
              }}
            >
              Cancel
            </Button>
            <Button onClick={handleCreate}>Create Task</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Edit Task</DialogTitle>
            <DialogDescription>Make changes to your task.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <label className="mb-2 block text-sm font-medium">Title</label>
              <Input
                placeholder="Enter task title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium">
                Description
              </label>
              <Textarea
                placeholder="Enter task description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-2 block text-sm font-medium">Status</label>
                <Select
                  value={formData.status}
                  onValueChange={(value: Task["status"]) =>
                    setFormData({ ...formData, status: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todo">To Do</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="done">Done</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Priority
                </label>
                <Select
                  value={formData.priority}
                  onValueChange={(value: Task["priority"]) =>
                    setFormData({ ...formData, priority: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Assignee
                </label>
                <Select
                  value={formData.assigneeId}
                  onValueChange={(value) =>
                    setFormData({ ...formData, assigneeId: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select member" />
                  </SelectTrigger>
                  <SelectContent>
                    {teamMembers.map((member) => (
                      <SelectItem key={member.id} value={member.id}>
                        {member.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Due Date
                </label>
                <Input
                  type="date"
                  value={formData.dueDate}
                  onChange={(e) =>
                    setFormData({ ...formData, dueDate: e.target.value })
                  }
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setIsEditDialogOpen(false);
                setSelectedTask(null);
                resetForm();
              }}
            >
              Cancel
            </Button>
            <Button onClick={handleEdit}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
