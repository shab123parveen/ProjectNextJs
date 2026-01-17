"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  AreaChart,
  Area,
} from "recharts";
import {
  FileText,
  Download,
  TrendingUp,
  TrendingDown,
  Calendar,
  BarChart3,
  PieChart as PieChartIcon,
  Activity,
} from "lucide-react";
import { Header } from "@/components/layout/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAppStore } from "@/lib/store";
import { useToast } from "@/components/ui/use-toast";
import {
  weeklyProgressData,
  taskDistributionData,
  monthlyPerformanceData,
} from "@/lib/mock-data";

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

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"];

const projectCompletionData = [
  { name: "Website Redesign", completion: 85, target: 100, budget: 45000 },
  { name: "Mobile App", completion: 62, target: 100, budget: 78000 },
  { name: "API Platform", completion: 45, target: 100, budget: 32000 },
  { name: "Analytics Dashboard", completion: 78, target: 100, budget: 28000 },
  { name: "Security Audit", completion: 92, target: 100, budget: 15000 },
];

const teamProductivityData = [
  { month: "Jan", productivity: 78, tasks: 45, hours: 160 },
  { month: "Feb", productivity: 82, tasks: 52, hours: 168 },
  { month: "Mar", productivity: 85, tasks: 48, hours: 176 },
  { month: "Apr", productivity: 79, tasks: 55, hours: 160 },
  { month: "May", productivity: 88, tasks: 62, hours: 184 },
  { month: "Jun", productivity: 92, tasks: 68, hours: 176 },
];

const departmentData = [
  { name: "Engineering", value: 45 },
  { name: "Design", value: 20 },
  { name: "Marketing", value: 15 },
  { name: "Sales", value: 12 },
  { name: "Support", value: 8 },
];

export default function ReportsPage() {
  const { projects, tasks, teamMembers } = useAppStore();
  const { toast } = useToast();
  const [dateRange, setDateRange] = useState("30d");
  const [activeTab, setActiveTab] = useState("overview");

  const handleDownloadReport = (reportType: string) => {
    toast({
      title: "Report Generated",
      description: `${reportType} report is being prepared for download.`,
    });

    // Simulate download delay
    setTimeout(() => {
      toast({
        title: "Download Ready",
        description: "Your report has been downloaded successfully.",
        variant: "success",
      });
    }, 2000);
  };

  const completedTasks = tasks.filter((t) => t.status === "done").length;
  const inProgressTasks = tasks.filter((t) => t.status === "in-progress").length;
  const todoTasks = tasks.filter((t) => t.status === "todo").length;
  const totalTasks = tasks.length;

  const stats = [
    {
      label: "Total Projects",
      value: projects.length,
      change: "+12%",
      trend: "up",
      icon: FileText,
      color: "from-blue-500 to-indigo-500",
    },
    {
      label: "Task Completion",
      value: `${Math.round((completedTasks / totalTasks) * 100)}%`,
      change: "+8%",
      trend: "up",
      icon: Activity,
      color: "from-green-500 to-emerald-500",
    },
    {
      label: "Team Efficiency",
      value: "92%",
      change: "+5%",
      trend: "up",
      icon: TrendingUp,
      color: "from-purple-500 to-violet-500",
    },
    {
      label: "Active Hours",
      value: "1,248",
      change: "-3%",
      trend: "down",
      icon: Calendar,
      color: "from-orange-500 to-amber-500",
    },
  ];

  return (
    <div className="min-h-screen">
      <Header
        title="Reports & Analytics"
        description="Comprehensive insights into your business operations."
      />

      <div className="p-6">
        {/* Toolbar */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="w-[180px]">
                <Calendar className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Select range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
                <SelectItem value="1y">Last year</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => handleDownloadReport("Summary")}
            >
              <Download className="mr-2 h-4 w-4" />
              Export PDF
            </Button>
            <Button onClick={() => handleDownloadReport("Full")}>
              <Download className="mr-2 h-4 w-4" />
              Download Full Report
            </Button>
          </div>
        </div>

        {/* Stats */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {stats.map((stat) => (
            <motion.div key={stat.label} variants={itemVariants}>
              <Card>
                <CardContent className="flex items-center gap-4 p-4">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${stat.color}`}
                  >
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {stat.value}
                    </p>
                    <div className="flex items-center gap-2">
                      <p className="text-sm text-gray-500">{stat.label}</p>
                      <Badge
                        variant={stat.trend === "up" ? "success" : "error"}
                        className="text-xs"
                      >
                        {stat.trend === "up" ? (
                          <TrendingUp className="mr-1 h-3 w-3" />
                        ) : (
                          <TrendingDown className="mr-1 h-3 w-3" />
                        )}
                        {stat.change}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview" className="gap-2">
              <BarChart3 className="h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="projects" className="gap-2">
              <FileText className="h-4 w-4" />
              Projects
            </TabsTrigger>
            <TabsTrigger value="team" className="gap-2">
              <Activity className="h-4 w-4" />
              Team
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              {/* Weekly Progress */}
              <motion.div variants={itemVariants}>
                <Card>
                  <CardHeader>
                    <CardTitle>Weekly Progress</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <AreaChart data={weeklyProgressData}>
                        <defs>
                          <linearGradient
                            id="colorTasks"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                          >
                            <stop
                              offset="5%"
                              stopColor="#3b82f6"
                              stopOpacity={0.3}
                            />
                            <stop
                              offset="95%"
                              stopColor="#3b82f6"
                              stopOpacity={0}
                            />
                          </linearGradient>
                          <linearGradient
                            id="colorCompleted"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                          >
                            <stop
                              offset="5%"
                              stopColor="#10b981"
                              stopOpacity={0.3}
                            />
                            <stop
                              offset="95%"
                              stopColor="#10b981"
                              stopOpacity={0}
                            />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                        <XAxis dataKey="name" stroke="#888" fontSize={12} />
                        <YAxis stroke="#888" fontSize={12} />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "rgba(0,0,0,0.8)",
                            border: "none",
                            borderRadius: "8px",
                            color: "#fff",
                          }}
                        />
                        <Area
                          type="monotone"
                          dataKey="tasks"
                          stroke="#3b82f6"
                          fill="url(#colorTasks)"
                          strokeWidth={2}
                        />
                        <Area
                          type="monotone"
                          dataKey="completed"
                          stroke="#10b981"
                          fill="url(#colorCompleted)"
                          strokeWidth={2}
                        />
                        <Legend />
                      </AreaChart>
                    </ResponsiveContainer>
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
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={taskDistributionData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={100}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {taskDistributionData.map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={COLORS[index % COLORS.length]}
                            />
                          ))}
                        </Pie>
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "rgba(0,0,0,0.8)",
                            border: "none",
                            borderRadius: "8px",
                            color: "#fff",
                          }}
                        />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Monthly Performance */}
            <motion.div variants={itemVariants}>
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={monthlyPerformanceData}>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                      <XAxis dataKey="month" stroke="#888" fontSize={12} />
                      <YAxis stroke="#888" fontSize={12} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "rgba(0,0,0,0.8)",
                          border: "none",
                          borderRadius: "8px",
                          color: "#fff",
                        }}
                      />
                      <Legend />
                      <Bar
                        dataKey="projects"
                        fill="#3b82f6"
                        radius={[4, 4, 0, 0]}
                      />
                      <Bar
                        dataKey="tasks"
                        fill="#10b981"
                        radius={[4, 4, 0, 0]}
                      />
                      <Bar
                        dataKey="revenue"
                        fill="#f59e0b"
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Projects Tab */}
          <TabsContent value="projects" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Project Completion Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {projectCompletionData.map((project) => (
                    <div key={project.name}>
                      <div className="mb-2 flex items-center justify-between">
                        <span className="font-medium text-gray-900 dark:text-white">
                          {project.name}
                        </span>
                        <div className="flex items-center gap-4">
                          <span className="text-sm text-gray-500">
                            Budget: ${project.budget.toLocaleString()}
                          </span>
                          <Badge
                            variant={
                              project.completion >= 75
                                ? "success"
                                : project.completion >= 50
                                ? "warning"
                                : "default"
                            }
                          >
                            {project.completion}%
                          </Badge>
                        </div>
                      </div>
                      <div className="relative h-3 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${project.completion}%` }}
                          transition={{ duration: 1, ease: "easeOut" }}
                          className={`h-full rounded-full ${
                            project.completion >= 75
                              ? "bg-gradient-to-r from-green-500 to-emerald-500"
                              : project.completion >= 50
                              ? "bg-gradient-to-r from-yellow-500 to-orange-500"
                              : "bg-gradient-to-r from-blue-500 to-indigo-500"
                          }`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Project Budget Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={projectCompletionData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                    <XAxis type="number" stroke="#888" fontSize={12} />
                    <YAxis dataKey="name" type="category" stroke="#888" fontSize={12} width={120} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "rgba(0,0,0,0.8)",
                        border: "none",
                        borderRadius: "8px",
                        color: "#fff",
                      }}
                      formatter={(value) => [`$${(value as number).toLocaleString()}`, "Budget"]}
                    />
                    <Bar dataKey="budget" fill="#8b5cf6" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Team Tab */}
          <TabsContent value="team" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Team Productivity</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={teamProductivityData}>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                      <XAxis dataKey="month" stroke="#888" fontSize={12} />
                      <YAxis stroke="#888" fontSize={12} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "rgba(0,0,0,0.8)",
                          border: "none",
                          borderRadius: "8px",
                          color: "#fff",
                        }}
                      />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="productivity"
                        stroke="#3b82f6"
                        strokeWidth={3}
                        dot={{ fill: "#3b82f6" }}
                      />
                      <Line
                        type="monotone"
                        dataKey="tasks"
                        stroke="#10b981"
                        strokeWidth={3}
                        dot={{ fill: "#10b981" }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Department Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={departmentData}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        dataKey="value"
                        label={({ name, percent }) =>
                          `${name} ${((percent ?? 0) * 100).toFixed(0)}%`
                        }
                      >
                        {departmentData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "rgba(0,0,0,0.8)",
                          border: "none",
                          borderRadius: "8px",
                          color: "#fff",
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Team Performance Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  <div className="rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 p-4 dark:from-blue-900/20 dark:to-blue-800/20">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Avg. Tasks/Day
                    </p>
                    <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                      12.5
                    </p>
                  </div>
                  <div className="rounded-xl bg-gradient-to-br from-green-50 to-green-100 p-4 dark:from-green-900/20 dark:to-green-800/20">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      On-Time Delivery
                    </p>
                    <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                      94%
                    </p>
                  </div>
                  <div className="rounded-xl bg-gradient-to-br from-purple-50 to-purple-100 p-4 dark:from-purple-900/20 dark:to-purple-800/20">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Code Quality
                    </p>
                    <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                      A+
                    </p>
                  </div>
                  <div className="rounded-xl bg-gradient-to-br from-orange-50 to-orange-100 p-4 dark:from-orange-900/20 dark:to-orange-800/20">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Response Time
                    </p>
                    <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                      2.4h
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
