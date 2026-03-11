import { useState } from "react";
import {
  LayoutDashboard, Users, Settings, Bell, BarChart2, LogOut,
  Search, Filter, ChevronDown, MoreVertical, CheckCircle2,
  XCircle, Clock, Eye, Download, Plus, Edit2, Trash2, AlertCircle,
  ShieldCheck, MapPin, TrendingUp, FileText, Menu, X,
  MessageSquare, Send, ToggleLeft, ToggleRight, Save
} from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from "recharts";
import Link from "next/link";
import { toast } from "sonner";
import nelfundLogo from "../assets/nelfund-logo.png";

// ---- Mock Data ----
const MOCK_APPLICATIONS = [
  { id: "SKU-2026-100012", name: "Adewale Okonkwo", phone: "0801 234 5678", trade: "Solar Installation", lga: "Ibadan North", ninBvn: "Verified", status: "Applied", date: "2026-03-01" },
  { id: "SKU-2026-100013", name: "Fatima Abubakar", phone: "0803 456 7890", trade: "Artificial Intelligence", lga: "Ogbomosho North", ninBvn: "Verified", status: "Shortlisted", date: "2026-03-02" },
  { id: "SKU-2026-100014", name: "Chidi Nwosu", phone: "0805 678 9012", trade: "Makeup Artistry", lga: "Ibadan South-West", ninBvn: "Failed", status: "Applied", date: "2026-03-02" },
  { id: "SKU-2026-100015", name: "Aisha Mohammed", phone: "0807 890 1234", trade: "Fashion Design", lga: "Akinyele", ninBvn: "Verified", status: "Shortlisted", date: "2026-03-03" },
  { id: "SKU-2026-100016", name: "Emeka Obi", phone: "0809 012 3456", trade: "Solar Installation", lga: "Egbeda", ninBvn: "Verified", status: "Rejected", date: "2026-03-03" },
  { id: "SKU-2026-100017", name: "Ngozi Eze", phone: "0811 234 5678", trade: "Fashion Design", lga: "Ona-Ara", ninBvn: "Verified", status: "On-Hold", date: "2026-03-04" },
  { id: "SKU-2026-100018", name: "Tunde Bakare", phone: "0813 456 7890", trade: "Artificial Intelligence", lga: "Ibadan North-West", ninBvn: "Verified", status: "Applied", date: "2026-03-04" },
  { id: "SKU-2026-100019", name: "Halima Sule", phone: "0815 678 9012", trade: "Makeup Artistry", lga: "Iseyin", ninBvn: "Failed", status: "Applied", date: "2026-03-05" },
  { id: "SKU-2026-100020", name: "Bayo Adeyemi", phone: "0817 890 1234", trade: "Solar Installation", lga: "Lagelu", ninBvn: "Verified", status: "Shortlisted", date: "2026-03-05" },
  { id: "SKU-2026-100021", name: "Kemi Oladele", phone: "0819 012 3456", trade: "Fashion Design", lga: "Oluyole", ninBvn: "Verified", status: "Applied", date: "2026-03-05" },
];

const CHART_TRADES = [
  { trade: "Solar Installation", count: 142 },
  { trade: "AI", count: 89 },
  { trade: "Makeup Artistry", count: 201 },
  { trade: "Fashion Design", count: 167 },
];

const CHART_GENDER = [
  { name: "Female", value: 324, color: "#10b981" },
  { name: "Male", value: 268, color: "#059669" },
  { name: "Other", value: 7, color: "#d1fae5" },
];

const CHART_STATUS = [
  { status: "Applied", count: 489 },
  { status: "Shortlisted", count: 73 },
  { status: "Rejected", count: 24 },
  { status: "On-Hold", count: 13 },
];

const LGA_DATA = [
  { lga: "Ibadan North", count: 94 },
  { lga: "Ogbomosho North", count: 67 },
  { lga: "Ibadan S-W", count: 83 },
  { lga: "Akinyele", count: 51 },
  { lga: "Egbeda", count: 59 },
  { lga: "Lagelu", count: 45 },
];

const NOTIFICATION_TEMPLATES = [
  { id: 1, name: "Application Received", type: "Email + SMS", active: true, lastSent: "2026-03-05" },
  { id: 2, name: "Shortlisted Notification", type: "Email + SMS", active: true, lastSent: "2026-03-03" },
  { id: 3, name: "Rejection Notice", type: "Email + SMS", active: true, lastSent: "2026-03-03" },
  { id: 4, name: "On-Hold Notification", type: "SMS only", active: false, lastSent: "–" },
  { id: 5, name: "Document Reminder", type: "Email only", active: true, lastSent: "2026-03-04" },
];

const USERS = [
  { name: "Dr. Amaka Osei", email: "amaka.osei@nelfund.gov.ng", role: "Super Admin", status: "Active", lastLogin: "2026-03-06" },
  { name: "Ibrahim Tanko", email: "i.tanko@nelfund.gov.ng", role: "State Admin", status: "Active", lastLogin: "2026-03-05" },
  { name: "Blessing Adeyinka", email: "b.adeyinka@nelfund.gov.ng", role: "Reviewer", status: "Active", lastLogin: "2026-03-06" },
  { name: "Chioma Okafor", email: "c.okafor@nelfund.gov.ng", role: "Viewer", status: "Inactive", lastLogin: "2026-02-28" },
];

// ---- Sub-components ----
type Status = "Applied" | "Shortlisted" | "Rejected" | "On-Hold";
type VerifyStatus = "Verified" | "Failed";

function StatusBadge({ status }: { status: Status }) {
  const styles: Record<Status, string> = {
    Applied: "bg-blue-100 text-blue-700",
    Shortlisted: "bg-emerald-100 text-emerald-700",
    Rejected: "bg-red-100 text-red-700",
    "On-Hold": "bg-amber-100 text-amber-700",
  };
  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${styles[status]}`}>{status}</span>
  );
}

function VerifyBadge({ status }: { status: VerifyStatus }) {
  return status === "Verified"
    ? <span className="flex items-center gap-1 text-xs text-emerald-700 font-medium"><CheckCircle2 className="w-3.5 h-3.5" />Verified</span>
    : <span className="flex items-center gap-1 text-xs text-red-600 font-medium"><XCircle className="w-3.5 h-3.5" />Failed</span>;
}

function StatCard({ label, value, sub, icon, color }: { label: string; value: string | number; sub?: string; icon: React.ReactNode; color: string }) {
  return (
    <div className="bg-white rounded-xl border border-neutral-100 p-6 shadow-sm">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${color}`}>{icon}</div>
      </div>
      <div className="text-3xl text-neutral-900 mb-1">{value}</div>
      <div className="text-sm text-neutral-500">{label}</div>
      {sub && <div className="text-xs text-neutral-400 mt-1">{sub}</div>}
    </div>
  );
}

// ---- Main Admin Page ----
export function Admin() {
  const [activeTab, setActiveTab] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterTrade, setFilterTrade] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterVerify, setFilterVerify] = useState("All");
  const [selectedApp, setSelectedApp] = useState<typeof MOCK_APPLICATIONS[0] | null>(null);
  const [statusChangeModal, setStatusChangeModal] = useState(false);
  const [newStatus, setNewStatus] = useState<Status>("Applied");
  const [statusComment, setStatusComment] = useState("");
  const [templateModal, setTemplateModal] = useState<{ isOpen: boolean, isEdit: boolean, data: any }>({ isOpen: false, isEdit: false, data: null });
  const [userModal, setUserModal] = useState<{ isOpen: boolean, isEdit: boolean, data: any }>({ isOpen: false, isEdit: false, data: null });


  // Quota state
  const [totalSlots, setTotalSlots] = useState(5000);
  const [tradeModal, setTradeModal] = useState<{ isOpen: boolean, data: any }>({ isOpen: false, data: null });
  const [templates, setTemplates] = useState(NOTIFICATION_TEMPLATES);

  const navItems = [
    { id: "overview", label: "Overview", icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: "applications", label: "Applications", icon: <FileText className="w-4 h-4" /> },
    { id: "quota", label: "Quota Management", icon: <BarChart2 className="w-4 h-4" /> },
    { id: "notifications", label: "Notifications", icon: <Bell className="w-4 h-4" /> },
    { id: "users", label: "Users & Roles", icon: <Users className="w-4 h-4" /> },
    { id: "settings", label: "Settings", icon: <Settings className="w-4 h-4" /> },
  ];

  const [applications, setApplications] = useState(MOCK_APPLICATIONS);
  const [adminUsers, setAdminUsers] = useState(USERS);
  const [trades, setTrades] = useState([
    { name: "Solar Installation", active: true, quota: 25, color: "bg-amber-500" },
    { name: "Artificial Intelligence (AI)", active: true, quota: 20, color: "bg-blue-500" },
    { name: "Makeup Artistry", active: true, quota: 30, color: "bg-pink-500" },
    { name: "Fashion Design", active: true, quota: 25, color: "bg-purple-500" },
  ]);
  const [auditLogs, setAuditLogs] = useState([
    { action: "Status changed to Shortlisted", user: "Blessing Adeyinka", target: "SKU-2026-100015", time: "2026-03-06 10:32" },
    { action: "Application export downloaded", user: "Ibrahim Tanko", target: "CSV Export (All)", time: "2026-03-06 09:14" },
    { action: "Admin login", user: "Dr. Amaka Osei", target: "Super Admin", time: "2026-03-06 08:45" },
    { action: "Quota updated: Total slots", user: "Dr. Amaka Osei", target: "4000 → 5000", time: "2026-03-05 14:22" },
  ]);

  const filteredApps = applications.filter(a => {
    const matchSearch = !searchQuery || a.name.toLowerCase().includes(searchQuery.toLowerCase()) || a.id.toLowerCase().includes(searchQuery.toLowerCase()) || a.phone.includes(searchQuery);
    const matchTrade = filterTrade === "All" || a.trade === filterTrade;
    const matchStatus = filterStatus === "All" || a.status === filterStatus;
    const matchVerify = filterVerify === "All" || a.ninBvn === filterVerify;
    return matchSearch && matchTrade && matchStatus && matchVerify;
  });

  const totalApps = applications.length;
  const shortlisted = applications.filter(a => a.status === "Shortlisted").length;
  const rejected = applications.filter(a => a.status === "Rejected").length;
  const verified = applications.filter(a => a.ninBvn === "Verified").length;

  function Sidebar({ mobile = false }) {
    return (
      <div className={`${mobile ? "block" : "hidden lg:flex"} flex-col h-full bg-neutral-950 text-white w-64 flex-shrink-0`}>
        <div className="p-6 border-b border-white/10">
          <Link href="/" className="flex items-center gap-2">
            <img src={nelfundLogo.src} alt="NELFUND" className="w-8 h-8 object-contain rounded-lg bg-white p-0.5" />
            <div>
              <div className="text-sm font-bold">NELFUND Admin</div>
              <div className="text-[10px] text-emerald-400 uppercase tracking-widest">SKILL UP</div>
            </div>
          </Link>
        </div>
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => { setActiveTab(item.id); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all text-left ${activeTab === item.id ? "bg-emerald-700 text-white" : "text-neutral-400 hover:bg-white/5 hover:text-white"
                }`}
            >
              {item.icon} {item.label}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-white/10">
          <div className="flex items-center gap-3 px-4 py-2.5 mb-2">
            <div className="w-7 h-7 bg-emerald-600 rounded-full flex items-center justify-center text-xs font-bold">SA</div>
            <div>
              <div className="text-xs font-bold text-white">Super Admin</div>
              <div className="text-[10px] text-neutral-500">admin@nelfund.gov.ng</div>
            </div>
          </div>
          <Link href="/" className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-xs text-neutral-500 hover:text-red-400 transition-colors">
            <LogOut className="w-4 h-4" /> Sign Out
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-neutral-100 overflow-hidden">
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex">
        <Sidebar />
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="w-64 h-full"><Sidebar mobile /></div>
          <div className="flex-1 bg-black/50" onClick={() => setSidebarOpen(false)} />
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen overflow-auto">
        {/* Top Bar */}
        <div className="bg-white border-b border-neutral-200 px-6 py-4 flex items-center justify-between sticky top-0 z-40">
          <div className="flex items-center gap-4">
            <button className="lg:hidden text-neutral-500" onClick={() => setSidebarOpen(true)}>
              <Menu className="w-5 h-5" />
            </button>
            <div>
              <div className="text-base font-bold text-neutral-900 capitalize">{navItems.find(n => n.id === activeTab)?.label}</div>
              <div className="text-xs text-neutral-400">NELFUND SKILL UP Program</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-xs text-neutral-400 hidden sm:block">Last updated: March 6, 2026</div>
            <button className="relative w-8 h-8 flex items-center justify-center text-neutral-400 hover:text-neutral-700 rounded-lg hover:bg-neutral-50 transition-all">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
          </div>
        </div>

        <div className="flex-1 p-6 overflow-auto">

          {/* ======================== OVERVIEW ======================== */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              {/* Stats Row */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard label="Total Applications" value={totalApps} sub="+12 today" icon={<FileText className="w-5 h-5 text-blue-600" />} color="bg-blue-50" />
                <StatCard label="Shortlisted" value={shortlisted} sub={`${Math.round(shortlisted / totalApps * 100)}% of total`} icon={<CheckCircle2 className="w-5 h-5 text-emerald-600" />} color="bg-emerald-50" />
                <StatCard label="NIN/BVN Verified" value={verified} sub={`${Math.round(verified / totalApps * 100)}% verification rate`} icon={<ShieldCheck className="w-5 h-5 text-purple-600" />} color="bg-purple-50" />
                <StatCard label="Quota Utilization" value="11.96%" sub={`${shortlisted} of 5,000 slots`} icon={<TrendingUp className="w-5 h-5 text-amber-600" />} color="bg-amber-50" />
              </div>

              {/* Charts Row */}
              <div className="grid lg:grid-cols-3 gap-6">
                {/* Applications by Trade */}
                <div className="lg:col-span-2 bg-white rounded-xl border border-neutral-100 p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-5">
                    <div>
                      <div className="text-sm font-bold text-neutral-900">Applications by Priority Trade</div>
                      <div className="text-xs text-neutral-400">Real-time distribution</div>
                    </div>
                    <button className="text-xs text-emerald-700 font-bold hover:underline flex items-center gap-1">
                      <Download className="w-3 h-3" /> Export
                    </button>
                  </div>
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={CHART_TRADES} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f5" />
                      <XAxis dataKey="trade" tick={{ fontSize: 11 }} />
                      <YAxis tick={{ fontSize: 11 }} />
                      <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid #e5e7eb" }} />
                      <Bar dataKey="count" fill="#059669" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                {/* Gender Distribution */}
                <div className="bg-white rounded-xl border border-neutral-100 p-6 shadow-sm">
                  <div className="text-sm font-bold text-neutral-900 mb-1">Gender Distribution</div>
                  <div className="text-xs text-neutral-400 mb-4">All applicants</div>
                  <ResponsiveContainer width="100%" height={170}>
                    <PieChart>
                      <Pie data={CHART_GENDER} cx="50%" cy="50%" innerRadius={45} outerRadius={70} dataKey="value">
                        {CHART_GENDER.map((entry, index) => (
                          <Cell key={index} fill={entry.color} />
                        ))}
                      </Pie>
                      <Legend iconSize={8} wrapperStyle={{ fontSize: 11 }} />
                      <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Status + LGA Charts */}
              <div className="grid lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl border border-neutral-100 p-6 shadow-sm">
                  <div className="text-sm font-bold text-neutral-900 mb-4">Application Status Breakdown</div>
                  <ResponsiveContainer width="100%" height={160}>
                    <BarChart data={CHART_STATUS} layout="vertical" margin={{ top: 0, right: 20, left: 30, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f5" horizontal={false} />
                      <XAxis type="number" tick={{ fontSize: 11 }} />
                      <YAxis dataKey="status" type="category" tick={{ fontSize: 11 }} width={70} />
                      <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
                      <Bar dataKey="count" fill="#10b981" radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="bg-white rounded-xl border border-neutral-100 p-6 shadow-sm">
                  <div className="text-sm font-bold text-neutral-900 mb-4">Top LGAs by Applications</div>
                  <div className="space-y-3">
                    {LGA_DATA.map((item, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="text-xs text-neutral-400 w-28 truncate flex-shrink-0">{item.lga}</div>
                        <div className="flex-1 h-2 bg-neutral-100 rounded-full overflow-hidden">
                          <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${(item.count / 94) * 100}%` }} />
                        </div>
                        <div className="text-xs font-bold text-neutral-700 w-8 text-right">{item.count}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Recent Applications */}
              <div className="bg-white rounded-xl border border-neutral-100 shadow-sm overflow-hidden">
                <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-100">
                  <div className="text-sm font-bold text-neutral-900">Recent Applications</div>
                  <button onClick={() => setActiveTab("applications")} className="text-xs text-emerald-700 font-bold hover:underline">View all</button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-neutral-50 border-b border-neutral-100">
                        {["Application ID", "Name", "Trade", "LGA", "NIN/BVN", "Status"].map(h => (
                          <th key={h} className="px-4 py-3 text-left text-xs font-bold text-neutral-400 uppercase tracking-wider">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-50">
                      {applications.slice(0, 5).map(app => (
                        <tr key={app.id} className="hover:bg-neutral-50 transition-colors">
                          <td className="px-4 py-3 text-xs font-mono text-neutral-600">{app.id}</td>
                          <td className="px-4 py-3 font-medium text-neutral-900">{app.name}</td>
                          <td className="px-4 py-3 text-neutral-500">{app.trade}</td>
                          <td className="px-4 py-3 text-neutral-500">{app.lga}</td>
                          <td className="px-4 py-3"><VerifyBadge status={app.ninBvn as VerifyStatus} /></td>
                          <td className="px-4 py-3"><StatusBadge status={app.status as Status} /></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ======================== APPLICATIONS ======================== */}
          {activeTab === "applications" && (
            <div className="space-y-4">
              {/* Search & Filter Bar */}
              <div className="bg-white rounded-xl border border-neutral-100 p-4 shadow-sm">
                <div className="flex flex-wrap gap-3 items-center">
                  <div className="relative flex-1 min-w-48">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                    <input
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                      placeholder="Search by name, ID, or phone..."
                      className="w-full pl-9 pr-4 h-9 border border-neutral-200 rounded-lg text-sm outline-none focus:border-emerald-600 transition-all"
                    />
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    {[
                      { label: "Trade", value: filterTrade, onChange: setFilterTrade, options: ["All", "Solar Installation", "Artificial Intelligence", "Makeup Artistry", "Fashion Design"] },
                      { label: "Status", value: filterStatus, onChange: setFilterStatus, options: ["All", "Applied", "Shortlisted", "Rejected", "On-Hold"] },
                      { label: "NIN/BVN", value: filterVerify, onChange: setFilterVerify, options: ["All", "Verified", "Failed"] },
                    ].map(f => (
                      <div key={f.label} className="relative">
                        <select
                          value={f.value}
                          onChange={e => f.onChange(e.target.value)}
                          className="h-9 pl-3 pr-8 border border-neutral-200 rounded-lg text-sm outline-none focus:border-emerald-600 bg-white appearance-none cursor-pointer"
                        >
                          {f.options.map(o => <option key={o} value={o}>{f.label}: {o}</option>)}
                        </select>
                        <ChevronDown className="w-3 h-3 absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none" />
                      </div>
                    ))}
                  </div>
                  <button className="h-9 px-4 bg-emerald-700 text-white rounded-lg text-sm font-bold hover:bg-emerald-600 transition-all flex items-center gap-2">
                    <Download className="w-3.5 h-3.5" /> Export
                  </button>
                </div>
                <div className="text-xs text-neutral-400 mt-2">
                  Showing {filteredApps.length} of {applications.length} applications
                </div>
              </div>

              {/* Table */}
              <div className="bg-white rounded-xl border border-neutral-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-neutral-50 border-b border-neutral-100">
                        {["Application ID", "Full Name", "Phone", "Trade", "LGA", "NIN/BVN", "Status", "Date", "Actions"].map(h => (
                          <th key={h} className="px-4 py-3 text-left text-xs font-bold text-neutral-400 uppercase tracking-wider whitespace-nowrap">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-50">
                      {filteredApps.map(app => (
                        <tr key={app.id} className="hover:bg-neutral-50 transition-colors">
                          <td className="px-4 py-3 text-xs font-mono text-neutral-600 whitespace-nowrap">{app.id}</td>
                          <td className="px-4 py-3 font-medium text-neutral-900 whitespace-nowrap">{app.name}</td>
                          <td className="px-4 py-3 text-neutral-500 text-xs">{app.phone}</td>
                          <td className="px-4 py-3 text-neutral-500 text-xs whitespace-nowrap">{app.trade}</td>
                          <td className="px-4 py-3 text-neutral-500 text-xs whitespace-nowrap">{app.lga}</td>
                          <td className="px-4 py-3 whitespace-nowrap"><VerifyBadge status={app.ninBvn as VerifyStatus} /></td>
                          <td className="px-4 py-3 whitespace-nowrap"><StatusBadge status={app.status as Status} /></td>
                          <td className="px-4 py-3 text-neutral-400 text-xs whitespace-nowrap">{app.date}</td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => { setSelectedApp(app); }}
                                className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-blue-50 text-neutral-400 hover:text-blue-600 transition-all"
                                title="View Details"
                              ><Eye className="w-3.5 h-3.5" /></button>
                              <button
                                onClick={() => { setSelectedApp(app); setNewStatus(app.status as Status); setStatusChangeModal(true); }}
                                className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-emerald-50 text-neutral-400 hover:text-emerald-600 transition-all"
                                title="Change Status"
                              ><Edit2 className="w-3.5 h-3.5" /></button>
                              <button
                                onClick={() => setApplications(prev => prev.filter(a => a.id !== app.id))}
                                className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-red-50 text-neutral-400 hover:text-red-600 transition-all"
                                title="Delete"
                              ><Trash2 className="w-3.5 h-3.5" /></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {filteredApps.length === 0 && (
                  <div className="text-center py-16 text-neutral-400">
                    <Search className="w-8 h-8 mx-auto mb-3 opacity-30" />
                    <div className="text-sm">No applications match your filters.</div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ======================== QUOTA MANAGEMENT ======================== */}
          {activeTab === "quota" && (
            <div className="space-y-6">
              <div className="bg-white rounded-xl border border-neutral-100 p-6 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <div className="text-base font-bold text-neutral-900">Total Slot Capacity</div>
                    <div className="text-xs text-neutral-400">Configure the maximum number of beneficiaries for this pilot phase</div>
                  </div>
                  <button onClick={() => {
                    toast.success("Quota limits updated successfully");
                    setAuditLogs(prev => [
                      { action: `Quota updated: Total slots to ${totalSlots}`, user: "Super Admin", target: "System Quota", time: new Date().toISOString().replace('T', ' ').slice(0, 16) },
                      ...prev
                    ]);
                  }} className="px-4 py-2 bg-emerald-700 text-white rounded-lg text-sm font-bold hover:bg-emerald-600 transition-all flex items-center gap-2">
                    <Save className="w-3.5 h-3.5" /> Save Changes
                  </button>
                </div>
                <div className="flex items-end gap-6">
                  <div className="space-y-1.5">
                    <label className="text-sm text-neutral-600 font-medium">Total Slots</label>
                    <input
                      type="number"
                      value={totalSlots}
                      onChange={e => setTotalSlots(Number(e.target.value))}
                      className="w-40 h-11 px-4 rounded-lg border border-neutral-200 focus:border-emerald-600 outline-none text-xl font-mono"
                    />
                  </div>
                  <div className="pb-2">
                    <div className="text-sm text-neutral-400">Currently used: <strong className="text-neutral-900">{shortlisted} slots</strong></div>
                    <div className="text-sm text-neutral-400">Remaining: <strong className="text-emerald-700">{totalSlots - shortlisted} slots</strong></div>
                  </div>
                </div>
                <div className="mt-5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-neutral-500">Quota Utilization</span>
                    <span className="text-xs font-bold text-neutral-700">{((shortlisted / totalSlots) * 100).toFixed(1)}%</span>
                  </div>
                  <div className="h-3 bg-neutral-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-500 rounded-full transition-all"
                      style={{ width: `${(shortlisted / totalSlots) * 100}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Sector Quotas */}
              <div className="bg-white rounded-xl border border-neutral-100 p-6 shadow-sm">
                <div className="text-base font-bold text-neutral-900 mb-1">Sector-Specific Quota Allocation</div>
                <div className="text-xs text-neutral-400 mb-6">Allocate percentage of total slots to each priority trade. Total must equal 100%.</div>

                <div className="space-y-5">
                  {trades.filter(t => t.active).map(sector => {
                    const pct = sector.quota;
                    const slots = Math.round((pct / 100) * totalSlots);
                    const used = Math.round(MOCK_APPLICATIONS.filter(a => a.trade.toLowerCase().includes(sector.name.split(' ')[0].toLowerCase())).length / MOCK_APPLICATIONS.length * shortlisted);
                    return (
                      <div key={sector.name}>
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <div className={`w-2.5 h-2.5 rounded-full ${sector.color}`} />
                            <span className="text-sm font-medium text-neutral-700">{sector.name}</span>
                          </div>
                          <div className="flex items-center gap-4 text-sm">
                            <span className="text-neutral-400">{slots} slots</span>
                            <div className="flex items-center gap-2">
                              <input
                                type="number"
                                value={pct}
                                onChange={e => setTrades(q => q.map(t => t.name === sector.name ? { ...t, quota: Number(e.target.value) } : t))}
                                className="w-16 h-8 px-2 border border-neutral-200 rounded-lg text-sm text-center outline-none focus:border-emerald-600"
                                min={0} max={100}
                              />
                              <span className="text-neutral-400">%</span>
                            </div>
                          </div>
                        </div>
                        <div className="relative h-2 bg-neutral-100 rounded-full overflow-hidden">
                          <div className={`absolute top-0 left-0 h-full ${sector.color} rounded-full opacity-20`} style={{ width: `${pct}%` }} />
                          <div className={`absolute top-0 left-0 h-full ${sector.color} rounded-full`} style={{ width: `${used > 0 ? (used / slots) * pct : 0}%` }} />
                        </div>
                        <div className="text-xs text-neutral-400 mt-1">{used} of {slots} slots used</div>
                      </div>
                    );
                  })}
                </div>

                <div className={`mt-5 p-3 rounded-lg text-sm flex items-center gap-2 ${trades.filter(t => t.active).reduce((a, b) => a + b.quota, 0) === 100
                  ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                  : "bg-red-50 text-red-700 border border-red-200"
                  }`}>
                  {trades.filter(t => t.active).reduce((a, b) => a + b.quota, 0) === 100
                    ? <><CheckCircle2 className="w-4 h-4" /> Quota allocations total 100%. Configuration is valid.</>
                    : <><AlertCircle className="w-4 h-4" /> Total allocation is {trades.filter(t => t.active).reduce((a, b) => a + b.quota, 0)}%. Must equal 100%.</>
                  }
                </div>


              </div>

              {/* Audit Log */}
              <div className="bg-white rounded-xl border border-neutral-100 p-6 shadow-sm">
                <div className="text-base font-bold text-neutral-900 mb-4">Quota Adjustment Audit Log</div>
                <div className="space-y-3">
                  {[
                    { action: "Total slots updated", from: "4,000", to: "5,000", by: "Super Admin", date: "2026-03-05 14:22" },
                    { action: "Fashion Design quota updated", from: "20%", to: "25%", by: "Super Admin", date: "2026-03-04 09:15" },
                    { action: "Makeup Artistry quota updated", from: "25%", to: "30%", by: "Super Admin", date: "2026-03-04 09:12" },
                  ].map((log, i) => (
                    <div key={i} className="flex items-center gap-4 text-sm p-3 bg-neutral-50 rounded-lg border border-neutral-100">
                      <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0"><Edit2 className="w-4 h-4 text-emerald-600" /></div>
                      <div className="flex-1">
                        <div className="text-neutral-700 font-medium">{log.action}</div>
                        <div className="text-neutral-400 text-xs">{log.from} → {log.to} · By {log.by}</div>
                      </div>
                      <div className="text-xs text-neutral-400 flex-shrink-0">{log.date}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ======================== NOTIFICATIONS ======================== */}
          {activeTab === "notifications" && (
            <div className="space-y-6">
              {/* Delivery Stats */}
              <div className="grid sm:grid-cols-3 gap-4">
                {[
                  { label: "Emails Sent", value: "599", icon: <MessageSquare className="w-5 h-5 text-blue-600" />, color: "bg-blue-50" },
                  { label: "SMS Sent", value: "599", icon: <Send className="w-5 h-5 text-purple-600" />, color: "bg-purple-50" },
                  { label: "Delivery Success Rate", value: "98.3%", icon: <CheckCircle2 className="w-5 h-5 text-emerald-600" />, color: "bg-emerald-50" },
                ].map((s, i) => (
                  <div key={i} className="bg-white rounded-xl border border-neutral-100 p-5 flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-lg ${s.color} flex items-center justify-center flex-shrink-0`}>{s.icon}</div>
                    <div>
                      <div className="text-2xl text-neutral-900">{s.value}</div>
                      <div className="text-xs text-neutral-500">{s.label}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Templates */}
              <div className="bg-white rounded-xl border border-neutral-100 shadow-sm overflow-hidden">
                <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-100">
                  <div>
                    <div className="text-sm font-bold text-neutral-900">Notification Templates</div>
                    <div className="text-xs text-neutral-400">Manage automated email and SMS messages</div>
                  </div>
                  <button onClick={() => setTemplateModal({ isOpen: true, isEdit: false, data: { name: "", type: "Email + SMS", active: true } })} className="px-3 py-1.5 bg-emerald-700 text-white rounded-lg text-xs font-bold hover:bg-emerald-600 flex items-center gap-1.5">
                    <Plus className="w-3.5 h-3.5" /> Add Template
                  </button>
                </div>
                <div className="divide-y divide-neutral-50">
                  {templates.map(t => (
                    <div key={t.id} className="flex items-center gap-4 px-6 py-4 hover:bg-neutral-50 transition-colors">
                      <div className="flex-1">
                        <div className="text-sm font-bold text-neutral-900">{t.name}</div>
                        <div className="text-xs text-neutral-400 mt-0.5">{t.type} · Last sent: {t.lastSent}</div>
                      </div>
                      <button
                        onClick={() => setTemplates(prev => prev.map(tp => tp.id === t.id ? { ...tp, active: !tp.active } : tp))}
                        className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-all ${t.active ? "bg-emerald-100 text-emerald-700" : "bg-neutral-100 text-neutral-500"}`}
                      >
                        {t.active ? <ToggleRight className="w-4 h-4" /> : <ToggleLeft className="w-4 h-4" />}
                        {t.active ? "Active" : "Inactive"}
                      </button>
                      <div className="flex gap-1">
                        <button onClick={() => setTemplateModal({ isOpen: true, isEdit: true, data: t })} className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-blue-50 text-neutral-400 hover:text-blue-600"><Edit2 className="w-3.5 h-3.5" /></button>
                        <button onClick={() => {
                          setTemplates(prev => prev.filter(tp => tp.id !== t.id));
                          toast.success("Template deleted successfully");
                        }} className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-red-50 text-neutral-400 hover:text-red-500"><Trash2 className="w-3.5 h-3.5" /></button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bulk Send */}
              <div className="bg-white rounded-xl border border-neutral-100 p-6 shadow-sm">
                <div className="text-sm font-bold text-neutral-900 mb-4">Bulk Notification Trigger</div>
                <div className="grid sm:grid-cols-3 gap-4">
                  {[
                    { label: "Notify All Shortlisted", count: shortlisted, color: "bg-emerald-700", desc: "Send shortlist notifications" },
                    { label: "Notify All Rejected", count: rejected, color: "bg-red-600", desc: "Send rejection notices" },
                    { label: "Document Reminders", count: 28, color: "bg-amber-600", desc: "Remind pending document uploads" },
                  ].map((btn, i) => (
                    <div key={i} className="p-4 bg-neutral-50 rounded-xl border border-neutral-100">
                      <div className="text-sm font-bold text-neutral-900 mb-1">{btn.label}</div>
                      <div className="text-xs text-neutral-400 mb-3">{btn.desc} · <strong>{btn.count}</strong> recipients</div>
                      <button className={`w-full py-2 ${btn.color} text-white rounded-lg text-xs font-bold hover:opacity-90 transition-all flex items-center justify-center gap-1.5`}>
                        <Send className="w-3 h-3" /> Send Now
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ======================== USERS & ROLES ======================== */}
          {activeTab === "users" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="text-sm text-neutral-500">{adminUsers.length} admin users</div>
                <button onClick={() => setUserModal({ isOpen: true, isEdit: false, data: { name: "", email: "", role: "Reviewer", status: "Active" } })} className="px-4 py-2 bg-emerald-700 text-white rounded-lg text-sm font-bold hover:bg-emerald-600 flex items-center gap-2">
                  <Plus className="w-4 h-4" /> Add Admin User
                </button>
              </div>
              <div className="bg-white rounded-xl border border-neutral-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-neutral-50 border-b border-neutral-100">
                        {["User", "Role", "Status", "Last Login", "Actions"].map(h => (
                          <th key={h} className="px-5 py-3 text-left text-xs font-bold text-neutral-400 uppercase tracking-wider">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-50">
                      {adminUsers.map((user, i) => (
                        <tr key={i} className="hover:bg-neutral-50 transition-colors">
                          <td className="px-5 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center text-xs font-bold text-emerald-700">
                                {user.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                              </div>
                              <div>
                                <div className="font-medium text-neutral-900">{user.name}</div>
                                <div className="text-xs text-neutral-400">{user.email}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-5 py-4">
                            <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${user.role === "Super Admin" ? "bg-purple-100 text-purple-700"
                              : user.role === "State Admin" ? "bg-blue-100 text-blue-700"
                                : user.role === "Reviewer" ? "bg-amber-100 text-amber-700"
                                  : "bg-neutral-100 text-neutral-600"
                              }`}>{user.role}</span>
                          </td>
                          <td className="px-5 py-4">
                            <span className={`flex items-center gap-1.5 text-xs font-medium ${user.status === "Active" ? "text-emerald-600" : "text-neutral-400"}`}>
                              <div className={`w-1.5 h-1.5 rounded-full ${user.status === "Active" ? "bg-emerald-500" : "bg-neutral-300"}`} />
                              {user.status}
                            </span>
                          </td>
                          <td className="px-5 py-4 text-neutral-500 text-xs">{user.lastLogin}</td>
                          <td className="px-5 py-4">
                            <div className="flex gap-1">
                              <button onClick={() => setUserModal({ isOpen: true, isEdit: true, data: user })} className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-blue-50 text-neutral-400 hover:text-blue-600"><Edit2 className="w-3.5 h-3.5" /></button>
                              <button onClick={() => {
                                setAdminUsers(prev => prev.filter(u => u.email !== user.email));
                                toast.success("User removed successfully");
                              }} className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-red-50 text-neutral-400 hover:text-red-500"><Trash2 className="w-3.5 h-3.5" /></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Role Permissions */}
              <div className="bg-white rounded-xl border border-neutral-100 p-6 shadow-sm">
                <div className="text-sm font-bold text-neutral-900 mb-4">Role Permissions Matrix</div>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="border-b border-neutral-100">
                        <th className="text-left py-2 px-3 font-bold text-neutral-400 uppercase tracking-wider">Permission</th>
                        {["Super Admin", "State Admin", "Reviewer", "Viewer"].map(r => (
                          <th key={r} className="text-center py-2 px-3 font-bold text-neutral-400 uppercase tracking-wider">{r}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-50">
                      {[
                        { perm: "View Applications", sa: true, sta: true, rev: true, vw: true },
                        { perm: "Change Application Status", sa: true, sta: true, rev: true, vw: false },
                        { perm: "Manage Quotas", sa: true, sta: true, rev: false, vw: false },
                        { perm: "Send Notifications", sa: true, sta: true, rev: false, vw: false },
                        { perm: "Export Reports", sa: true, sta: true, rev: true, vw: false },
                        { perm: "Manage Admin Users", sa: true, sta: false, rev: false, vw: false },
                        { perm: "System Settings", sa: true, sta: false, rev: false, vw: false },
                      ].map((row, i) => (
                        <tr key={i} className="hover:bg-neutral-50">
                          <td className="py-2.5 px-3 text-neutral-700 font-medium">{row.perm}</td>
                          {[row.sa, row.sta, row.rev, row.vw].map((has, j) => (
                            <td key={j} className="py-2.5 px-3 text-center">
                              {has ? <CheckCircle2 className="w-4 h-4 text-emerald-500 mx-auto" /> : <XCircle className="w-4 h-4 text-neutral-200 mx-auto" />}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ======================== SETTINGS ======================== */}
          {activeTab === "settings" && (
            <div className="space-y-6 max-w-2xl">
              <div className="bg-white rounded-xl border border-neutral-100 p-6 shadow-sm">
                <div className="flex items-center justify-between mb-5">
                  <div className="text-sm font-bold text-neutral-900">Priority Trades Management</div>
                  <button onClick={() => setTradeModal({ isOpen: true, data: { name: "", active: true, quota: 0, color: "bg-emerald-500" } })} className="px-3 py-1.5 bg-emerald-700 text-white rounded-lg text-xs font-bold hover:bg-emerald-600 flex items-center gap-1.5"><Plus className="w-3.5 h-3.5" /> Add Trade</button>
                </div>
                <div className="space-y-3">
                  {trades.map((trade, i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-neutral-50 rounded-xl border border-neutral-100">
                      <span className="text-sm font-medium text-neutral-800">{trade.name}</span>
                      <div className="flex items-center gap-3">
                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${trade.active ? "bg-emerald-100 text-emerald-700" : "bg-neutral-200 text-neutral-500"}`}>
                          {trade.active ? "Active" : "Inactive"}
                        </span>
                        <button
                          onClick={() => {
                            setTrades(prev => prev.map(t => t.name === trade.name ? { ...t, active: !t.active } : t));
                            toast.success(`Trade ${trade.active ? 'deactivated' : 'activated'}`);
                          }}
                          className="text-xs text-neutral-400 hover:text-neutral-600 underline"
                        >
                          {trade.active ? "Deactivate" : "Activate"}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl border border-neutral-100 p-6 shadow-sm">
                <div className="text-sm font-bold text-neutral-900 mb-5">Pilot Configuration</div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-xl border border-neutral-100">
                    <div>
                      <div className="text-sm font-medium text-neutral-900">Active Program Scope</div>
                      <div className="text-xs text-neutral-400">Currently active for all Nigerian states</div>
                    </div>
                    <span className="font-bold text-sm text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg">All States</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-xl border border-neutral-100">
                    <div>
                      <div className="text-sm font-medium text-neutral-900">Application Portal Status</div>
                      <div className="text-xs text-neutral-400">Toggle to open/close the public application portal</div>
                    </div>
                    <span className="flex items-center gap-2 font-bold text-sm text-emerald-700">
                      <span className="flex h-2 w-2 bg-emerald-500 rounded-full animate-pulse" />
                      Open
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-xl border border-neutral-100">
                    <div>
                      <div className="text-sm font-medium text-neutral-900">Age Range</div>
                      <div className="text-xs text-neutral-400">Eligibility age requirement</div>
                    </div>
                    <span className="font-bold text-sm text-neutral-700">18 – 45 years</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-neutral-100 p-6 shadow-sm">
                <div className="text-sm font-bold text-neutral-900 mb-2">Audit Log</div>
                <div className="text-xs text-neutral-400 mb-4">Recent system activity (FR-07, Audit Logging)</div>
                <div className="space-y-2.5">
                  {auditLogs.map((log, i) => (
                    <div key={i} className="flex items-start gap-3 text-xs p-3 bg-neutral-50 rounded-lg border border-neutral-100">
                      <div className="w-6 h-6 bg-neutral-200 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Clock className="w-3 h-3 text-neutral-500" />
                      </div>
                      <div className="flex-1">
                        <div className="text-neutral-700 font-medium">{log.action}</div>
                        <div className="text-neutral-400">By <strong>{log.user}</strong> · Target: {log.target}</div>
                      </div>
                      <div className="text-neutral-400 flex-shrink-0">{log.time}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ---- Application Detail / Status Change Modal ---- */}
      {selectedApp && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-end" onClick={() => { setSelectedApp(null); setStatusChangeModal(false); }}>
          <div
            className="bg-white h-full w-full max-w-lg overflow-y-auto shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-6 border-b border-neutral-100 sticky top-0 bg-white z-10">
              <div>
                <div className="text-base font-bold text-neutral-900">Applicant Profile</div>
                <div className="text-xs text-neutral-400 font-mono">{selectedApp.id}</div>
              </div>
              <button onClick={() => { setSelectedApp(null); setStatusChangeModal(false); }} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-neutral-100 text-neutral-500">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Header Info */}
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-700 font-bold text-xl flex-shrink-0">
                  {selectedApp.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                </div>
                <div>
                  <div className="text-lg font-bold text-neutral-900">{selectedApp.name}</div>
                  <div className="text-sm text-neutral-400">{selectedApp.phone}</div>
                  <div className="flex items-center gap-2 mt-2">
                    <StatusBadge status={selectedApp.status as Status} />
                    <VerifyBadge status={selectedApp.ninBvn as VerifyStatus} />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                {[
                  { label: "Trade", value: selectedApp.trade },
                  { label: "LGA", value: selectedApp.lga },
                  { label: "Application Date", value: selectedApp.date },
                  { label: "Current Status", value: selectedApp.status },
                ].map((d, i) => (
                  <div key={i} className="p-3 bg-neutral-50 rounded-lg border border-neutral-100">
                    <div className="text-neutral-400 text-xs mb-0.5">{d.label}</div>
                    <div className="text-neutral-900 font-medium">{d.value}</div>
                  </div>
                ))}
              </div>

              {/* Status Change */}
              <div className="border-t border-neutral-100 pt-5">
                <div className="text-sm font-bold text-neutral-900 mb-3">Update Application Status</div>
                <div className="grid grid-cols-2 gap-2 mb-4">
                  {(["Applied", "Shortlisted", "Rejected", "On-Hold"] as Status[]).map(s => (
                    <button
                      key={s}
                      onClick={() => setNewStatus(s)}
                      className={`py-2 rounded-lg text-sm font-medium border-2 transition-all ${newStatus === s ? "border-emerald-600 bg-emerald-50 text-emerald-700" : "border-neutral-100 text-neutral-500 hover:border-neutral-200"
                        }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm text-neutral-700 font-medium">Decision Comment <span className="text-red-500">*</span></label>
                  <textarea
                    value={statusComment}
                    onChange={e => setStatusComment(e.target.value)}
                    rows={3}
                    placeholder="Provide a reason for this status change (required)..."
                    className="w-full p-3 border border-neutral-200 rounded-lg text-sm outline-none focus:border-emerald-600 resize-none transition-all"
                  />
                  <p className="text-xs text-neutral-400">This comment will be logged in the audit trail.</p>
                </div>
                <button
                  onClick={() => {
                    if (!statusComment.trim()) { alert("A comment is required."); return; }

                    if (selectedApp) {
                      setApplications(prev => prev.map(app =>
                        app.id === selectedApp.id ? { ...app, status: newStatus } : app
                      ));
                      setAuditLogs(prev => [
                        { action: `Status changed to ${newStatus}`, user: "Super Admin", target: selectedApp.id, time: new Date().toISOString().replace('T', ' ').slice(0, 16) },
                        ...prev
                      ]);
                    }

                    setSelectedApp(null);
                    setStatusChangeModal(false);
                    setStatusComment("");
                  }}
                  className="w-full mt-4 py-3 bg-emerald-700 text-white rounded-lg font-bold text-sm hover:bg-emerald-600 transition-all"
                >
                  Confirm Status Change
                </button>
              </div>

              {/* Documents */}
              <div className="border-t border-neutral-100 pt-5">
                <div className="text-sm font-bold text-neutral-900 mb-3">Uploaded Documents</div>
                {["Passport Photograph", "Proof of Residence"].map((doc, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg border border-neutral-100 mb-2">
                    <div className="flex items-center gap-2 text-sm text-neutral-700">
                      <FileText className="w-4 h-4 text-emerald-600" /> {doc}
                    </div>
                    <button className="text-xs text-blue-600 font-bold hover:underline flex items-center gap-1">
                      <Eye className="w-3 h-3" /> Preview
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ---- Template Modal ---- */}
      {templateModal.isOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setTemplateModal({ isOpen: false, isEdit: false, data: null })}>
          <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between p-5 border-b border-neutral-100">
              <div className="font-bold text-neutral-900">{templateModal.isEdit ? "Edit Template" : "New Template"}</div>
              <button onClick={() => setTemplateModal({ isOpen: false, isEdit: false, data: null })} className="text-neutral-400 hover:text-neutral-600"><X className="w-5 h-5" /></button>
            </div>
            <div className="p-5 space-y-4 text-sm">
              <div className="space-y-1.5">
                <label className="text-neutral-700 font-medium">Template Name</label>
                <input value={templateModal.data.name} onChange={e => setTemplateModal(prev => ({ ...prev, data: { ...prev.data, name: e.target.value } }))} className="w-full p-2.5 border border-neutral-200 rounded-lg outline-none focus:border-emerald-600" />
              </div>
              <div className="space-y-1.5">
                <label className="text-neutral-700 font-medium">Delivery Method</label>
                <select value={templateModal.data.type} onChange={e => setTemplateModal(prev => ({ ...prev, data: { ...prev.data, type: e.target.value } }))} className="w-full p-2.5 border border-neutral-200 rounded-lg outline-none focus:border-emerald-600 bg-white">
                  <option>Email + SMS</option>
                  <option>Email only</option>
                  <option>SMS only</option>
                </select>
              </div>
              <button
                onClick={() => {
                  if (!templateModal.data.name) return toast.error("Name is required");
                  if (templateModal.isEdit) {
                    setTemplates(prev => prev.map(t => t.id === templateModal.data.id ? templateModal.data : t));
                  } else {
                    setTemplates(prev => [...prev, { ...templateModal.data, id: Date.now(), lastSent: "–" }]);
                  }
                  setTemplateModal({ isOpen: false, isEdit: false, data: null });
                  toast.success(`Template ${templateModal.isEdit ? 'updated' : 'created'} successfully`);
                }}
                className="w-full py-2.5 bg-emerald-700 text-white rounded-lg font-bold hover:bg-emerald-600 transition-all mt-2"
              >
                Save Template
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ---- User Modal ---- */}
      {userModal.isOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setUserModal({ isOpen: false, isEdit: false, data: null })}>
          <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between p-5 border-b border-neutral-100">
              <div className="font-bold text-neutral-900">{userModal.isEdit ? "Edit User Role" : "Add Admin User"}</div>
              <button onClick={() => setUserModal({ isOpen: false, isEdit: false, data: null })} className="text-neutral-400 hover:text-neutral-600"><X className="w-5 h-5" /></button>
            </div>
            <div className="p-5 space-y-4 text-sm">
              <div className="space-y-1.5">
                <label className="text-neutral-700 font-medium">Full Name</label>
                <input disabled={userModal.isEdit} value={userModal.data.name} onChange={e => setUserModal(prev => ({ ...prev, data: { ...prev.data, name: e.target.value } }))} className="w-full p-2.5 border border-neutral-200 rounded-lg outline-none focus:border-emerald-600 disabled:bg-neutral-50 disabled:text-neutral-400" />
              </div>
              <div className="space-y-1.5">
                <label className="text-neutral-700 font-medium">Email Address</label>
                <input disabled={userModal.isEdit} value={userModal.data.email} onChange={e => setUserModal(prev => ({ ...prev, data: { ...prev.data, email: e.target.value } }))} className="w-full p-2.5 border border-neutral-200 rounded-lg outline-none focus:border-emerald-600 disabled:bg-neutral-50 disabled:text-neutral-400" />
              </div>
              <div className="space-y-1.5">
                <label className="text-neutral-700 font-medium">Assign Role</label>
                <select value={userModal.data.role} onChange={e => setUserModal(prev => ({ ...prev, data: { ...prev.data, role: e.target.value } }))} className="w-full p-2.5 border border-neutral-200 rounded-lg outline-none focus:border-emerald-600 bg-white">
                  <option>Super Admin</option>
                  <option>State Admin</option>
                  <option>Reviewer</option>
                  <option>Viewer</option>
                </select>
              </div>
              <button
                onClick={() => {
                  if (!userModal.data.name || !userModal.data.email) return toast.error("Name and email are required");
                  if (userModal.isEdit) {
                    setAdminUsers(prev => prev.map(u => u.email === userModal.data.email ? userModal.data : u));
                  } else {
                    setAdminUsers(prev => [{ ...userModal.data, lastLogin: "–" }, ...prev]);
                  }
                  setUserModal({ isOpen: false, isEdit: false, data: null });
                  toast.success(`User ${userModal.isEdit ? 'updated' : 'added'} successfully`);
                }}
                className="w-full py-2.5 bg-emerald-700 text-white rounded-lg font-bold hover:bg-emerald-600 transition-all mt-2"
              >
                {userModal.isEdit ? "Save Changes" : "Create User"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ---- Trade Modal ---- */}
      {tradeModal.isOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setTradeModal({ isOpen: false, data: null })}>
          <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between p-5 border-b border-neutral-100">
              <div className="font-bold text-neutral-900">Add Priority Trade</div>
              <button onClick={() => setTradeModal({ isOpen: false, data: null })} className="text-neutral-400 hover:text-neutral-600"><X className="w-5 h-5" /></button>
            </div>
            <div className="p-5 space-y-4 text-sm">
              <div className="space-y-1.5">
                <label className="text-neutral-700 font-medium">Trade Name</label>
                <input value={tradeModal.data.name} onChange={e => setTradeModal(prev => ({ ...prev, data: { ...prev.data, name: e.target.value } }))} className="w-full p-2.5 border border-neutral-200 rounded-lg outline-none focus:border-emerald-600" placeholder="e.g. Graphic Design" />
              </div>
              <button
                onClick={() => {
                  if (!tradeModal.data.name) return toast.error("Name is required");
                  setTrades(prev => [...prev, tradeModal.data]);
                  setTradeModal({ isOpen: false, data: null });
                  toast.success(`Trade added successfully`);
                }}
                className="w-full py-2.5 bg-emerald-700 text-white rounded-lg font-bold hover:bg-emerald-600 transition-all mt-2"
              >
                Add Track
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
