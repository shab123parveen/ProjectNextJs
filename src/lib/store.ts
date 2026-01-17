"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  Project,
  Task,
  TeamMember,
  ClientRequest,
  Activity,
  User,
  mockProjects,
  mockTasks,
  mockTeamMembers,
  mockClientRequests,
  mockActivities,
} from "@/lib/mock-data";
import { generateId } from "@/lib/utils";

interface AppState {
  // Auth
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;

  // Theme
  theme: "light" | "dark";
  toggleTheme: () => void;

  // Projects
  projects: Project[];
  addProject: (project: Omit<Project, "id" | "createdAt">) => void;
  updateProject: (id: string, updates: Partial<Project>) => void;
  deleteProject: (id: string) => void;

  // Tasks
  tasks: Task[];
  addTask: (task: Omit<Task, "id" | "createdAt">) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;

  // Team
  teamMembers: TeamMember[];
  addTeamMember: (member: Omit<TeamMember, "id" | "joinedAt">) => void;
  updateTeamMember: (id: string, updates: Partial<TeamMember>) => void;
  removeTeamMember: (id: string) => void;

  // Client Requests
  clientRequests: ClientRequest[];
  updateRequestStatus: (id: string, status: ClientRequest["status"]) => void;

  // Activities
  activities: Activity[];
  addActivity: (activity: Omit<Activity, "id" | "timestamp">) => void;

  // Settings
  notifications: boolean;
  toggleNotifications: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Auth
      user: null,
      isAuthenticated: false,
      login: async (email: string, _password: string) => {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 800));
        const user: User = {
          id: "user-1",
          name: email.split("@")[0].replace(/\./g, " ").replace(/^\w/, (c) => c.toUpperCase()),
          email,
          role: "Admin",
          status: "online",
        };
        set({ user, isAuthenticated: true });
        return true;
      },
      logout: () => {
        set({ user: null, isAuthenticated: false });
      },

      // Theme
      theme: "light",
      toggleTheme: () => {
        const newTheme = get().theme === "light" ? "dark" : "light";
        set({ theme: newTheme });
        if (typeof document !== "undefined") {
          document.documentElement.classList.toggle("dark", newTheme === "dark");
        }
      },

      // Projects
      projects: mockProjects,
      addProject: (project) => {
        const newProject: Project = {
          ...project,
          id: `proj-${generateId()}`,
          createdAt: new Date().toISOString().split("T")[0],
        };
        set((state) => ({ projects: [...state.projects, newProject] }));
        get().addActivity({
          userId: get().user?.id || "user-1",
          userName: get().user?.name || "User",
          action: "created project",
          target: project.name,
          type: "project",
        });
      },
      updateProject: (id, updates) => {
        set((state) => ({
          projects: state.projects.map((p) =>
            p.id === id ? { ...p, ...updates } : p
          ),
        }));
      },
      deleteProject: (id) => {
        const project = get().projects.find((p) => p.id === id);
        set((state) => ({
          projects: state.projects.filter((p) => p.id !== id),
          tasks: state.tasks.filter((t) => t.projectId !== id),
        }));
        if (project) {
          get().addActivity({
            userId: get().user?.id || "user-1",
            userName: get().user?.name || "User",
            action: "deleted project",
            target: project.name,
            type: "project",
          });
        }
      },

      // Tasks
      tasks: mockTasks,
      addTask: (task) => {
        const newTask: Task = {
          ...task,
          id: `task-${generateId()}`,
          createdAt: new Date().toISOString().split("T")[0],
        };
        set((state) => ({ tasks: [...state.tasks, newTask] }));
        get().addActivity({
          userId: get().user?.id || "user-1",
          userName: get().user?.name || "User",
          action: "created task",
          target: task.title,
          type: "task",
        });
      },
      updateTask: (id, updates) => {
        const task = get().tasks.find((t) => t.id === id);
        set((state) => ({
          tasks: state.tasks.map((t) => (t.id === id ? { ...t, ...updates } : t)),
        }));
        if (task && updates.status) {
          get().addActivity({
            userId: get().user?.id || "user-1",
            userName: get().user?.name || "User",
            action: updates.status === "done" ? "completed" : "updated",
            target: task.title,
            type: "task",
          });
        }
      },
      deleteTask: (id) => {
        set((state) => ({ tasks: state.tasks.filter((t) => t.id !== id) }));
      },

      // Team
      teamMembers: mockTeamMembers,
      addTeamMember: (member) => {
        const newMember: TeamMember = {
          ...member,
          id: `tm-${generateId()}`,
          joinedAt: new Date().toISOString().split("T")[0],
        };
        set((state) => ({ teamMembers: [...state.teamMembers, newMember] }));
        get().addActivity({
          userId: get().user?.id || "user-1",
          userName: get().user?.name || "User",
          action: "added team member",
          target: member.name,
          type: "team",
        });
      },
      updateTeamMember: (id, updates) => {
        set((state) => ({
          teamMembers: state.teamMembers.map((m) =>
            m.id === id ? { ...m, ...updates } : m
          ),
        }));
      },
      removeTeamMember: (id) => {
        const member = get().teamMembers.find((m) => m.id === id);
        set((state) => ({
          teamMembers: state.teamMembers.filter((m) => m.id !== id),
        }));
        if (member) {
          get().addActivity({
            userId: get().user?.id || "user-1",
            userName: get().user?.name || "User",
            action: "removed team member",
            target: member.name,
            type: "team",
          });
        }
      },

      // Client Requests
      clientRequests: mockClientRequests,
      updateRequestStatus: (id, status) => {
        const request = get().clientRequests.find((r) => r.id === id);
        set((state) => ({
          clientRequests: state.clientRequests.map((r) =>
            r.id === id ? { ...r, status } : r
          ),
        }));
        if (request) {
          get().addActivity({
            userId: get().user?.id || "user-1",
            userName: get().user?.name || "User",
            action: `${status} request from`,
            target: request.clientName,
            type: "request",
          });
        }
      },

      // Activities
      activities: mockActivities,
      addActivity: (activity) => {
        const newActivity: Activity = {
          ...activity,
          id: `act-${generateId()}`,
          timestamp: new Date().toISOString(),
        };
        set((state) => ({
          activities: [newActivity, ...state.activities].slice(0, 50),
        }));
      },

      // Settings
      notifications: true,
      toggleNotifications: () => {
        set((state) => ({ notifications: !state.notifications }));
      },
    }),
    {
      name: "smart-dashboard-storage",
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        theme: state.theme,
        projects: state.projects,
        tasks: state.tasks,
        teamMembers: state.teamMembers,
        clientRequests: state.clientRequests,
        activities: state.activities,
        notifications: state.notifications,
      }),
    }
  )
);
