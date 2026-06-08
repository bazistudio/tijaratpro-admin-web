"use client"

import * as React from "react"
import { 
  Users, 
  UserCheck, 
  Clock, 
  Wallet, 
  Search,
  Filter,
  Download,
  Plus,
  MoreVertical,
  Phone,
  Shield,
  Activity,
  Calendar,
  ChevronRight,
  FileText,
  History,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Lock,
  Eye,
  Settings2
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SectionCard } from "@/components/ui/section-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar
} from "recharts"
import { cn } from "@/lib/utils"

// ─── Mock Data ───────────────────────────────────────────────────────────────

const STAFF_STATS = [
  { title: "Total Staff", value: "12", trend: { value: 0, label: "Full capacity" }, icon: Users, color: "primary" },
  { title: "Active Now", value: "9", trend: { value: 4, label: "On floor" }, icon: UserCheck, color: "success" },
  { title: "Today's Attendance", value: "92%", trend: { value: 2, label: "Shift A" }, icon: Clock, color: "info" },
  { title: "Monthly Salary", value: "Rs 450k", trend: { value: 0, label: "Fixed cost" }, icon: Wallet, color: "warning" },
]

const STAFF_MEMBERS = [
  { 
    id: "EMP-001", 
    name: "Muhammad Ali", 
    role: "Store Manager", 
    phone: "0300-1234567", 
    salary: "Rs 85,000", 
    permissions: "All Access", 
    status: "Active" 
  },
  { 
    id: "EMP-002", 
    name: "Zeeshan Ahmed", 
    role: "Sales Executive", 
    phone: "0321-7654321", 
    salary: "Rs 45,000", 
    permissions: "POS, Stock", 
    status: "Active" 
  },
  { 
    id: "EMP-003", 
    name: "Bilal Hussain", 
    role: "Inventory Tech", 
    phone: "0345-9876543", 
    salary: "Rs 40,000", 
    permissions: "Stock Only", 
    status: "On Leave" 
  },
  { 
    id: "EMP-004", 
    name: "Usman Raza", 
    role: "Repair Specialist", 
    phone: "0312-5556667", 
    salary: "Rs 65,000", 
    permissions: "Reports, POS", 
    status: "Active" 
  },
  { 
    id: "EMP-005", 
    name: "Farhan Khan", 
    role: "Delivery Rider", 
    phone: "0300-8889990", 
    salary: "Rs 25,000", 
    permissions: "App Only", 
    status: "Active" 
  },
]

const ATTENDANCE_DATA = [
  { name: "Mon", present: 10, late: 2 },
  { name: "Tue", present: 11, late: 1 },
  { name: "Wed", present: 9, late: 3 },
  { name: "Thu", present: 12, late: 0 },
  { name: "Fri", present: 11, late: 1 },
  { name: "Sat", present: 10, late: 2 },
]

const ACTIVITY_LOGS = [
  { user: "Muhammad Ali", action: "Updated Inventory", time: "10 mins ago" },
  { user: "Zeeshan Ahmed", action: "Created Sale INV-004", time: "25 mins ago" },
  { user: "Usman Raza", action: "Modified Repair Log", time: "1 hour ago" },
  { user: "Muhammad Ali", action: "Exported Reports", time: "2 hours ago" },
]

// ─── Sub-Components ───────────────────────────────────────────────────────────

const StatCard = ({ title, value, trend, icon: Icon, color = "primary" }: any) => {
  const colorClasses: any = {
    primary: "text-primary bg-primary/10 border-primary/20",
    success: "text-success bg-success/10 border-success/20",
    info: "text-info bg-info/10 border-info/20",
    warning: "text-warning bg-warning/10 border-warning/20",
  }

  return (
    <Card className="glass-card group overflow-hidden border-[var(--border)] transition-all hover:shadow-xl hover:-translate-y-1">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xs font-bold uppercase tracking-widest text-[var(--text-soft)]">
          {title}
        </CardTitle>
        <div className={cn("p-2 rounded-xl border transition-colors", colorClasses[color])}>
          <Icon size={18} />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-black font-heading text-[var(--text-main)] tracking-tight">
          {value}
        </div>
        <div className="flex items-center gap-2 mt-2">
          <div className={cn(
            "flex items-center gap-0.5 text-[10px] font-bold px-1.5 py-0.5 rounded-full",
            trend.value >= 0 ? "bg-success/10 text-success" : "bg-danger/10 text-danger"
          )}>
            {trend.value >= 0 ? <ArrowUpRight size={10} /> : <ArrowDownRight size={10} />}
            {Math.abs(trend.value)}%
          </div>
          <span className="text-[11px] font-medium text-[var(--text-soft)]">
            {trend.label}
          </span>
        </div>
      </CardContent>
    </Card>
  )
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function StaffPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-1000">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-black font-heading text-[var(--text-main)] tracking-tight">
            Team Management
          </h1>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
            <p className="text-sm font-bold text-[var(--text-soft)] uppercase tracking-widest">
              Human Resources • Operational Staff Control
            </p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" size="sm" className="h-10 rounded-xl font-bold gap-2">
            <Calendar size={16} />
            Duty Roster
          </Button>
          <Button variant="primary" size="sm" className="h-10 rounded-xl font-bold gap-2 shadow-lg shadow-primary/20">
            <Plus size={16} />
            Hire New Staff
          </Button>
        </div>
      </div>

      {/* Staff Stats */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {STAFF_STATS.map((stat, i) => (
          <StatCard key={i} {...stat} />
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-8 grid-cols-1 lg:grid-cols-12">
        
        {/* Left: Staff Table */}
        <div className="lg:col-span-9 space-y-6">
          
          {/* Search Bar */}
          <Card className="border-[var(--border)] bg-[var(--card)]/50 backdrop-blur-sm p-4 rounded-2xl shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative col-span-1 md:col-span-3">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-soft)]" size={18} />
                <Input placeholder="Search employee by name, role or phone..." className="pl-10 h-11 rounded-xl bg-white/50 border-[var(--border)]" />
              </div>
              <Button variant="outline" className="h-11 rounded-xl font-bold border-[var(--border)] bg-white/50 gap-2">
                <Filter size={18} />
                Advanced Filters
              </Button>
            </div>
          </Card>

          {/* Staff Table */}
          <SectionCard 
            title="Employee Directory" 
            className="border border-[var(--border)] shadow-xl shadow-slate-200/50"
            contentClassName="p-0"
          >
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-b border-[var(--border)] bg-[var(--bg-secondary)]/50">
                    <TableHead className="font-bold text-xs uppercase tracking-wider h-12">Member</TableHead>
                    <TableHead className="font-bold text-xs uppercase tracking-wider h-12">Role</TableHead>
                    <TableHead className="font-bold text-xs uppercase tracking-wider h-12">Contact</TableHead>
                    <TableHead className="font-bold text-xs uppercase tracking-wider h-12">Salary</TableHead>
                    <TableHead className="font-bold text-xs uppercase tracking-wider h-12">Permissions</TableHead>
                    <TableHead className="font-bold text-xs uppercase tracking-wider h-12">Status</TableHead>
                    <TableHead className="font-bold text-xs uppercase tracking-wider h-12 text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {STAFF_MEMBERS.map((member) => (
                    <TableRow key={member.id} className="border-b border-[var(--border)] hover:bg-[var(--bg-secondary)]/30 transition-colors">
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary text-xs border border-primary/20">
                            {member.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div className="flex flex-col">
                            <span className="font-bold text-sm text-[var(--text-main)]">{member.name}</span>
                            <span className="text-[10px] font-bold text-[var(--text-soft)] uppercase tracking-tighter">{member.id}</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-xs font-bold text-[var(--text-main)]">{member.role}</TableCell>
                      <TableCell className="text-xs font-medium text-[var(--text-soft)]">{member.phone}</TableCell>
                      <TableCell className="font-black text-sm text-[var(--text-main)]">{member.salary}</TableCell>
                      <TableCell>
                         <div className="flex items-center gap-1">
                           <Shield size={12} className="text-primary" />
                           <span className="text-xs font-bold text-[var(--text-soft)]">{member.permissions}</span>
                         </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={cn("rounded-lg px-2 py-1 text-[10px] font-black uppercase tracking-tight", {
                          "bg-success/10 text-success border-success/20": member.status === "Active",
                          "bg-warning/10 text-warning border-warning/20": member.status === "On Leave",
                          "bg-[var(--bg-secondary)] text-[var(--text-soft)] border-[var(--border)]": member.status === "Inactive",
                        })}>
                          {member.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-primary/5 text-[var(--text-soft)]">
                              <MoreVertical size={16} />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-56 rounded-xl border-[var(--border)] shadow-2xl backdrop-blur-xl">
                            <DropdownMenuLabel className="text-[10px] font-black uppercase text-[var(--text-soft)] px-3 py-2">Member Control</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="gap-2 px-3 py-2 rounded-lg cursor-pointer">
                              <Eye size={14} className="text-primary" />
                              <span className="font-bold text-sm">View Profile</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="gap-2 px-3 py-2 rounded-lg cursor-pointer">
                              <Lock size={14} className="text-info" />
                              <span className="font-bold text-sm">Edit Permissions</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="gap-2 px-3 py-2 rounded-lg cursor-pointer">
                              <Settings2 size={14} className="text-warning" />
                              <span className="font-bold text-sm">Change Role</span>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="gap-2 px-3 py-2 rounded-lg cursor-pointer text-danger focus:text-danger">
                              <History size={14} />
                              <span className="font-bold text-sm">Offboard Member</span>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </SectionCard>

        </div>

        {/* Right: Insights & Logs */}
        <div className="lg:col-span-3 space-y-8">
          
          {/* Attendance Chart */}
          <Card className="border-[var(--border)] bg-[var(--card)] shadow-xl shadow-slate-200/50">
            <CardHeader className="border-b border-[var(--border)]">
              <CardTitle className="text-sm font-bold uppercase tracking-widest text-[var(--text-main)] flex items-center gap-2">
                <Clock size={16} className="text-info" />
                Weekly Attendance
              </CardTitle>
            </CardHeader>
            <CardContent className="h-[200px] p-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={ATTENDANCE_DATA} margin={{ top: 5, right: 0, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" strokeOpacity={0.5} />
                  <XAxis dataKey="name" stroke="var(--text-soft)" fontSize={10} fontWeight={700} axisLine={false} tickLine={false} />
                  <YAxis hide />
                  <Tooltip />
                  <Bar dataKey="present" fill="var(--success)" radius={[4, 4, 0, 0]} stackId="a" />
                  <Bar dataKey="late" fill="var(--warning)" radius={[4, 4, 0, 0]} stackId="a" />
                </BarChart>
              </ResponsiveContainer>
              <div className="mt-4 flex justify-around text-[10px] font-black uppercase tracking-widest text-[var(--text-soft)]">
                <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-success" /> Present</div>
                <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-warning" /> Late</div>
              </div>
            </CardContent>
          </Card>

          {/* Activity Logs */}
          <Card className="border-[var(--border)] bg-[var(--card)] shadow-xl shadow-slate-200/50 overflow-hidden">
            <CardHeader className="border-b border-[var(--border)] bg-[var(--bg-secondary)]/30">
              <CardTitle className="text-sm font-bold uppercase tracking-widest text-[var(--text-main)] flex items-center gap-2">
                <Activity size={16} className="text-primary" />
                Live Staff Logs
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-[var(--border)]">
                {ACTIVITY_LOGS.map((log, i) => (
                  <div key={i} className="p-4 space-y-1 hover:bg-[var(--bg-secondary)]/30 transition-colors">
                    <div className="flex justify-between items-center">
                      <p className="text-xs font-bold text-[var(--text-main)]">{log.user}</p>
                      <span className="text-[10px] text-[var(--text-soft)] font-medium">{log.time}</span>
                    </div>
                    <p className="text-[11px] font-medium text-[var(--text-soft)] leading-tight">{log.action}</p>
                  </div>
                ))}
              </div>
              <div className="p-4 bg-[var(--bg-secondary)]/10 text-center">
                <Button variant="ghost" className="h-8 text-[10px] font-black uppercase text-primary">View Full Audit Trail</Button>
              </div>
            </CardContent>
          </Card>

          {/* HR Insight Card */}
          <Card className="bg-gradient-to-br from-primary to-primary-dark text-white p-6 rounded-3xl shadow-xl shadow-primary/20 border-none relative overflow-hidden group">
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-4">
                <div className="p-2 rounded-xl bg-white/20 backdrop-blur-sm">
                  <TrendingUp size={20} className="text-white" />
                </div>
                <h4 className="font-black text-sm uppercase tracking-widest">HR Intelligence</h4>
              </div>
              <h3 className="text-xl font-bold mb-2">Efficiency Peak</h3>
              <p className="text-sm text-white/80 leading-relaxed mb-6 font-medium">
                Your shift overlap is currently at 92%. Morning productivity has increased by 15% since the new duty roster was implemented.
              </p>
              <Button variant="secondary" className="w-full bg-white text-primary font-black uppercase tracking-widest text-[10px] h-10 hover:bg-white/90">
                Analyze Shifts
              </Button>
            </div>
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl group-hover:scale-110 transition-transform duration-1000" />
          </Card>

        </div>
      </div>
    </div>
  )
}
