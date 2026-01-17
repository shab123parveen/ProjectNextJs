"use client";

import { motion } from "framer-motion";
import {
  FolderKanban,
  CheckSquare,
  Users,
  MessageSquare,
  TrendingUp,
  TrendingDown,
  Clock,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Header } from "@/components/layout/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useAppStore } from "@/lib/store";
import {
  weeklyProgressData,
  taskDistributionData,
} from "@/lib/mock-data";
import { getInitials, formatTime } from "@/lib/utils";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function DashboardPage() {
  const { projects, tasks, teamMembers, clientRequests, activities } = useAppStore();

  const stats = [
    {
      title: "Total Projects",
      value: projects.length,
      change: "+12%",
      trend: "up",
      icon: FolderKanban,
      color: "from-blue-500 to-indigo-500",
    },
    {
      title: "Active Tasks",
      value: tasks.filter((t) => t.status !== "done").length,
      change: "+8%",
      trend: "up",
      icon: CheckSquare,
      color: "from-green-500 to-emerald-500",
    },
    {
      title: "Team Members",
      value: teamMembers.length,
      change: "+2",
      trend: "up",
      icon: Users,
      color: "from-purple-500 to-pink-500",
    },
    {
      title: "Pending Requests",
      value: clientRequests.filter((r) => r.status === "pending").length,
      change: "-3",
      trend: "down",
      icon: MessageSquare,
      color: "from-orange-500 to-red-500",
    },
  ];

  const recentActivities = activities.slice(0, 8);

  return (
    <div className="min-h-screen">
      <Header
        title="Dashboard"
        description="Welcome back! Here's what's happening with your projects."
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="p-6"
      >
        {/* Stats Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <motion.div key={stat.title} variants={itemVariants}>
              <Card className="relative overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        {stat.title}
                      </p>
                      <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
                        {stat.value}
                      </p>
                      <div className="mt-2 flex items-center gap-1 text-sm">
                        {stat.trend === "up" ? (
                          <TrendingUp className="h-4 w-4 text-green-500" />
                        ) : (
                          <TrendingDown className="h-4 w-4 text-red-500" />
                        )}
                        <span
                          className={
                            stat.trend === "up"
                              ? "text-green-600"
                              : "text-red-600"
                          }
                        >
                          {stat.change}
                        </span>
                        <span className="text-gray-400">vs last month</span>
                      </div>
                    </div>
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${stat.color} shadow-lg`}
                    >
                      <stat.icon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </CardContent>
                {/* Decorative gradient */}
                <div
                  className={`absolute -right-4 -bottom-4 h-24 w-24 rounded-full bg-gradient-to-br ${stat.color} opacity-10 blur-xl`}
                />
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Charts Row */}
        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          {/* Weekly Progress Chart */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Weekly Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={weeklyProgressData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis
                        dataKey="name"
                        stroke="#9ca3af"
                        fontSize={12}
                        tickLine={false}
                      />
                      <YAxis stroke="#9ca3af" fontSize={12} tickLine={false} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#fff",
                          border: "1px solid #e5e7eb",
                          borderRadius: "8px",
                          boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="tasks"
                        stroke="#3b82f6"
                        strokeWidth={3}
                        dot={{ fill: "#3b82f6", strokeWidth: 2, r: 4 }}
                        activeDot={{ r: 6 }}
                        name="Total Tasks"
                      />
                      <Line
                        type="monotone"
                        dataKey="completed"
                        stroke="#10b981"
                        strokeWidth={3}
                        dot={{ fill: "#10b981", strokeWidth: 2, r: 4 }}
                        activeDot={{ r: 6 }}
                        name="Completed"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Task Distribution */}
          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader>
                <CardTitle>Task Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={taskDistributionData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={90}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {taskDistributionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#fff",
                          border: "1px solid #e5e7eb",
                          borderRadius: "8px",
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-4 flex justify-center gap-6">
                  {taskDistributionData.map((item) => (
                    <div key={item.name} className="flex items-center gap-2">
                      <div
                        className="h-3 w-3 rounded-full"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {item.name}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Activity Feed and Recent Projects */}
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          {/* Activity Feed */}
          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Recent Activity</CardTitle>
                <Badge variant="info">Live</Badge>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity, index) => (
                    <motion.div
                      key={activity.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="flex items-start gap-3"
                    >
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-600 text-xs text-white">
                          {getInitials(activity.userName)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-900 dark:text-gray-100">
                          <span className="font-medium">{activity.userName}</span>{" "}
                          {activity.action}{" "}
                          <span className="font-medium text-blue-600 dark:text-blue-400">
                            {activity.target}
                          </span>
                        </p>
                        <div className="mt-0.5 flex items-center gap-1 text-xs text-gray-500">
                          <Clock className="h-3 w-3" />
                          {formatTime(activity.timestamp)}
                        </div>
                      </div>
                      <Badge
                        variant={
                          activity.type === "project"
                            ? "info"
                            : activity.type === "task"
                            ? "success"
                            : activity.type === "team"
                            ? "purple"
                            : "warning"
                        }
                        className="shrink-0"
                      >
                        {activity.type}
                      </Badge>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Recent Projects */}
          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader>
                <CardTitle>Active Projects</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {projects
                    .filter((p) => p.status === "active")
                    .slice(0, 5)
                    .map((project, index) => (
                      <motion.div
                        key={project.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="flex items-center gap-4"
                      >
                        <div
                          className={`h-10 w-10 rounded-lg ${project.color} flex items-center justify-center`}
                        >
                          <FolderKanban className="h-5 w-5 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-gray-900 dark:text-gray-100 truncate">
                            {project.name}
                          </p>
                          <div className="mt-1 flex items-center gap-2">
                            <div className="h-1.5 flex-1 rounded-full bg-gray-100 dark:bg-gray-800">
                              <div
                                className={`h-full rounded-full ${project.color}`}
                                style={{ width: `${project.progress}%` }}
                              />
                            </div>
                            <span className="text-xs text-gray-500">
                              {project.progress}%
                            </span>
                          </div>
                        </div>
                        <div className="flex -space-x-2">
                          {project.teamMembers.slice(0, 3).map((memberId) => {
                            const member = teamMembers.find(
                              (m) => m.id === memberId
                            );
                            return (
                              <Avatar
                                key={memberId}
                                className="h-7 w-7 border-2 border-white dark:border-gray-900"
                              >
                                <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-500 text-xs text-white">
                                  {member ? getInitials(member.name) : "?"}
                                </AvatarFallback>
                              </Avatar>
                            );
                          })}
                        </div>
                      </motion.div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
