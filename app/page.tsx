"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  TrendingUp,
  TrendingDown,
  Users,
  DollarSign,
  Target,
  Search,
  Filter,
  Download,
  Moon,
  Sun,
  Bell,
  Menu,
  Home,
  Settings,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  ArrowUpDown,
  MoreHorizontal,
  Activity,
  PieChart,
} from "lucide-react"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Tooltip,
} from "recharts"

import { exportToCSV, exportToPDF, exportMetricsToCSV, exportDashboardToPDF } from "../utils/export-utils"

// More realistic sample data
const revenueData = [
  { month: "Jan", revenue: 124500, users: 8420, conversions: 342, ctr: 3.2 },
  { month: "Feb", revenue: 138200, users: 9180, conversions: 398, ctr: 3.8 },
  { month: "Mar", revenue: 142800, users: 9650, conversions: 425, ctr: 4.1 },
  { month: "Apr", revenue: 156300, users: 10200, conversions: 467, ctr: 4.3 },
  { month: "May", revenue: 149700, users: 9890, conversions: 441, ctr: 4.0 },
  { month: "Jun", revenue: 167400, users: 11250, conversions: 523, ctr: 4.6 },
]

const channelData = [
  { channel: "Google Ads", spend: 45200, conversions: 892, revenue: 156800, roas: 3.47 },
  { channel: "Facebook Ads", spend: 32100, conversions: 654, revenue: 98400, roas: 3.07 },
  { channel: "Instagram", spend: 18900, conversions: 387, revenue: 67200, roas: 3.56 },
  { channel: "LinkedIn", spend: 12400, conversions: 198, revenue: 42300, roas: 3.41 },
  { channel: "YouTube", spend: 8700, conversions: 156, revenue: 28900, roas: 3.32 },
]

const budgetData = [
  { name: "Google Ads", value: 38.2, color: "#4285f4" },
  { name: "Facebook Ads", value: 27.1, color: "#1877f2" },
  { name: "Instagram", value: 16.0, color: "#e4405f" },
  { name: "LinkedIn", value: 10.5, color: "#0077b5" },
  { name: "YouTube", value: 8.2, color: "#ff0000" },
]

const tableData = [
  {
    id: 1,
    campaign: "Q2 Summer Collection Launch",
    channel: "Google Ads",
    spend: 12420,
    impressions: 245000,
    clicks: 8940,
    conversions: 187,
    ctr: 3.65,
    status: "Active",
    lastUpdated: "2 hours ago",
  },
  {
    id: 2,
    campaign: "Brand Awareness - Fashion Week",
    channel: "Facebook Ads",
    spend: 8900,
    impressions: 189000,
    clicks: 5670,
    conversions: 134,
    ctr: 3.0,
    status: "Active",
    lastUpdated: "4 hours ago",
  },
  {
    id: 3,
    campaign: "Retargeting - Cart Abandoners",
    channel: "Instagram",
    spend: 5600,
    impressions: 98000,
    clicks: 4200,
    conversions: 156,
    ctr: 4.29,
    status: "Active",
    lastUpdated: "1 hour ago",
  },
  {
    id: 4,
    campaign: "B2B Lead Generation",
    channel: "LinkedIn",
    spend: 3200,
    impressions: 45000,
    clicks: 1890,
    conversions: 67,
    ctr: 4.2,
    status: "Paused",
    lastUpdated: "1 day ago",
  },
  {
    id: 5,
    campaign: "Video Product Demos",
    channel: "YouTube",
    spend: 2800,
    impressions: 67000,
    clicks: 2340,
    conversions: 89,
    ctr: 3.49,
    status: "Active",
    lastUpdated: "6 hours ago",
  },
]

// Professional custom tooltip components
const CustomTooltip = ({ active, payload, label, darkMode }: any) => {
  if (active && payload && payload.length) {
    return (
      <div
        className={`p-4 rounded-lg border shadow-xl backdrop-blur-sm ${
          darkMode ? "bg-gray-900/95 border-gray-700 text-white" : "bg-white/95 border-gray-200 text-gray-900"
        }`}
      >
        <p className="font-semibold mb-2">{label}</p>
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center justify-between gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }} />
              <span>{entry.name}:</span>
            </div>
            <span className="font-medium">
              {entry.name === "Revenue" || entry.name === "Spend"
                ? `$${entry.value.toLocaleString()}`
                : entry.value.toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    )
  }
  return null
}

const PieTooltip = ({ active, payload, darkMode }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload
    return (
      <div
        className={`px-3 py-2 rounded-lg border shadow-lg backdrop-blur-sm z-50 ${
          darkMode ? "bg-gray-900/95 border-gray-700 text-white" : "bg-white/95 border-gray-200 text-gray-900"
        }`}
      >
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: data.color }} />
          <span className="font-semibold text-sm">{data.name}</span>
        </div>
        <div className="text-sm font-medium mt-1">{data.value}%</div>
      </div>
    )
  }
  return null
}

export default function AnalyticsDashboard() {
  const [darkMode, setDarkMode] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(5)
  const [searchTerm, setSearchTerm] = useState("")
  const [sortField, setSortField] = useState("")
  const [sortDirection, setSortDirection] = useState("asc")

  const toggleDarkMode = () => setDarkMode(!darkMode)
  const toggleSidebar = () => setSidebarCollapsed(!sidebarCollapsed)

  // Filter and sort table data
  const filteredData = tableData.filter(
    (item) =>
      item.campaign.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.channel.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortField) return 0
    const aVal = a[sortField as keyof typeof a]
    const bVal = b[sortField as keyof typeof b]
    if (sortDirection === "asc") {
      return aVal > bVal ? 1 : -1
    }
    return aVal < bVal ? 1 : -1
  })

  const paginatedData = sortedData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
  const totalPages = Math.ceil(sortedData.length / itemsPerPage)

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  const handleExportCSV = () => {
    exportToCSV(sortedData, "campaign-performance")
  }

  const handleExportPDF = () => {
    exportToPDF(sortedData, "campaign-performance-report")
  }

  const handleDashboardExportCSV = () => {
    exportMetricsToCSV()
  }

  const handleDashboardExportPDF = () => {
    exportDashboardToPDF()
  }

  const SidebarContent = () => (
    <nav className={`p-4 space-y-1 ${sidebarCollapsed ? "px-2" : ""}`}>
      <div
        className={`flex items-center gap-3 rounded-lg font-medium transition-all duration-200 ${
          sidebarCollapsed ? "justify-center p-3 w-12 h-12 mx-auto" : "px-3 py-2.5"
        } ${
          darkMode
            ? "text-blue-400 bg-blue-500/10 border border-blue-500/20"
            : "text-blue-600 bg-blue-50 border border-blue-200"
        }`}
      >
        <Home className={`${sidebarCollapsed ? "h-7 w-7" : "h-5 w-5"}`} />
        {!sidebarCollapsed && <span>Dashboard</span>}
      </div>
      <div
        className={`flex items-center gap-3 rounded-lg cursor-pointer transition-all duration-200 ${
          sidebarCollapsed ? "justify-center p-3 w-12 h-12 mx-auto" : "px-3 py-2.5"
        } ${
          darkMode
            ? "text-gray-300 hover:text-white hover:bg-gray-800"
            : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
        }`}
      >
        <Activity className={`${sidebarCollapsed ? "h-7 w-7" : "h-5 w-5"}`} />
        {!sidebarCollapsed && <span>Analytics</span>}
      </div>
      <div
        className={`flex items-center gap-3 rounded-lg cursor-pointer transition-all duration-200 ${
          sidebarCollapsed ? "justify-center p-3 w-12 h-12 mx-auto" : "px-3 py-2.5"
        } ${
          darkMode
            ? "text-gray-300 hover:text-white hover:bg-gray-800"
            : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
        }`}
      >
        <Target className={`${sidebarCollapsed ? "h-7 w-7" : "h-5 w-5"}`} />
        {!sidebarCollapsed && <span>Campaigns</span>}
      </div>
      <div
        className={`flex items-center gap-3 rounded-lg cursor-pointer transition-all duration-200 ${
          sidebarCollapsed ? "justify-center p-3 w-12 h-12 mx-auto" : "px-3 py-2.5"
        } ${
          darkMode
            ? "text-gray-300 hover:text-white hover:bg-gray-800"
            : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
        }`}
      >
        <PieChart className={`${sidebarCollapsed ? "h-7 w-7" : "h-5 w-5"}`} />
        {!sidebarCollapsed && <span>Reports</span>}
      </div>
      <div className="pt-4 mt-4">
        <div
          className={`h-px mb-4 ${darkMode ? "bg-gradient-to-r from-transparent via-gray-700 to-transparent" : "bg-gradient-to-r from-transparent via-gray-300 to-transparent"}`}
        />
        <div
          className={`flex items-center gap-3 rounded-lg cursor-pointer transition-all duration-200 ${
            sidebarCollapsed ? "justify-center p-3 w-12 h-12 mx-auto" : "px-3 py-2.5"
          } ${
            darkMode
              ? "text-gray-300 hover:text-white hover:bg-gray-800"
              : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
          }`}
        >
          <Settings className={`${sidebarCollapsed ? "h-7 w-7" : "h-5 w-5"}`} />
          {!sidebarCollapsed && <span>Settings</span>}
        </div>
        <div
          className={`flex items-center gap-3 rounded-lg cursor-pointer transition-all duration-200 ${
            sidebarCollapsed ? "justify-center p-3 w-12 h-12 mx-auto mb-2" : "px-3 py-2.5"
          } ${
            darkMode
              ? "text-gray-300 hover:text-white hover:bg-gray-800"
              : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
          }`}
        >
          <HelpCircle className={`${sidebarCollapsed ? "h-7 w-7" : "h-5 w-5"}`} />
          {!sidebarCollapsed && <span>Help & Support</span>}
        </div>
      </div>
    </nav>
  )

  return (
    <div className={`min-h-screen ${darkMode ? "dark bg-gray-950" : "bg-gray-50"}`}>
      {/* Header */}
      <header
        className={`h-16 border-b sticky top-0 z-50 backdrop-blur-sm ${
          darkMode ? "bg-gray-950/95 border-gray-800" : "bg-white/95 border-gray-200"
        }`}
      >
        <div className="flex items-center justify-between px-4 sm:px-6 h-full">
          <div className="flex items-center gap-2 sm:gap-4 min-w-0 flex-1">
            {/* Mobile menu trigger */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className={`lg:hidden ${darkMode ? "text-gray-300 hover:text-white" : ""}`}
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className={`w-64 p-0 ${darkMode ? "bg-gray-950 border-gray-800" : "bg-white"}`}>
                <div className="flex items-center justify-between p-4 pt-5 pb-3">
                  <div className="flex items-center gap-2">
                    <img src="/admybrand-logo.svg" alt="ADmyBRAND" className="h-6 w-auto" />
                  </div>
                </div>
                <div
                  className={`h-px mx-4 mb-2 ${darkMode ? "bg-gradient-to-r from-transparent via-gray-700 to-transparent" : "bg-gradient-to-r from-transparent via-gray-300 to-transparent"}`}
                />
                <SidebarContent />
              </SheetContent>
            </Sheet>

            {/* Desktop sidebar toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleSidebar}
              className={`hidden lg:flex ${darkMode ? "text-gray-300 hover:text-white" : ""}`}
            >
              <Menu className="h-5 w-5" />
            </Button>

            {/* Logo and brand - responsive sizing */}
            <div className="flex items-center gap-2 sm:gap-3 min-w-0">
              <img src="/admybrand-logo.svg" alt="ADmyBRAND" className="h-5 sm:h-6 w-auto flex-shrink-0" />
              <div className="min-w-0">
                <span className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"} whitespace-nowrap`}>
                  Insights
                </span>
              </div>
            </div>
          </div>

          {/* Desktop Navigation - hidden on mobile/tablet */}

          {/* Right side controls - responsive */}
          <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-4 w-4 sm:h-5 sm:w-5" />
              <span className="absolute -top-1 -right-1 w-2 h-2 sm:w-3 sm:h-3 bg-red-500 rounded-full text-xs"></span>
            </Button>
            <Button variant="ghost" size="icon" onClick={toggleDarkMode}>
              {darkMode ? <Sun className="h-4 w-4 sm:h-5 sm:w-5" /> : <Moon className="h-4 w-4 sm:h-5 sm:w-5" />}
            </Button>
            <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center ml-1 sm:ml-2">
              <span className="text-white font-medium text-xs sm:text-sm">JD</span>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Desktop Sidebar */}
        <aside
          className={`hidden lg:block transition-all duration-300 sticky top-16 h-[calc(100vh-4rem)] border-r ${
            sidebarCollapsed ? "w-16" : "w-64"
          } ${darkMode ? "bg-gray-950 border-gray-800" : "bg-white border-gray-200"}`}
        >
          <SidebarContent />
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-3 sm:p-4 lg:p-6 space-y-4 sm:space-y-6 max-w-full overflow-hidden">
          {/* Page Header */}
          <div className="flex flex-col gap-3 sm:gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className={`text-xl sm:text-2xl lg:text-3xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>
                Marketing Dashboard
              </h1>
              <p className={`text-xs sm:text-sm ${darkMode ? "text-gray-400" : "text-gray-600"} mt-1`}>
                Track your campaign performance and ROI in real-time
              </p>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className={`text-xs sm:text-sm ${darkMode ? "border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white" : ""}`}
                  >
                    <Download className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                    Export
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={handleDashboardExportPDF}>Export Dashboard to PDF</DropdownMenuItem>
                  <DropdownMenuItem onClick={handleDashboardExportCSV}>Export Metrics to CSV</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button size="sm" className="text-xs sm:text-sm">
                <Target className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                New Campaign
              </Button>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <Card
              className={`transition-all duration-200 hover:shadow-lg hover:-translate-y-1 ${
                darkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"
              }`}
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className={`text-sm font-medium ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                  Total Revenue
                </CardTitle>
                <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
                  <DollarSign className="h-4 w-4 text-green-600 dark:text-green-400" />
                </div>
              </CardHeader>
              <CardContent>
                <div className={`text-2xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>$1,247,890</div>
                <div className="flex items-center gap-1 text-sm mt-1">
                  <TrendingUp className="h-4 w-4 text-green-500" />
                  <span className="text-green-500 font-medium">+18.2%</span>
                  <span className={`${darkMode ? "text-gray-400" : "text-gray-500"}`}>vs last month</span>
                </div>
              </CardContent>
            </Card>

            <Card
              className={`transition-all duration-200 hover:shadow-lg hover:-translate-y-1 ${
                darkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"
              }`}
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className={`text-sm font-medium ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                  Active Users
                </CardTitle>
                <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                  <Users className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                </div>
              </CardHeader>
              <CardContent>
                <div className={`text-2xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>58,590</div>
                <div className="flex items-center gap-1 text-sm mt-1">
                  <TrendingUp className="h-4 w-4 text-green-500" />
                  <span className="text-green-500 font-medium">+12.5%</span>
                  <span className={`${darkMode ? "text-gray-400" : "text-gray-500"}`}>vs last month</span>
                </div>
              </CardContent>
            </Card>

            <Card
              className={`transition-all duration-200 hover:shadow-lg hover:-translate-y-1 ${
                darkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"
              }`}
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className={`text-sm font-medium ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                  Conversions
                </CardTitle>
                <div className="p-2 bg-orange-100 dark:bg-orange-900/20 rounded-lg">
                  <Target className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                </div>
              </CardHeader>
              <CardContent>
                <div className={`text-2xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>2,486</div>
                <div className="flex items-center gap-1 text-sm mt-1">
                  <TrendingDown className="h-4 w-4 text-red-500" />
                  <span className="text-red-500 font-medium">-3.1%</span>
                  <span className={`${darkMode ? "text-gray-400" : "text-gray-500"}`}>vs last month</span>
                </div>
              </CardContent>
            </Card>

            <Card
              className={`transition-all duration-200 hover:shadow-lg hover:-translate-y-1 ${
                darkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"
              }`}
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className={`text-sm font-medium ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                  Avg. ROAS
                </CardTitle>
                <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
                  <TrendingUp className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                </div>
              </CardHeader>
              <CardContent>
                <div className={`text-2xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>3.42x</div>
                <div className="flex items-center gap-1 text-sm mt-1">
                  <TrendingUp className="h-4 w-4 text-green-500" />
                  <span className="text-green-500 font-medium">+8.7%</span>
                  <span className={`${darkMode ? "text-gray-400" : "text-gray-500"}`}>vs last month</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {/* Line Chart */}
            <Card className={`${darkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"}`}>
              <CardHeader>
                <CardTitle className={`${darkMode ? "text-white" : "text-gray-900"}`}>Revenue Trends</CardTitle>
                <CardDescription className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                  Monthly revenue and user growth over the last 6 months
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] sm:h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={revenueData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? "#374151" : "#e5e7eb"} />
                      <XAxis dataKey="month" stroke={darkMode ? "#9ca3af" : "#6b7280"} fontSize={12} />
                      <YAxis stroke={darkMode ? "#9ca3af" : "#6b7280"} fontSize={12} />
                      <Tooltip content={<CustomTooltip darkMode={darkMode} />} />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="revenue"
                        stroke="#4285f4"
                        strokeWidth={3}
                        dot={{ fill: "#4285f4", strokeWidth: 2, r: 4 }}
                        activeDot={{ r: 6, stroke: "#4285f4", strokeWidth: 2 }}
                        name="Revenue"
                      />
                      <Line
                        type="monotone"
                        dataKey="users"
                        stroke="#34a853"
                        strokeWidth={3}
                        dot={{ fill: "#34a853", strokeWidth: 2, r: 4 }}
                        activeDot={{ r: 6, stroke: "#34a853", strokeWidth: 2 }}
                        name="Users"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Bar Chart */}
            <Card className={`${darkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"}`}>
              <CardHeader>
                <CardTitle className={`${darkMode ? "text-white" : "text-gray-900"}`}>Channel Performance</CardTitle>
                <CardDescription className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                  Ad spend vs revenue by marketing channel
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] sm:h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={channelData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? "#374151" : "#e5e7eb"} />
                      <XAxis
                        dataKey="channel"
                        stroke={darkMode ? "#9ca3af" : "#6b7280"}
                        fontSize={11}
                        angle={-45}
                        textAnchor="end"
                        height={60}
                      />
                      <YAxis stroke={darkMode ? "#9ca3af" : "#6b7280"} fontSize={12} />
                      <Tooltip content={<CustomTooltip darkMode={darkMode} />} />
                      <Legend />
                      <Bar dataKey="spend" fill="#ea4335" radius={[4, 4, 0, 0]} name="Spend" />
                      <Bar dataKey="revenue" fill="#fbbc04" radius={[4, 4, 0, 0]} name="Revenue" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Budget Allocation Chart */}
          <Card className={`${darkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"}`}>
            <CardHeader>
              <CardTitle className={`${darkMode ? "text-white" : "text-gray-900"}`}>Budget Allocation</CardTitle>
              <CardDescription className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                Current marketing budget distribution across channels
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col lg:flex-row items-center gap-8">
                <div className="w-full lg:w-1/2 h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                      <Pie
                        data={budgetData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={120}
                        paddingAngle={2}
                        dataKey="value"
                        stroke="none"
                      >
                        {budgetData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={entry.color}
                            className="hover:opacity-80 transition-opacity cursor-pointer"
                          />
                        ))}
                      </Pie>
                      <Tooltip
                        content={<PieTooltip darkMode={darkMode} />}
                        cursor={false}
                        wrapperStyle={{ outline: "none" }}
                      />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </div>
                <div className="w-full lg:w-1/2 space-y-4">
                  {budgetData.map((item, index) => (
                    <div
                      key={index}
                      className={`flex items-center justify-between p-3 rounded-lg ${darkMode ? "bg-gray-800 border border-gray-700" : "bg-gray-50 border border-gray-200"}`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="w-4 h-4 rounded-full border-2 border-white dark:border-gray-800"
                          style={{ backgroundColor: item.color }}
                        />
                        <span className={`font-medium ${darkMode ? "text-gray-100" : "text-gray-700"}`}>
                          {item.name}
                        </span>
                      </div>
                      <span className={`font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>{item.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Campaign Performance Table */}
          <Card className={`${darkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"}`}>
            <CardHeader>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <CardTitle className={`${darkMode ? "text-white" : "text-gray-900"}`}>Campaign Performance</CardTitle>
                  <CardDescription className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                    Detailed metrics for all active marketing campaigns
                  </CardDescription>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search campaigns..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 w-full sm:w-64"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className={darkMode ? "border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white" : ""}
                    >
                      <Filter className="h-4 w-4 mr-2" />
                      Filter
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          className={darkMode ? "border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white" : ""}
                        >
                          <Download className="h-4 w-4 mr-2" />
                          Export
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={handleExportPDF}>Export to PDF</DropdownMenuItem>
                        <DropdownMenuItem onClick={handleExportCSV}>Export to CSV</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead
                        className="cursor-pointer hover:bg-gray-50/50 dark:hover:bg-gray-800/50 min-w-[200px] transition-colors"
                        onClick={() => handleSort("campaign")}
                      >
                        <div className="flex items-center gap-1">
                          Campaign
                          <ArrowUpDown className="h-4 w-4" />
                        </div>
                      </TableHead>
                      <TableHead className="min-w-[100px]">Channel</TableHead>
                      <TableHead
                        className="cursor-pointer hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-colors"
                        onClick={() => handleSort("spend")}
                      >
                        <div className="flex items-center gap-1">
                          Spend
                          <ArrowUpDown className="h-4 w-4" />
                        </div>
                      </TableHead>
                      <TableHead className="hidden sm:table-cell">Impressions</TableHead>
                      <TableHead>Clicks</TableHead>
                      <TableHead>Conv.</TableHead>
                      <TableHead className="hidden md:table-cell">CTR</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedData.map((row) => (
                      <TableRow
                        key={row.id}
                        className="hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-colors"
                      >
                        <TableCell className="font-medium">
                          <div>
                            <div className="font-medium">{row.campaign}</div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">Updated {row.lastUpdated}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-xs">
                            {row.channel}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-medium">${row.spend.toLocaleString()}</TableCell>
                        <TableCell className="hidden sm:table-cell">{row.impressions.toLocaleString()}</TableCell>
                        <TableCell>{row.clicks.toLocaleString()}</TableCell>
                        <TableCell className="font-medium">{row.conversions}</TableCell>
                        <TableCell className="hidden md:table-cell">
                          <span className="text-sm font-medium">{row.ctr}%</span>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={row.status === "Active" ? "default" : "secondary"}
                            className={
                              row.status === "Active"
                                ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
                                : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
                            }
                          >
                            {row.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>View Details</DropdownMenuItem>
                              <DropdownMenuItem>Edit Campaign</DropdownMenuItem>
                              <DropdownMenuItem>Duplicate</DropdownMenuItem>
                              <DropdownMenuItem className="text-red-600">Delete Campaign</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Pagination */}
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-2">
                  <span className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>Rows per page:</span>
                  <Select value={itemsPerPage.toString()} onValueChange={(value) => setItemsPerPage(Number(value))}>
                    <SelectTrigger className="w-20">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">5</SelectItem>
                      <SelectItem value="10">10</SelectItem>
                      <SelectItem value="20">20</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center gap-4">
                  <span className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                    Page {currentPage} of {totalPages}
                  </span>
                  <div className="flex gap-1">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>

      {/* Footer */}
      <footer
        className={`border-t py-6 px-4 sm:px-6 ${
          darkMode ? "bg-gray-950 border-gray-800" : "bg-white border-gray-200"
        }`}
      >
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex flex-wrap items-center gap-6">
            <a
              href="#"
              className={`text-sm transition-colors ${
                darkMode ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className={`text-sm transition-colors ${
                darkMode ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Terms of Service
            </a>
            <a
              href="#"
              className={`text-sm transition-colors ${
                darkMode ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Support Center
            </a>
            <a
              href="#"
              className={`text-sm transition-colors ${
                darkMode ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-gray-900"
              }`}
            >
              API Documentation
            </a>
          </div>
          <div className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
            © 2024 ADmyBRAND Insights. All rights reserved. Version 2.4.1
          </div>
        </div>
      </footer>
    </div>
  )
}
