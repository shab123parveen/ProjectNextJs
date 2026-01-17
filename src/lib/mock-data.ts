export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
  status: "online" | "offline" | "away";
}

export interface Project {
  id: string;
  name: string;
  description: string;
  status: "active" | "completed" | "on-hold";
  progress: number;
  dueDate: string;
  teamMembers: string[];
  createdAt: string;
  color: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  projectId: string;
  assigneeId: string;
  status: "todo" | "in-progress" | "done";
  priority: "low" | "medium" | "high";
  dueDate: string;
  createdAt: string;
}

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  avatar?: string;
  status: "online" | "offline" | "away";
  joinedAt: string;
}

export interface ClientRequest {
  id: string;
  clientName: string;
  clientEmail: string;
  subject: string;
  message: string;
  status: "pending" | "approved" | "rejected";
  priority: "low" | "medium" | "high";
  createdAt: string;
}

export interface Activity {
  id: string;
  userId: string;
  userName: string;
  action: string;
  target: string;
  timestamp: string;
  type: "project" | "task" | "team" | "request";
}

// Mock Data
export const mockUsers: User[] = [
  {
    id: "user-1",
    name: "Alex Johnson",
    email: "alex@company.com",
    role: "Admin",
    status: "online",
  },
];

export const mockProjects: Project[] = [
  {
    id: "proj-1",
    name: "E-Commerce Platform Redesign",
    description: "Complete overhaul of the existing e-commerce platform with modern UI/UX",
    status: "active",
    progress: 75,
    dueDate: "2026-02-15",
    teamMembers: ["tm-1", "tm-2", "tm-3"],
    createdAt: "2025-12-01",
    color: "bg-blue-500",
  },
  {
    id: "proj-2",
    name: "Mobile App Development",
    description: "Native iOS and Android app for customer engagement",
    status: "active",
    progress: 45,
    dueDate: "2026-03-30",
    teamMembers: ["tm-2", "tm-4"],
    createdAt: "2025-11-15",
    color: "bg-purple-500",
  },
  {
    id: "proj-3",
    name: "Analytics Dashboard",
    description: "Real-time analytics and reporting dashboard for stakeholders",
    status: "active",
    progress: 90,
    dueDate: "2026-01-25",
    teamMembers: ["tm-1", "tm-5"],
    createdAt: "2025-10-20",
    color: "bg-green-500",
  },
  {
    id: "proj-4",
    name: "API Integration Suite",
    description: "Third-party API integrations for payment and shipping",
    status: "completed",
    progress: 100,
    dueDate: "2025-12-31",
    teamMembers: ["tm-3", "tm-4", "tm-5"],
    createdAt: "2025-09-01",
    color: "bg-orange-500",
  },
  {
    id: "proj-5",
    name: "Security Audit & Compliance",
    description: "Comprehensive security review and GDPR compliance implementation",
    status: "on-hold",
    progress: 30,
    dueDate: "2026-04-15",
    teamMembers: ["tm-1", "tm-2"],
    createdAt: "2025-11-01",
    color: "bg-red-500",
  },
];

export const mockTasks: Task[] = [
  {
    id: "task-1",
    title: "Design new product pages",
    description: "Create wireframes and high-fidelity mockups for product detail pages",
    projectId: "proj-1",
    assigneeId: "tm-1",
    status: "done",
    priority: "high",
    dueDate: "2026-01-20",
    createdAt: "2025-12-15",
  },
  {
    id: "task-2",
    title: "Implement checkout flow",
    description: "Build the new streamlined checkout process with guest checkout option",
    projectId: "proj-1",
    assigneeId: "tm-2",
    status: "in-progress",
    priority: "high",
    dueDate: "2026-01-28",
    createdAt: "2025-12-20",
  },
  {
    id: "task-3",
    title: "Setup CI/CD pipeline",
    description: "Configure GitHub Actions for automated testing and deployment",
    projectId: "proj-2",
    assigneeId: "tm-3",
    status: "todo",
    priority: "medium",
    dueDate: "2026-02-05",
    createdAt: "2026-01-05",
  },
  {
    id: "task-4",
    title: "User authentication module",
    description: "Implement OAuth2.0 and biometric authentication for mobile app",
    projectId: "proj-2",
    assigneeId: "tm-4",
    status: "in-progress",
    priority: "high",
    dueDate: "2026-02-10",
    createdAt: "2025-12-28",
  },
  {
    id: "task-5",
    title: "Dashboard widgets",
    description: "Create reusable chart components and KPI widgets",
    projectId: "proj-3",
    assigneeId: "tm-5",
    status: "done",
    priority: "medium",
    dueDate: "2026-01-15",
    createdAt: "2025-12-10",
  },
  {
    id: "task-6",
    title: "Real-time data sync",
    description: "Implement WebSocket connection for live data updates",
    projectId: "proj-3",
    assigneeId: "tm-1",
    status: "in-progress",
    priority: "high",
    dueDate: "2026-01-22",
    createdAt: "2025-12-18",
  },
  {
    id: "task-7",
    title: "Payment gateway integration",
    description: "Integrate Stripe and PayPal payment processors",
    projectId: "proj-4",
    assigneeId: "tm-3",
    status: "done",
    priority: "high",
    dueDate: "2025-12-20",
    createdAt: "2025-11-15",
  },
  {
    id: "task-8",
    title: "Shipping API setup",
    description: "Connect with FedEx and UPS APIs for rate calculation",
    projectId: "proj-4",
    assigneeId: "tm-4",
    status: "done",
    priority: "medium",
    dueDate: "2025-12-28",
    createdAt: "2025-11-20",
  },
  {
    id: "task-9",
    title: "Security vulnerability scan",
    description: "Run automated security scans and document findings",
    projectId: "proj-5",
    assigneeId: "tm-2",
    status: "todo",
    priority: "high",
    dueDate: "2026-02-15",
    createdAt: "2026-01-10",
  },
  {
    id: "task-10",
    title: "GDPR documentation",
    description: "Prepare privacy policy and data processing agreements",
    projectId: "proj-5",
    assigneeId: "tm-1",
    status: "todo",
    priority: "medium",
    dueDate: "2026-02-28",
    createdAt: "2026-01-08",
  },
];

export const mockTeamMembers: TeamMember[] = [
  {
    id: "tm-1",
    name: "Sarah Chen",
    email: "sarah.chen@company.com",
    role: "Lead Designer",
    department: "Design",
    status: "online",
    joinedAt: "2024-03-15",
  },
  {
    id: "tm-2",
    name: "Marcus Williams",
    email: "marcus.w@company.com",
    role: "Senior Developer",
    department: "Engineering",
    status: "online",
    joinedAt: "2023-08-22",
  },
  {
    id: "tm-3",
    name: "Elena Rodriguez",
    email: "elena.r@company.com",
    role: "DevOps Engineer",
    department: "Engineering",
    status: "away",
    joinedAt: "2024-01-10",
  },
  {
    id: "tm-4",
    name: "James Park",
    email: "james.park@company.com",
    role: "Mobile Developer",
    department: "Engineering",
    status: "online",
    joinedAt: "2024-06-05",
  },
  {
    id: "tm-5",
    name: "Olivia Thompson",
    email: "olivia.t@company.com",
    role: "Data Analyst",
    department: "Analytics",
    status: "offline",
    joinedAt: "2024-09-18",
  },
  {
    id: "tm-6",
    name: "David Kim",
    email: "david.kim@company.com",
    role: "Project Manager",
    department: "Operations",
    status: "online",
    joinedAt: "2023-05-12",
  },
];

export const mockClientRequests: ClientRequest[] = [
  {
    id: "req-1",
    clientName: "TechCorp Industries",
    clientEmail: "contact@techcorp.com",
    subject: "Custom Dashboard Features",
    message: "We need additional reporting features including export to PDF and scheduled email reports. Can you provide a quote for this enhancement?",
    status: "pending",
    priority: "high",
    createdAt: "2026-01-14",
  },
  {
    id: "req-2",
    clientName: "Global Retail Solutions",
    clientEmail: "info@globalretail.com",
    subject: "API Rate Limit Increase",
    message: "Our traffic has increased significantly. We need to discuss upgrading our API limits from 10k to 50k requests per hour.",
    status: "pending",
    priority: "medium",
    createdAt: "2026-01-13",
  },
  {
    id: "req-3",
    clientName: "StartupXYZ",
    clientEmail: "founders@startupxyz.io",
    subject: "New Integration Request",
    message: "We would like to integrate with Salesforce CRM. Is this something your team can support?",
    status: "approved",
    priority: "low",
    createdAt: "2026-01-10",
  },
  {
    id: "req-4",
    clientName: "Healthcare Plus",
    clientEmail: "it@healthcareplus.org",
    subject: "HIPAA Compliance Requirements",
    message: "We need documentation confirming your platform meets HIPAA compliance standards for our healthcare data.",
    status: "pending",
    priority: "high",
    createdAt: "2026-01-12",
  },
  {
    id: "req-5",
    clientName: "EduTech Learning",
    clientEmail: "admin@edutech.edu",
    subject: "Bulk User Import",
    message: "We have 5,000 users to onboard. Do you have a bulk import feature or API endpoint for this?",
    status: "rejected",
    priority: "medium",
    createdAt: "2026-01-08",
  },
];

export const mockActivities: Activity[] = [
  {
    id: "act-1",
    userId: "tm-1",
    userName: "Sarah Chen",
    action: "completed",
    target: "Design new product pages",
    timestamp: "2026-01-16T14:30:00",
    type: "task",
  },
  {
    id: "act-2",
    userId: "tm-2",
    userName: "Marcus Williams",
    action: "started working on",
    target: "Implement checkout flow",
    timestamp: "2026-01-16T13:45:00",
    type: "task",
  },
  {
    id: "act-3",
    userId: "tm-6",
    userName: "David Kim",
    action: "created",
    target: "Security Audit & Compliance",
    timestamp: "2026-01-16T11:20:00",
    type: "project",
  },
  {
    id: "act-4",
    userId: "tm-3",
    userName: "Elena Rodriguez",
    action: "approved request from",
    target: "StartupXYZ",
    timestamp: "2026-01-16T10:15:00",
    type: "request",
  },
  {
    id: "act-5",
    userId: "tm-4",
    userName: "James Park",
    action: "joined project",
    target: "Mobile App Development",
    timestamp: "2026-01-15T16:30:00",
    type: "team",
  },
  {
    id: "act-6",
    userId: "tm-5",
    userName: "Olivia Thompson",
    action: "completed",
    target: "Dashboard widgets",
    timestamp: "2026-01-15T15:00:00",
    type: "task",
  },
  {
    id: "act-7",
    userId: "tm-1",
    userName: "Sarah Chen",
    action: "updated status of",
    target: "E-Commerce Platform Redesign",
    timestamp: "2026-01-15T12:45:00",
    type: "project",
  },
  {
    id: "act-8",
    userId: "tm-2",
    userName: "Marcus Williams",
    action: "commented on",
    target: "Real-time data sync",
    timestamp: "2026-01-15T11:30:00",
    type: "task",
  },
];

// Weekly progress data for charts
export const weeklyProgressData = [
  { name: "Mon", tasks: 12, completed: 8 },
  { name: "Tue", tasks: 15, completed: 12 },
  { name: "Wed", tasks: 18, completed: 14 },
  { name: "Thu", tasks: 14, completed: 11 },
  { name: "Fri", tasks: 20, completed: 16 },
  { name: "Sat", tasks: 8, completed: 7 },
  { name: "Sun", tasks: 5, completed: 4 },
];

// Task distribution data for pie chart
export const taskDistributionData = [
  { name: "Completed", value: 45, color: "#10b981" },
  { name: "In Progress", value: 30, color: "#3b82f6" },
  { name: "To Do", value: 25, color: "#6b7280" },
];

// Monthly performance data
export const monthlyPerformanceData = [
  { month: "Aug", projects: 3, tasks: 45, completion: 82 },
  { month: "Sep", projects: 4, tasks: 58, completion: 78 },
  { month: "Oct", projects: 5, tasks: 72, completion: 85 },
  { month: "Nov", projects: 4, tasks: 65, completion: 88 },
  { month: "Dec", projects: 6, tasks: 82, completion: 91 },
  { month: "Jan", projects: 5, tasks: 70, completion: 87 },
];
