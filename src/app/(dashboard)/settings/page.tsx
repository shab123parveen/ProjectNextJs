"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  User,
  Bell,
  Moon,
  Sun,
  Lock,
  Globe,
  Mail,
  Smartphone,
  Shield,
  CreditCard,
  LogOut,
  Camera,
  Save,
} from "lucide-react";
import { Header } from "@/components/layout/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAppStore } from "@/lib/store";
import { useToast } from "@/components/ui/use-toast";
import { getInitials } from "@/lib/utils";

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

export default function SettingsPage() {
  const { user, theme, toggleTheme, logout } = useAppStore();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("profile");

  // Profile form state
  const [profileForm, setProfileForm] = useState({
    name: user?.name || "John Doe",
    email: user?.email || "john@example.com",
    phone: "+1 (555) 123-4567",
    bio: "Senior Product Manager with 10+ years of experience in tech.",
    timezone: "America/New_York",
    language: "en",
  });

  // Notification settings
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    projectUpdates: true,
    taskAssignments: true,
    teamMessages: false,
    weeklyDigest: true,
    marketing: false,
  });

  // Security settings
  const [security, setSecurity] = useState({
    twoFactor: false,
    sessionTimeout: "30",
    loginAlerts: true,
  });

  const handleSaveProfile = () => {
    toast({
      title: "Profile Updated",
      description: "Your profile settings have been saved successfully.",
      variant: "success",
    });
  };

  const handleSaveNotifications = () => {
    toast({
      title: "Notifications Updated",
      description: "Your notification preferences have been saved.",
      variant: "success",
    });
  };

  const handleSaveSecurity = () => {
    toast({
      title: "Security Settings Updated",
      description: "Your security preferences have been saved.",
      variant: "success",
    });
  };

  const handleLogout = () => {
    logout();
    window.location.href = "/login";
  };

  return (
    <div className="min-h-screen">
      <Header
        title="Settings"
        description="Manage your account settings and preferences."
      />

      <div className="p-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="space-y-6"
          >
            <TabsList className="flex-wrap">
              <TabsTrigger value="profile" className="gap-2">
                <User className="h-4 w-4" />
                Profile
              </TabsTrigger>
              <TabsTrigger value="notifications" className="gap-2">
                <Bell className="h-4 w-4" />
                Notifications
              </TabsTrigger>
              <TabsTrigger value="appearance" className="gap-2">
                <Moon className="h-4 w-4" />
                Appearance
              </TabsTrigger>
              <TabsTrigger value="security" className="gap-2">
                <Shield className="h-4 w-4" />
                Security
              </TabsTrigger>
            </TabsList>

            {/* Profile Tab */}
            <TabsContent value="profile" className="space-y-6">
              <motion.div variants={itemVariants}>
                <Card>
                  <CardHeader>
                    <CardTitle>Profile Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Avatar */}
                    <div className="flex items-center gap-6">
                      <div className="relative">
                        <Avatar className="h-24 w-24">
                          <AvatarImage src={user?.avatar} />
                          <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-2xl text-white">
                            {getInitials(profileForm.name)}
                          </AvatarFallback>
                        </Avatar>
                        <button className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white shadow-lg transition-transform hover:scale-110">
                          <Camera className="h-4 w-4" />
                        </button>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                          {profileForm.name}
                        </h3>
                        <p className="text-gray-500">{profileForm.email}</p>
                        <p className="mt-1 text-sm text-gray-400">
                          Member since January 2024
                        </p>
                      </div>
                    </div>

                    {/* Form */}
                    <div className="grid gap-6 md:grid-cols-2">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Full Name
                        </label>
                        <Input
                          value={profileForm.name}
                          onChange={(e) =>
                            setProfileForm({ ...profileForm, name: e.target.value })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Email Address
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                          <Input
                            value={profileForm.email}
                            onChange={(e) =>
                              setProfileForm({ ...profileForm, email: e.target.value })
                            }
                            className="pl-10"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Phone Number
                        </label>
                        <div className="relative">
                          <Smartphone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                          <Input
                            value={profileForm.phone}
                            onChange={(e) =>
                              setProfileForm({ ...profileForm, phone: e.target.value })
                            }
                            className="pl-10"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Language
                        </label>
                        <Select
                          value={profileForm.language}
                          onValueChange={(value) =>
                            setProfileForm({ ...profileForm, language: value })
                          }
                        >
                          <SelectTrigger>
                            <Globe className="mr-2 h-4 w-4" />
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="en">English</SelectItem>
                            <SelectItem value="es">Spanish</SelectItem>
                            <SelectItem value="fr">French</SelectItem>
                            <SelectItem value="de">German</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Bio
                        </label>
                        <Textarea
                          value={profileForm.bio}
                          onChange={(e) =>
                            setProfileForm({ ...profileForm, bio: e.target.value })
                          }
                          rows={3}
                        />
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <Button onClick={handleSaveProfile}>
                        <Save className="mr-2 h-4 w-4" />
                        Save Changes
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            {/* Notifications Tab */}
            <TabsContent value="notifications" className="space-y-6">
              <motion.div variants={itemVariants}>
                <Card>
                  <CardHeader>
                    <CardTitle>Notification Preferences</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        Notification Channels
                      </h4>
                      <div className="space-y-4 rounded-lg border border-gray-200 p-4 dark:border-gray-700">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Mail className="h-5 w-5 text-gray-400" />
                            <div>
                              <p className="font-medium text-gray-900 dark:text-white">
                                Email Notifications
                              </p>
                              <p className="text-sm text-gray-500">
                                Receive notifications via email
                              </p>
                            </div>
                          </div>
                          <Switch
                            checked={notifications.email}
                            onCheckedChange={(checked) =>
                              setNotifications({ ...notifications, email: checked })
                            }
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Bell className="h-5 w-5 text-gray-400" />
                            <div>
                              <p className="font-medium text-gray-900 dark:text-white">
                                Push Notifications
                              </p>
                              <p className="text-sm text-gray-500">
                                Receive push notifications in browser
                              </p>
                            </div>
                          </div>
                          <Switch
                            checked={notifications.push}
                            onCheckedChange={(checked) =>
                              setNotifications({ ...notifications, push: checked })
                            }
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        Notification Types
                      </h4>
                      <div className="space-y-4 rounded-lg border border-gray-200 p-4 dark:border-gray-700">
                        {[
                          {
                            key: "projectUpdates",
                            label: "Project Updates",
                            desc: "Get notified about project status changes",
                          },
                          {
                            key: "taskAssignments",
                            label: "Task Assignments",
                            desc: "Get notified when tasks are assigned to you",
                          },
                          {
                            key: "teamMessages",
                            label: "Team Messages",
                            desc: "Get notified about team chat messages",
                          },
                          {
                            key: "weeklyDigest",
                            label: "Weekly Digest",
                            desc: "Receive a weekly summary of activities",
                          },
                          {
                            key: "marketing",
                            label: "Marketing & Updates",
                            desc: "Receive news and promotional content",
                          },
                        ].map((item) => (
                          <div
                            key={item.key}
                            className="flex items-center justify-between"
                          >
                            <div>
                              <p className="font-medium text-gray-900 dark:text-white">
                                {item.label}
                              </p>
                              <p className="text-sm text-gray-500">{item.desc}</p>
                            </div>
                            <Switch
                              checked={
                                notifications[
                                  item.key as keyof typeof notifications
                                ] as boolean
                              }
                              onCheckedChange={(checked) =>
                                setNotifications({
                                  ...notifications,
                                  [item.key]: checked,
                                })
                              }
                            />
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <Button onClick={handleSaveNotifications}>
                        <Save className="mr-2 h-4 w-4" />
                        Save Preferences
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            {/* Appearance Tab */}
            <TabsContent value="appearance" className="space-y-6">
              <motion.div variants={itemVariants}>
                <Card>
                  <CardHeader>
                    <CardTitle>Appearance Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        Theme
                      </h4>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <button
                          onClick={() => theme === "dark" && toggleTheme()}
                          className={`flex items-center gap-4 rounded-xl border-2 p-4 transition-all ${
                            theme === "light"
                              ? "border-primary bg-primary/5"
                              : "border-gray-200 hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-600"
                          }`}
                        >
                          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white shadow-md">
                            <Sun className="h-6 w-6 text-yellow-500" />
                          </div>
                          <div className="text-left">
                            <p className="font-medium text-gray-900 dark:text-white">
                              Light Mode
                            </p>
                            <p className="text-sm text-gray-500">
                              Classic light theme
                            </p>
                          </div>
                        </button>

                        <button
                          onClick={() => theme === "light" && toggleTheme()}
                          className={`flex items-center gap-4 rounded-xl border-2 p-4 transition-all ${
                            theme === "dark"
                              ? "border-primary bg-primary/5"
                              : "border-gray-200 hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-600"
                          }`}
                        >
                          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-900 shadow-md">
                            <Moon className="h-6 w-6 text-blue-400" />
                          </div>
                          <div className="text-left">
                            <p className="font-medium text-gray-900 dark:text-white">
                              Dark Mode
                            </p>
                            <p className="text-sm text-gray-500">
                              Easy on the eyes
                            </p>
                          </div>
                        </button>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        Interface
                      </h4>
                      <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white">
                              Compact Mode
                            </p>
                            <p className="text-sm text-gray-500">
                              Reduce spacing and padding
                            </p>
                          </div>
                          <Switch />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            {/* Security Tab */}
            <TabsContent value="security" className="space-y-6">
              <motion.div variants={itemVariants}>
                <Card>
                  <CardHeader>
                    <CardTitle>Security Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        Password
                      </h4>
                      <div className="flex items-center justify-between rounded-lg border border-gray-200 p-4 dark:border-gray-700">
                        <div className="flex items-center gap-3">
                          <Lock className="h-5 w-5 text-gray-400" />
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white">
                              Change Password
                            </p>
                            <p className="text-sm text-gray-500">
                              Last changed 30 days ago
                            </p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          Update
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        Two-Factor Authentication
                      </h4>
                      <div className="flex items-center justify-between rounded-lg border border-gray-200 p-4 dark:border-gray-700">
                        <div className="flex items-center gap-3">
                          <Shield className="h-5 w-5 text-gray-400" />
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white">
                              Enable 2FA
                            </p>
                            <p className="text-sm text-gray-500">
                              Add an extra layer of security
                            </p>
                          </div>
                        </div>
                        <Switch
                          checked={security.twoFactor}
                          onCheckedChange={(checked) =>
                            setSecurity({ ...security, twoFactor: checked })
                          }
                        />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        Session Management
                      </h4>
                      <div className="space-y-4 rounded-lg border border-gray-200 p-4 dark:border-gray-700">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white">
                              Session Timeout
                            </p>
                            <p className="text-sm text-gray-500">
                              Auto logout after inactivity
                            </p>
                          </div>
                          <Select
                            value={security.sessionTimeout}
                            onValueChange={(value) =>
                              setSecurity({ ...security, sessionTimeout: value })
                            }
                          >
                            <SelectTrigger className="w-[150px]">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="15">15 minutes</SelectItem>
                              <SelectItem value="30">30 minutes</SelectItem>
                              <SelectItem value="60">1 hour</SelectItem>
                              <SelectItem value="never">Never</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white">
                              Login Alerts
                            </p>
                            <p className="text-sm text-gray-500">
                              Get notified of new sign-ins
                            </p>
                          </div>
                          <Switch
                            checked={security.loginAlerts}
                            onCheckedChange={(checked) =>
                              setSecurity({ ...security, loginAlerts: checked })
                            }
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end gap-4">
                      <Button variant="outline" onClick={handleSaveSecurity}>
                        <Save className="mr-2 h-4 w-4" />
                        Save Security Settings
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Card className="border-red-200 dark:border-red-900/50">
                  <CardHeader>
                    <CardTitle className="text-red-600">Danger Zone</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-900/50 dark:bg-red-900/10">
                      <div className="flex items-center gap-3">
                        <LogOut className="h-5 w-5 text-red-500" />
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">
                            Sign Out
                          </p>
                          <p className="text-sm text-gray-500">
                            Sign out of your account
                          </p>
                        </div>
                      </div>
                      <Button variant="destructive" size="sm" onClick={handleLogout}>
                        Sign Out
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
}
