"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  FolderKanban,
  Users,
  Zap,
  Shield,
  LineChart,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
  {
    icon: FolderKanban,
    title: "Project Management",
    description: "Organize and track projects with intuitive boards and timelines.",
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description: "Work seamlessly with your team in real-time with live updates.",
  },
  {
    icon: BarChart3,
    title: "Analytics & Reports",
    description: "Get actionable insights with beautiful charts and reports.",
  },
  {
    icon: Zap,
    title: "Task Automation",
    description: "Automate repetitive tasks and boost your team's productivity.",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "Bank-grade security to keep your data safe and compliant.",
  },
  {
    icon: LineChart,
    title: "Performance Tracking",
    description: "Monitor KPIs and track progress towards your goals.",
  },
];

const stats = [
  { value: "99.9%", label: "Uptime" },
  { value: "500+", label: "Companies" },
  { value: "50K+", label: "Users" },
  { value: "4.9/5", label: "Rating" },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Navigation */}
      <nav className="fixed top-0 z-50 w-full border-b border-gray-100 bg-white/80 backdrop-blur-lg dark:border-gray-800 dark:bg-gray-950/80">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 shadow-lg shadow-blue-500/30">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              OpsDash
            </span>
          </div>
          <div className="hidden items-center gap-8 md:flex">
            <Link
              href="#features"
              className="text-sm text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
            >
              Features
            </Link>
            <Link
              href="#stats"
              className="text-sm text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
            >
              About
            </Link>
            <Link href="/login">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link href="/login">
              <Button>Get Started</Button>
            </Link>
          </div>
          <Link href="/login" className="md:hidden">
            <Button size="sm">Get Started</Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-32">
        {/* Background gradient */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-gradient-to-r from-blue-400/30 to-purple-400/30 blur-3xl" />
          <div className="absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-gradient-to-r from-indigo-400/20 to-cyan-400/20 blur-3xl" />
        </div>

        <div className="mx-auto max-w-7xl px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-sm font-medium text-blue-700 dark:border-blue-900 dark:bg-blue-950 dark:text-blue-300">
              <Sparkles className="h-4 w-4" />
              Introducing OpsDash 2.0
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mx-auto max-w-4xl text-4xl font-bold tracking-tight text-gray-900 md:text-6xl lg:text-7xl dark:text-white"
          >
            Smart Operations for{" "}
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Modern Teams
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto mt-6 max-w-2xl text-lg text-gray-600 md:text-xl dark:text-gray-400"
          >
            Streamline your business operations with our all-in-one platform.
            Manage projects, collaborate with your team, and gain insights from
            powerful analytics.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
          >
            <Link href="/dashboard">
              <Button size="lg" className="group">
                Go to Dashboard
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link href="/login">
              <Button size="lg" variant="outline">
                Sign In
              </Button>
            </Link>
          </motion.div>

          {/* Dashboard Preview */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative mx-auto mt-16 max-w-5xl"
          >
            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl dark:border-gray-800 dark:bg-gray-900">
              <div className="flex h-8 items-center gap-2 border-b border-gray-100 bg-gray-50 px-4 dark:border-gray-800 dark:bg-gray-900">
                <div className="h-3 w-3 rounded-full bg-red-400" />
                <div className="h-3 w-3 rounded-full bg-yellow-400" />
                <div className="h-3 w-3 rounded-full bg-green-400" />
              </div>
              <div className="aspect-[16/9] bg-gradient-to-br from-gray-100 to-gray-50 p-6 dark:from-gray-800 dark:to-gray-900">
                <div className="grid h-full grid-cols-4 gap-4">
                  {/* Sidebar mock */}
                  <div className="col-span-1 rounded-xl bg-white p-4 shadow-sm dark:bg-gray-800">
                    <div className="mb-4 h-8 w-24 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-500" />
                    <div className="space-y-3">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <div
                          key={i}
                          className="flex items-center gap-2"
                        >
                          <div className="h-4 w-4 rounded bg-gray-200 dark:bg-gray-700" />
                          <div
                            className="h-4 rounded bg-gray-200 dark:bg-gray-700"
                            style={{ width: `${60 + (i * 7) % 30}%` }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                  {/* Main content mock */}
                  <div className="col-span-3 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="h-6 w-32 rounded-lg bg-gray-300 dark:bg-gray-700" />
                      <div className="h-6 w-20 rounded-lg bg-gray-200 dark:bg-gray-700" />
                    </div>
                    <div className="grid grid-cols-4 gap-4">
                      {[1, 2, 3, 4].map((i) => (
                        <div
                          key={i}
                          className="rounded-xl bg-white p-4 shadow-sm dark:bg-gray-800"
                        >
                          <div className="mb-2 h-8 w-8 rounded-lg bg-gradient-to-r from-blue-400 to-indigo-400" />
                          <div className="mb-1 h-6 w-16 rounded bg-gray-200 dark:bg-gray-700" />
                          <div className="h-3 w-12 rounded bg-gray-100 dark:bg-gray-600" />
                        </div>
                      ))}
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="rounded-xl bg-white p-4 shadow-sm dark:bg-gray-800">
                        <div className="mb-4 h-4 w-24 rounded bg-gray-200 dark:bg-gray-700" />
                        <div className="flex h-24 items-end gap-1">
                          {[40, 60, 80, 45, 70, 90, 55].map((h, i) => (
                            <div
                              key={i}
                              className="flex-1 rounded-t-sm bg-gradient-to-t from-blue-500 to-indigo-400"
                              style={{ height: `${h}%` }}
                            />
                          ))}
                        </div>
                      </div>
                      <div className="rounded-xl bg-white p-4 shadow-sm dark:bg-gray-800">
                        <div className="mb-4 h-4 w-24 rounded bg-gray-200 dark:bg-gray-700" />
                        <div className="space-y-2">
                          {[1, 2, 3].map((i) => (
                            <div
                              key={i}
                              className="flex items-center gap-2"
                            >
                              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-purple-400 to-pink-400" />
                              <div className="flex-1">
                                <div className="mb-1 h-3 w-24 rounded bg-gray-200 dark:bg-gray-700" />
                                <div className="h-2 w-16 rounded bg-gray-100 dark:bg-gray-600" />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Glow effect */}
            <div className="absolute -inset-4 -z-10 rounded-3xl bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 blur-2xl" />
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section id="stats" className="border-y border-gray-100 bg-gray-50 py-16 dark:border-gray-800 dark:bg-gray-900">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl font-bold text-gray-900 md:text-4xl dark:text-white">
                  {stat.value}
                </div>
                <div className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold text-gray-900 md:text-4xl dark:text-white">
              Everything you need to succeed
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-gray-600 dark:text-gray-400">
              Our comprehensive suite of tools helps you manage every aspect of
              your business operations.
            </p>
          </motion.div>

          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group rounded-2xl border border-gray-100 bg-white p-6 transition-all hover:border-blue-200 hover:shadow-lg hover:shadow-blue-500/10 dark:border-gray-800 dark:bg-gray-900 dark:hover:border-blue-800"
              >
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 text-blue-600 transition-colors group-hover:from-blue-100 group-hover:to-indigo-100 dark:from-blue-950 dark:to-indigo-950 dark:text-blue-400">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 p-8 md:p-16"
          >
            {/* Background pattern */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />

            <div className="relative z-10 text-center">
              <h2 className="text-3xl font-bold text-white md:text-4xl">
                Ready to transform your business?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-lg text-blue-100">
                Join thousands of teams already using OpsDash to streamline
                their operations.
              </p>
              <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                <Link href="/dashboard">
                  <Button
                    size="lg"
                    className="bg-white text-blue-600 hover:bg-blue-50"
                  >
                    Start Free Trial
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/login">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white/30 text-white hover:bg-white/10"
                  >
                    Schedule Demo
                  </Button>
                </Link>
              </div>
              <div className="mt-8 flex items-center justify-center gap-6 text-sm text-blue-100">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4" />
                  14-day free trial
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4" />
                  No credit card required
                </div>
                <div className="hidden items-center gap-2 sm:flex">
                  <CheckCircle2 className="h-4 w-4" />
                  Cancel anytime
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-12 dark:border-gray-800">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600">
                <Sparkles className="h-4 w-4 text-white" />
              </div>
              <span className="font-bold text-gray-900 dark:text-white">
                OpsDash
              </span>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              © 2026 OpsDash. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
