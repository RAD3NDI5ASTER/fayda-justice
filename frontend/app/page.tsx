"use client"

import { useState } from "react"
import {
  BarChart3,
  Home,
  Shield,
  Users,
  FileText,
  Settings,
  Bell,
  Search,
  ChevronLeft,
  ChevronRight,
  Eye,
  Edit,
  Plus,
  Clock,
  CheckCircle,
  Gavel,
  AlertTriangle,
  Lock,
  UserCheck,
  TrendingUp,
  PieChart,
  Activity,
  Database,
  Download,
  Upload,
  Save,
  RefreshCw,
  Globe,
  Calendar,
  Smartphone,
  Mail,
  Filter,
  MoreVertical,
  Trash2,
  FileCheck,
  CheckCircle2,
  XCircle,
  Timer,
  Languages,
  X,
  MapPin,
  User,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useAuth } from "./providers/auth-provider"

export default function Dashboard() {
  const { user, logout } = useAuth()
  const [currentDate, setCurrentDate] = useState(new Date())
  const [activeSection, setActiveSection] = useState("dashboard")
  const [selectedMetric, setSelectedMetric] = useState<any>(null)
  const [selectedCase, setSelectedCase] = useState<any>(null)
  const [selectedRecord, setSelectedRecord] = useState<any>(null)
  const [showSearch, setShowSearch] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [showNotifications, setShowNotifications] = useState(false)
  const [selectedDate, setSelectedDate] = useState<number | null>(null)
  const [selectedRegion, setSelectedRegion] = useState("all")
  const [selectedCourtType, setSelectedCourtType] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [systemLanguage, setSystemLanguage] = useState("english")
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [settings, setSettings] = useState({
    // General Settings
    systemLanguage: "english",
    timeZone: "eat",
    dateFormat: "dd-mm-yyyy",
    defaultCourtType: "federal",

    // Security Settings
    twoFactorAuth: true,
    criminalRecordProtection: true,
    accessLogging: true,
    sessionTimeout: "30min",

    // Notification Settings
    emailNotifications: true,
    smsNotifications: true,
    pushNotifications: true,
    notificationFrequency: "immediate",

    // Data Management
    autoBackup: true,
    dataRetention: "7years",
  })

  const sidebarItems = [
    { icon: Home, label: "Dashboard", key: "dashboard" },
    { icon: Gavel, label: "Cases", key: "cases" },
    { icon: Shield, label: "Criminal Records", key: "criminal-records" },
    { icon: Users, label: "Citizens", key: "citizens" },
    { icon: FileText, label: "Documents", key: "documents" },
    { icon: BarChart3, label: "Analytics", key: "analytics" },
    { icon: Settings, label: "Settings", key: "settings" },
  ]

  const languages = [
    { value: "english", label: "English", flag: "🇺🇸" },
    { value: "amharic", label: "አማርኛ (Amharic)", flag: "🇪🇹" },
    { value: "oromo", label: "Afaan Oromoo", flag: "🇪🇹" },
    { value: "tigrinya", label: "ትግርኛ (Tigrinya)", flag: "🇪🇹" },
    { value: "somali", label: "Soomaali", flag: "🇪🇹" },
    { value: "arabic", label: "العربية", flag: "🇸🇦" },
  ]

  const notifications = [
    {
      id: 1,
      title: "New Criminal Record Added",
      message: "CR-ETH-2024-004 has been added to the system",
      time: "2 minutes ago",
      type: "info",
      read: false,
    },
    {
      id: 2,
      title: "Court Hearing Scheduled",
      message: "Case FAY-2024-156 hearing scheduled for tomorrow",
      time: "15 minutes ago",
      type: "warning",
      read: false,
    },
    {
      id: 3,
      title: "System Backup Completed",
      message: "Daily backup completed successfully",
      time: "1 hour ago",
      type: "success",
      read: true,
    },
    {
      id: 4,
      title: "Security Alert",
      message: "Failed login attempt detected",
      time: "2 hours ago",
      type: "error",
      read: false,
    },
  ]

  const courtSchedule = {
    1: [{ case: "FAY-2024-001", type: "Criminal", time: "09:00 AM" }],
    8: [
      { case: "FAY-2024-008", type: "Civil", time: "10:30 AM" },
      { case: "FAY-2024-009", type: "Family", time: "02:00 PM" },
    ],
    15: [{ case: "FAY-2024-015", type: "Commercial", time: "11:00 AM" }],
    22: [
      { case: "FAY-2024-022", type: "Criminal", time: "09:30 AM" },
      { case: "FAY-2024-023", type: "Administrative", time: "01:00 PM" },
      { case: "FAY-2024-024", type: "Civil", time: "03:30 PM" },
    ],
    25: [{ case: "FAY-2024-025", type: "Family", time: "10:00 AM" }],
  }

  const ethiopianRegions = [
    { value: "all", label: "All Regions" },
    { value: "addis-ababa", label: "Addis Ababa" },
    { value: "oromia", label: "Oromia" },
    { value: "amhara", label: "Amhara" },
    { value: "tigray", label: "Tigray" },
    { value: "sidama", label: "Sidama" },
    { value: "snnp", label: "SNNP" },
    { value: "somali", label: "Somali" },
    { value: "afar", label: "Afar" },
    { value: "benishangul", label: "Benishangul-Gumuz" },
    { value: "gambela", label: "Gambela" },
    { value: "harari", label: "Harari" },
    { value: "dire-dawa", label: "Dire Dawa" },
  ]

  const courtTypes = [
    { value: "all", label: "All Court Types" },
    { value: "federal", label: "Federal High Court" },
    { value: "regional", label: "Regional High Court" },
    { value: "woreda", label: "Woreda Court" },
    { value: "kebele", label: "Kebele Court" },
    { value: "sharia", label: "Sharia Court" },
    { value: "customary", label: "Customary Court" },
  ]

  const metrics = [
    {
      title: "Total Cases",
      value: "12,847",
      change: "+8.2%",
      color: "text-blue-500",
      icon: FileText,
      description: "Total cases registered in the system across all regions",
      details: "This includes 8,500 resolved cases, 3,200 pending cases, and 1,147 in progress.",
    },
    {
      title: "Criminal Records",
      value: "2,156",
      change: "+3.1%",
      color: "text-red-500",
      icon: Shield,
      description: "Secure criminal records with police file attachments",
      details: "All records are protected from unauthorized deletion and fully traceable.",
    },
    {
      title: "Pending Cases",
      value: "3,247",
      change: "-12%",
      color: "text-orange-500",
      icon: Clock,
      description: "Cases awaiting court hearings or decisions",
      details: "Average waiting time reduced from 45 days to 28 days since digitization.",
    },
    {
      title: "Resolved Cases",
      value: "8,500",
      change: "+15%",
      color: "text-green-500",
      icon: CheckCircle,
      description: "Successfully resolved cases this year",
      details: "Resolution time improved by 35% compared to paper-based system.",
    },
    {
      title: "Active Citizens",
      value: "45,892",
      change: "+22%",
      color: "text-purple-500",
      icon: Users,
      description: "Citizens registered with Fayda ID accessing the system",
      details: "All users verified through VeriFayda OIDC authentication system.",
    },
  ]

  const criminalRecords = [
    {
      id: "CR-ETH-2024-001",
      faydaId: "FAY-***-1234",
      name: "John D. (Protected)",
      fullName: "John Doe",
      crimeType: "Theft",
      status: "Active",
      region: "Addis Ababa",
      policeFileAttached: true,
      lastModified: "2024-01-15",
      modifiedBy: "Officer Almaz T.",
      deletionProtected: true,
      severity: "Medium",
      courtAssigned: "Federal High Court",
      dateOfCrime: "2023-12-10",
      arrestDate: "2023-12-12",
      description:
        "Theft of electronic equipment from a local store. Suspect was caught on CCTV and arrested two days later.",
      evidence: ["CCTV Footage", "Witness Statements", "Stolen Items Recovered"],
      address: "Bole Sub-City, Addis Ababa",
      phone: "+251-911-123456",
      age: 28,
      occupation: "Unemployed",
    },
    {
      id: "CR-ETH-2024-002",
      faydaId: "FAY-***-5678",
      name: "Jane S. (Protected)",
      fullName: "Jane Smith",
      crimeType: "Fraud",
      status: "Under Investigation",
      region: "Oromia",
      policeFileAttached: true,
      lastModified: "2024-01-14",
      modifiedBy: "Detective Bekele M.",
      deletionProtected: true,
      severity: "High",
      courtAssigned: "Regional High Court",
      dateOfCrime: "2023-11-20",
      arrestDate: "2024-01-10",
      description:
        "Financial fraud involving fake investment schemes. Multiple victims reported losses totaling 2.5 million ETB.",
      evidence: ["Bank Records", "Email Communications", "Victim Testimonies"],
      address: "Adama City, Oromia",
      phone: "+251-922-789012",
      age: 35,
      occupation: "Former Bank Employee",
    },
    {
      id: "CR-ETH-2024-003",
      faydaId: "FAY-***-9012",
      name: "Mike K. (Protected)",
      fullName: "Mike Kebede",
      crimeType: "Assault",
      status: "Resolved",
      region: "Amhara",
      policeFileAttached: true,
      lastModified: "2024-01-13",
      modifiedBy: "Judge Hanna G.",
      deletionProtected: true,
      severity: "Low",
      courtAssigned: "Woreda Court",
      dateOfCrime: "2023-10-05",
      arrestDate: "2023-10-06",
      description: "Minor assault during a neighborhood dispute. Case resolved through mediation.",
      evidence: ["Medical Report", "Witness Statements"],
      address: "Bahir Dar, Amhara",
      phone: "+251-933-345678",
      age: 42,
      occupation: "Shopkeeper",
    },
  ]

  const analyticsData = {
    caseResolutionTrends: [
      { month: "Jan", resolved: 450, pending: 320, new: 380 },
      { month: "Feb", resolved: 520, pending: 280, new: 420 },
      { month: "Mar", resolved: 480, pending: 350, new: 390 },
      { month: "Apr", resolved: 600, pending: 250, new: 450 },
      { month: "May", resolved: 580, pending: 290, new: 410 },
      { month: "Jun", resolved: 650, pending: 220, new: 480 },
    ],
    regionalDistribution: [
      { region: "Addis Ababa", cases: 3200, percentage: 25 },
      { region: "Oromia", cases: 2800, percentage: 22 },
      { region: "Amhara", cases: 2100, percentage: 16 },
      { region: "Tigray", cases: 1500, percentage: 12 },
      { region: "Others", cases: 3247, percentage: 25 },
    ],
    caseTypes: [
      { type: "Civil", count: 4200, percentage: 33 },
      { type: "Criminal", count: 3100, percentage: 24 },
      { type: "Family", count: 2800, percentage: 22 },
      { type: "Commercial", count: 1900, percentage: 15 },
      { type: "Administrative", count: 847, percentage: 6 },
    ],
  }

  const handleRefreshData = async () => {
    setIsRefreshing(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsRefreshing(false)
  }

  const handleSaveSettings = async () => {
    // Simulate saving settings
    await new Promise((resolve) => setTimeout(resolve, 1000))
    alert("Settings saved successfully!")
  }

  const handleExportData = () => {
    // Simulate data export
    const data = {
      cases: metrics[0].value,
      criminalRecords: metrics[1].value,
      exportDate: new Date().toISOString(),
    }
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "fayda-justice-export.json"
    a.click()
  }

  const handleImportData = () => {
    const input = document.createElement("input")
    input.type = "file"
    input.accept = ".json"
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = (e) => {
          try {
            const data = JSON.parse(e.target?.result as string)
            alert("Data imported successfully!")
          } catch (error) {
            alert("Invalid file format!")
          }
        }
        reader.readAsText(file)
      }
    }
    input.click()
  }

  const handleDateClick = (day: number) => {
    setSelectedDate(day)
    const schedule = courtSchedule[day as keyof typeof courtSchedule]
    if (schedule) {
      const caseList = schedule.map((item) => `${item.case} (${item.type}) at ${item.time}`).join("\n")
      alert(`Court Schedule for ${day}th:\n\n${caseList}`)
    } else {
      alert(`No court cases scheduled for ${day}th`)
    }
  }

  const handleRecordClick = (record: any) => {
    setSelectedRecord(record)
  }

  const handleNotificationClick = (notification: any) => {
    // Mark as read and show details
    alert(`${notification.title}\n\n${notification.message}\n\nTime: ${notification.time}`)
  }

  const generateCalendar = () => {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()
    const firstDay = new Date(year, month, 1).getDay()
    const daysInMonth = new Date(year, month + 1, 0).getDate()

    const days = []

    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-8 w-8"></div>)
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const isToday = day === 15
      const isSelected = day === selectedDate
      const hasHearing = courtSchedule[day as keyof typeof courtSchedule]
      days.push(
        <div
          key={day}
          onClick={() => handleDateClick(day)}
          className={`h-8 w-8 flex items-center justify-center text-sm cursor-pointer hover:bg-gray-700 rounded transition-colors relative ${
            isToday
              ? "bg-orange-500 text-white"
              : isSelected
                ? "bg-blue-500 text-white"
                : hasHearing
                  ? "bg-green-600 text-white"
                  : "text-gray-300"
          }`}
        >
          {day}
          {hasHearing && !isToday && !isSelected && (
            <div className="absolute bottom-0 right-0 w-2 h-2 bg-green-400 rounded-full"></div>
          )}
        </div>,
      )
    }

    return days
  }

  const renderContent = () => {
    switch (activeSection) {
      case "criminal-records":
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  <Shield className="w-8 h-8 text-red-500" />
                  Criminal Records Management
                </h2>
                <p className="text-gray-400">Secure tracking of criminal records with police file attachments</p>
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={handleRefreshData}
                  disabled={isRefreshing}
                  variant="outline"
                  className="bg-gray-800 border-gray-700"
                >
                  <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`} />
                  {isRefreshing ? "Refreshing..." : "Refresh Data"}
                </Button>
                <Badge className="bg-red-500/20 text-red-400">
                  <Lock className="w-3 h-3 mr-1" />
                  Deletion Protected
                </Badge>
                <Button className="bg-orange-500 hover:bg-orange-600">
                  <Plus className="w-4 h-4 mr-2" />
                  New Record
                </Button>
              </div>
            </div>

            {/* Advanced Filters */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Filter className="w-5 h-5" />
                  Advanced Filters
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                    <SelectTrigger className="bg-gray-700 border-gray-600">
                      <SelectValue placeholder="Select Region" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-700 border-gray-600">
                      {ethiopianRegions.map((region) => (
                        <SelectItem key={region.value} value={region.value}>
                          {region.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={selectedCourtType} onValueChange={setSelectedCourtType}>
                    <SelectTrigger className="bg-gray-700 border-gray-600">
                      <SelectValue placeholder="Court Type" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-700 border-gray-600">
                      {courtTypes.map((court) => (
                        <SelectItem key={court.value} value={court.value}>
                          {court.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                    <SelectTrigger className="bg-gray-700 border-gray-600">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-700 border-gray-600">
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="investigation">Under Investigation</SelectItem>
                      <SelectItem value="resolved">Resolved</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select>
                    <SelectTrigger className="bg-gray-700 border-gray-600">
                      <SelectValue placeholder="Crime Severity" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-700 border-gray-600">
                      <SelectItem value="all">All Severities</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Security Notice */}
            <Card className="bg-red-900/20 border-red-500/30">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="w-6 h-6 text-red-400" />
                  <div>
                    <h3 className="font-semibold text-red-400">Security Notice</h3>
                    <p className="text-sm text-gray-300">
                      Criminal records are protected from unauthorized deletion. All modifications are logged and
                      traceable via Fayda ID. 2FA authentication required for sensitive operations.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Criminal Records Table */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg">Criminal Records Database</CardTitle>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={handleExportData}>
                      <Download className="w-4 h-4 mr-2" />
                      Export
                    </Button>
                    <Button size="sm" variant="outline" onClick={handleImportData}>
                      <Upload className="w-4 h-4 mr-2" />
                      Import
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-700">
                        <th className="text-left py-3 px-4 text-gray-400">Record ID</th>
                        <th className="text-left py-3 px-4 text-gray-400">Fayda ID</th>
                        <th className="text-left py-3 px-4 text-gray-400">Crime Type</th>
                        <th className="text-left py-3 px-4 text-gray-400">Severity</th>
                        <th className="text-left py-3 px-4 text-gray-400">Status</th>
                        <th className="text-left py-3 px-4 text-gray-400">Court</th>
                        <th className="text-left py-3 px-4 text-gray-400">Police File</th>
                        <th className="text-left py-3 px-4 text-gray-400">Protection</th>
                        <th className="text-left py-3 px-4 text-gray-400">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {criminalRecords.map((record, index) => (
                        <tr key={index} className="border-b border-gray-700 hover:bg-gray-750">
                          <td
                            className="py-3 px-4 text-sm font-mono cursor-pointer text-blue-400 hover:text-blue-300"
                            onClick={() => handleRecordClick(record)}
                          >
                            {record.id}
                          </td>
                          <td className="py-3 px-4 text-sm font-mono">{record.faydaId}</td>
                          <td className="py-3 px-4 text-sm">{record.crimeType}</td>
                          <td className="py-3 px-4">
                            <Badge
                              className={
                                record.severity === "High"
                                  ? "bg-red-500/20 text-red-400"
                                  : record.severity === "Medium"
                                    ? "bg-orange-500/20 text-orange-400"
                                    : "bg-green-500/20 text-green-400"
                              }
                            >
                              {record.severity}
                            </Badge>
                          </td>
                          <td className="py-3 px-4">
                            <Badge
                              className={
                                record.status === "Active"
                                  ? "bg-red-500/20 text-red-400"
                                  : record.status === "Under Investigation"
                                    ? "bg-orange-500/20 text-orange-400"
                                    : "bg-green-500/20 text-green-400"
                              }
                            >
                              {record.status}
                            </Badge>
                          </td>
                          <td className="py-3 px-4 text-sm">{record.courtAssigned}</td>
                          <td className="py-3 px-4">
                            {record.policeFileAttached ? (
                              <Badge className="bg-blue-500/20 text-blue-400">
                                <FileText className="w-3 h-3 mr-1" />
                                Attached
                              </Badge>
                            ) : (
                              <Badge className="bg-gray-500/20 text-gray-400">No File</Badge>
                            )}
                          </td>
                          <td className="py-3 px-4">
                            {record.deletionProtected ? (
                              <Badge className="bg-green-500/20 text-green-400">
                                <Lock className="w-3 h-3 mr-1" />
                                Protected
                              </Badge>
                            ) : (
                              <Badge className="bg-red-500/20 text-red-400">Unprotected</Badge>
                            )}
                          </td>
                          <td className="py-3 px-4">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                                  <MoreVertical className="w-4 h-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent className="bg-gray-800 border-gray-700">
                                <DropdownMenuItem onClick={() => handleRecordClick(record)}>
                                  <Eye className="w-4 h-4 mr-2" />
                                  View Details
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Edit className="w-4 h-4 mr-2" />
                                  Edit Record
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <FileCheck className="w-4 h-4 mr-2" />
                                  Attach File
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-red-400">
                                  <Trash2 className="w-4 h-4 mr-2" />
                                  Archive (Protected)
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        )

      case "analytics":
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <BarChart3 className="w-8 h-8 text-blue-500" />
                Legal System Analytics
              </h2>
              <div className="flex gap-2">
                <Button
                  onClick={handleRefreshData}
                  disabled={isRefreshing}
                  variant="outline"
                  className="bg-gray-800 border-gray-700"
                >
                  <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`} />
                  {isRefreshing ? "Refreshing..." : "Refresh Data"}
                </Button>
                <Button variant="outline" className="bg-gray-800 border-gray-700" onClick={handleExportData}>
                  <Download className="w-4 h-4 mr-2" />
                  Export Report
                </Button>
              </div>
            </div>

            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList className="bg-gray-800">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="trends">Trends</TabsTrigger>
                <TabsTrigger value="regional">Regional</TabsTrigger>
                <TabsTrigger value="performance">Performance</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                {/* Key Performance Indicators */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <Card className="bg-gray-800 border-gray-700">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-400">Case Resolution Rate</p>
                          <p className="text-2xl font-bold text-green-400">87.3%</p>
                          <p className="text-xs text-green-400">+12% from last month</p>
                        </div>
                        <TrendingUp className="w-8 h-8 text-green-400" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gray-800 border-gray-700">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-400">Average Processing Time</p>
                          <p className="text-2xl font-bold text-blue-400">28 days</p>
                          <p className="text-xs text-green-400">-17 days improvement</p>
                        </div>
                        <Clock className="w-8 h-8 text-blue-400" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gray-800 border-gray-700">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-400">Digital Adoption</p>
                          <p className="text-2xl font-bold text-purple-400">94.2%</p>
                          <p className="text-xs text-green-400">+8% this quarter</p>
                        </div>
                        <Activity className="w-8 h-8 text-purple-400" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gray-800 border-gray-700">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-400">Fraud Prevention</p>
                          <p className="text-2xl font-bold text-red-400">99.8%</p>
                          <p className="text-xs text-green-400">Fayda ID secured</p>
                        </div>
                        <Shield className="w-8 h-8 text-red-400" />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Case Type Distribution */}
                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-lg">Case Type Distribution</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {analyticsData.caseTypes.map((type, index) => (
                        <div key={index} className="flex items-center gap-4">
                          <div className="w-20 text-sm text-gray-400">{type.type}</div>
                          <div className="flex-1">
                            <div className="h-8 bg-gray-700 rounded-lg overflow-hidden">
                              <div
                                className={`h-full transition-all duration-500 ${
                                  index === 0
                                    ? "bg-blue-500"
                                    : index === 1
                                      ? "bg-red-500"
                                      : index === 2
                                        ? "bg-green-500"
                                        : index === 3
                                          ? "bg-purple-500"
                                          : "bg-orange-500"
                                }`}
                                style={{ width: `${type.percentage}%` }}
                              ></div>
                            </div>
                          </div>
                          <div className="w-16 text-sm text-gray-400">{type.count}</div>
                          <div className="w-12 text-sm text-gray-400">{type.percentage}%</div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="trends" className="space-y-6">
                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-lg">Case Resolution Trends (6 Months)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 flex items-end justify-between gap-4">
                      {analyticsData.caseResolutionTrends.map((month, index) => (
                        <div key={index} className="flex-1 flex flex-col items-center">
                          <div className="w-full flex flex-col items-center gap-1 mb-2">
                            <div
                              className="w-full bg-green-500 rounded-t"
                              style={{ height: `${(month.resolved / 650) * 100}px` }}
                              title={`Resolved: ${month.resolved}`}
                            ></div>
                            <div
                              className="w-full bg-orange-500"
                              style={{ height: `${(month.pending / 650) * 80}px` }}
                              title={`Pending: ${month.pending}`}
                            ></div>
                            <div
                              className="w-full bg-blue-500 rounded-b"
                              style={{ height: `${(month.new / 650) * 90}px` }}
                              title={`New: ${month.new}`}
                            ></div>
                          </div>
                          <span className="text-xs text-gray-400">{month.month}</span>
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-center gap-6 mt-4">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-green-500 rounded"></div>
                        <span className="text-sm text-gray-400">Resolved</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-orange-500 rounded"></div>
                        <span className="text-sm text-gray-400">Pending</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-blue-500 rounded"></div>
                        <span className="text-sm text-gray-400">New Cases</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="regional" className="space-y-6">
                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-lg">Regional Case Distribution</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        {analyticsData.regionalDistribution.map((region, index) => (
                          <div key={index} className="flex items-center gap-4">
                            <div className="w-24 text-sm text-gray-400">{region.region}</div>
                            <div className="flex-1">
                              <div className="h-6 bg-gray-700 rounded-lg overflow-hidden">
                                <div
                                  className="h-full bg-gradient-to-r from-orange-500 to-red-500 transition-all duration-500"
                                  style={{ width: `${region.percentage}%` }}
                                ></div>
                              </div>
                            </div>
                            <div className="w-16 text-sm text-gray-400">{region.cases}</div>
                          </div>
                        ))}
                      </div>
                      <div className="flex items-center justify-center">
                        <div className="text-center">
                          <PieChart className="w-32 h-32 text-orange-500 mx-auto mb-4" />
                          <p className="text-gray-400">
                            Interactive regional map visualization would be displayed here
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="performance" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="bg-gray-800 border-gray-700">
                    <CardHeader>
                      <CardTitle className="text-lg">System Performance Metrics</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm text-gray-400">Database Performance</span>
                          <span className="text-sm">96%</span>
                        </div>
                        <Progress value={96} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm text-gray-400">Fayda ID Authentication</span>
                          <span className="text-sm">99.8%</span>
                        </div>
                        <Progress value={99.8} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm text-gray-400">User Satisfaction</span>
                          <span className="text-sm">94%</span>
                        </div>
                        <Progress value={94} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm text-gray-400">System Uptime</span>
                          <span className="text-sm">99.9%</span>
                        </div>
                        <Progress value={99.9} className="h-2" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gray-800 border-gray-700">
                    <CardHeader>
                      <CardTitle className="text-lg">Security & Compliance</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-400">Criminal Record Protection</span>
                        <Badge className="bg-green-500/20 text-green-400">
                          <CheckCircle2 className="w-3 h-3 mr-1" />
                          Active
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-400">2FA Authentication</span>
                        <Badge className="bg-green-500/20 text-green-400">
                          <CheckCircle2 className="w-3 h-3 mr-1" />
                          Enabled
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-400">Access Logging</span>
                        <Badge className="bg-green-500/20 text-green-400">
                          <CheckCircle2 className="w-3 h-3 mr-1" />
                          Active
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-400">Unauthorized Access Attempts</span>
                        <Badge className="bg-red-500/20 text-red-400">
                          <XCircle className="w-3 h-3 mr-1" />0
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-400">Data Integrity</span>
                        <Badge className="bg-green-500/20 text-green-400">
                          <CheckCircle2 className="w-3 h-3 mr-1" />
                          100%
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-400">Audit Trail Coverage</span>
                        <Badge className="bg-green-500/20 text-green-400">
                          <CheckCircle2 className="w-3 h-3 mr-1" />
                          Complete
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        )

      case "settings":
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <Settings className="w-8 h-8 text-gray-400" />
                System Settings
              </h2>
              <Button onClick={handleSaveSettings} className="bg-orange-500 hover:bg-orange-600">
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
            </div>

            <Tabs defaultValue="general" className="space-y-6">
              <TabsList className="bg-gray-800">
                <TabsTrigger value="general">General</TabsTrigger>
                <TabsTrigger value="security">Security</TabsTrigger>
                <TabsTrigger value="notifications">Notifications</TabsTrigger>
                <TabsTrigger value="data">Data Management</TabsTrigger>
              </TabsList>

              <TabsContent value="general" className="space-y-6">
                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Globe className="w-5 h-5" />
                      General Settings
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="text-sm text-gray-400 mb-2 block flex items-center gap-2">
                          <Languages className="w-4 h-4" />
                          System Language
                        </label>
                        <Select
                          value={settings.systemLanguage}
                          onValueChange={(value) => setSettings({ ...settings, systemLanguage: value })}
                        >
                          <SelectTrigger className="bg-gray-700 border-gray-600">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-gray-700 border-gray-600">
                            {languages.map((lang) => (
                              <SelectItem key={lang.value} value={lang.value}>
                                <span className="flex items-center gap-2">
                                  <span>{lang.flag}</span>
                                  {lang.label}
                                </span>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <label className="text-sm text-gray-400 mb-2 block flex items-center gap-2">
                          <Globe className="w-4 h-4" />
                          Time Zone
                        </label>
                        <Select
                          value={settings.timeZone}
                          onValueChange={(value) => setSettings({ ...settings, timeZone: value })}
                        >
                          <SelectTrigger className="bg-gray-700 border-gray-600">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-gray-700 border-gray-600">
                            <SelectItem value="eat">East Africa Time (EAT)</SelectItem>
                            <SelectItem value="utc">UTC</SelectItem>
                            <SelectItem value="gmt">GMT</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <label className="text-sm text-gray-400 mb-2 block flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          Date Format
                        </label>
                        <Select
                          value={settings.dateFormat}
                          onValueChange={(value) => setSettings({ ...settings, dateFormat: value })}
                        >
                          <SelectTrigger className="bg-gray-700 border-gray-600">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-gray-700 border-gray-600">
                            <SelectItem value="dd-mm-yyyy">DD/MM/YYYY</SelectItem>
                            <SelectItem value="mm-dd-yyyy">MM/DD/YYYY</SelectItem>
                            <SelectItem value="yyyy-mm-dd">YYYY-MM-DD</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <label className="text-sm text-gray-400 mb-2 block flex items-center gap-2">
                          <Gavel className="w-4 h-4" />
                          Default Court Type
                        </label>
                        <Select
                          value={settings.defaultCourtType}
                          onValueChange={(value) => setSettings({ ...settings, defaultCourtType: value })}
                        >
                          <SelectTrigger className="bg-gray-700 border-gray-600">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-gray-700 border-gray-600">
                            <SelectItem value="federal">Federal High Court</SelectItem>
                            <SelectItem value="regional">Regional High Court</SelectItem>
                            <SelectItem value="woreda">Woreda Court</SelectItem>
                            <SelectItem value="kebele">Kebele Court</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="security" className="space-y-6">
                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Shield className="w-5 h-5 text-red-500" />
                      Security Settings
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium flex items-center gap-2">
                            <Lock className="w-4 h-4" />
                            Two-Factor Authentication
                          </h3>
                          <p className="text-sm text-gray-400">Require 2FA for all admin accounts</p>
                        </div>
                        <Switch
                          checked={settings.twoFactorAuth}
                          onCheckedChange={(checked) => setSettings({ ...settings, twoFactorAuth: checked })}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium flex items-center gap-2">
                            <Shield className="w-4 h-4" />
                            Criminal Record Protection
                          </h3>
                          <p className="text-sm text-gray-400">Prevent unauthorized deletion of criminal records</p>
                        </div>
                        <Switch
                          checked={settings.criminalRecordProtection}
                          onCheckedChange={(checked) => setSettings({ ...settings, criminalRecordProtection: checked })}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium flex items-center gap-2">
                            <Activity className="w-4 h-4" />
                            Access Logging
                          </h3>
                          <p className="text-sm text-gray-400">Log all user access and modifications</p>
                        </div>
                        <Switch
                          checked={settings.accessLogging}
                          onCheckedChange={(checked) => setSettings({ ...settings, accessLogging: checked })}
                        />
                      </div>

                      <div>
                        <label className="text-sm text-gray-400 mb-2 block flex items-center gap-2">
                          <Timer className="w-4 h-4" />
                          Session Timeout
                        </label>
                        <Select
                          value={settings.sessionTimeout}
                          onValueChange={(value) => setSettings({ ...settings, sessionTimeout: value })}
                        >
                          <SelectTrigger className="bg-gray-700 border-gray-600">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-gray-700 border-gray-600">
                            <SelectItem value="15min">15 minutes</SelectItem>
                            <SelectItem value="30min">30 minutes</SelectItem>
                            <SelectItem value="1hour">1 hour</SelectItem>
                            <SelectItem value="2hours">2 hours</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="border-t border-gray-700 pt-4">
                      <h3 className="font-medium mb-4 flex items-center gap-2">
                        <UserCheck className="w-4 h-4" />
                        Fayda ID Integration Status
                      </h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-400">VeriFayda OIDC Connection</span>
                          <Badge className="bg-green-500/20 text-green-400">
                            <CheckCircle2 className="w-3 h-3 mr-1" />
                            Connected
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-400">Authentication Success Rate</span>
                          <span className="text-sm text-green-400">99.8%</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-400">Last Sync</span>
                          <span className="text-sm text-gray-300">2 minutes ago</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-400">Active Sessions</span>
                          <span className="text-sm text-gray-300">1,247</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="notifications" className="space-y-6">
                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Bell className="w-5 h-5" />
                      Notification Settings
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium flex items-center gap-2">
                            <Mail className="w-4 h-4" />
                            Email Notifications
                          </h3>
                          <p className="text-sm text-gray-400">Send email alerts for important events</p>
                        </div>
                        <Switch
                          checked={settings.emailNotifications}
                          onCheckedChange={(checked) => setSettings({ ...settings, emailNotifications: checked })}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium flex items-center gap-2">
                            <Smartphone className="w-4 h-4" />
                            SMS Notifications
                          </h3>
                          <p className="text-sm text-gray-400">Send SMS for urgent court hearings</p>
                        </div>
                        <Switch
                          checked={settings.smsNotifications}
                          onCheckedChange={(checked) => setSettings({ ...settings, smsNotifications: checked })}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium flex items-center gap-2">
                            <Bell className="w-4 h-4" />
                            Push Notifications
                          </h3>
                          <p className="text-sm text-gray-400">Browser push notifications</p>
                        </div>
                        <Switch
                          checked={settings.pushNotifications}
                          onCheckedChange={(checked) => setSettings({ ...settings, pushNotifications: checked })}
                        />
                      </div>

                      <div>
                        <label className="text-sm text-gray-400 mb-2 block">Notification Frequency</label>
                        <Select defaultValue="immediate">
                          <SelectTrigger className="bg-gray-700 border-gray-600">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-gray-700 border-gray-600">
                            <SelectItem value="immediate">Immediate</SelectItem>
                            <SelectItem value="hourly">Hourly Digest</SelectItem>
                            <SelectItem value="daily">Daily Summary</SelectItem>
                            <SelectItem value="weekly">Weekly Report</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="data" className="space-y-6">
                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Database className="w-5 h-5 text-blue-500" />
                      Data Management
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">Automatic Backup</h3>
                          <p className="text-sm text-gray-400">Daily backup of all case data</p>
                        </div>
                        <Switch
                          checked={settings.autoBackup}
                          onCheckedChange={(checked) => setSettings({ ...settings, autoBackup: checked })}
                        />
                      </div>

                      <div>
                        <label className="text-sm text-gray-400 mb-2 block">Data Retention Period</label>
                        <Select
                          value={settings.dataRetention}
                          onValueChange={(value) => setSettings({ ...settings, dataRetention: value })}
                        >
                          <SelectTrigger className="bg-gray-700 border-gray-600">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-gray-700 border-gray-600">
                            <SelectItem value="1year">1 Year</SelectItem>
                            <SelectItem value="3years">3 Years</SelectItem>
                            <SelectItem value="5years">5 Years</SelectItem>
                            <SelectItem value="7years">7 Years</SelectItem>
                            <SelectItem value="permanent">Permanent</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Button variant="outline" className="bg-gray-700 border-gray-600" onClick={handleExportData}>
                          <Download className="w-4 h-4 mr-2" />
                          Export All Data
                        </Button>
                        <Button variant="outline" className="bg-gray-700 border-gray-600" onClick={handleImportData}>
                          <Upload className="w-4 h-4 mr-2" />
                          Import Data
                        </Button>
                      </div>
                    </div>

                    <div className="border-t border-gray-700 pt-4">
                      <h3 className="font-medium mb-4">Storage Information</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-400">Total Cases</span>
                          <span className="text-sm text-gray-300">12,847</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-400">Criminal Records</span>
                          <span className="text-sm text-gray-300">2,156</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-400">Document Storage</span>
                          <span className="text-sm text-gray-300">2.4 TB</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-400">Database Size</span>
                          <span className="text-sm text-gray-300">847 MB</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-400">Last Backup</span>
                          <span className="text-sm text-green-400">Today, 3:00 AM</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-400">Backup Status</span>
                          <Badge className="bg-green-500/20 text-green-400">
                            <CheckCircle2 className="w-3 h-3 mr-1" />
                            Healthy
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        )

      default:
        return (
          <div className="space-y-6">
            {/* Language Selector in Header */}
            <div className="flex justify-between items-center mb-4">
              <div>
                <h1 className="text-3xl font-bold">
                  {systemLanguage === "amharic"
                    ? "ፋይዳ ፍትህ"
                    : systemLanguage === "oromo"
                      ? "Fayda Haqaa"
                      : "FaydaJustice Dashboard"}
                </h1>
                <p className="text-gray-400">
                  {systemLanguage === "amharic"
                    ? "የኢትዮጵያ ዲጂታል ፍርድ ቤት እና የህግ አገልግሎት ተከታታይ"
                    : systemLanguage === "oromo"
                      ? "Sirna Murtii Dijitaalaa fi Hojii Seeraa Itiyoophiyaa"
                      : "Ethiopian Digital Court & Legal Services Management System"}
                </p>
              </div>
              <Select value={systemLanguage} onValueChange={setSystemLanguage}>
                <SelectTrigger className="w-48 bg-gray-800 border-gray-700">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  {languages.map((lang) => (
                    <SelectItem key={lang.value} value={lang.value}>
                      <span className="flex items-center gap-2">
                        <span>{lang.flag}</span>
                        {lang.label}
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Key Impact Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {metrics.map((metric, index) => (
                <Card
                  key={index}
                  className="bg-gray-800 border-gray-700 cursor-pointer hover:bg-gray-750 transition-colors"
                  onClick={() => setSelectedMetric(metric)}
                >
                  <CardContent className="p-4">
                    <div className="text-center">
                      <div className="relative w-16 h-16 mx-auto mb-2">
                        <div className="w-16 h-16 rounded-full border-4 border-gray-600 flex items-center justify-center hover:border-orange-500 transition-colors">
                          <metric.icon className={`w-6 h-6 ${metric.color}`} />
                        </div>
                      </div>
                      <div className={`text-xl font-bold ${metric.color} mb-1`}>{metric.value}</div>
                      <h3 className="text-xs text-gray-400 mb-1">{metric.title}</h3>
                      <p className={`text-xs ${metric.color}`}>{metric.change}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <div className="lg:col-span-3 space-y-6">
                {/* Quick Actions */}
                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-lg">Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Button
                        className="h-20 flex flex-col gap-2 bg-blue-600 hover:bg-blue-700"
                        onClick={() => setActiveSection("cases")}
                      >
                        <Gavel className="w-6 h-6" />
                        <span>Manage Cases</span>
                      </Button>
                      <Button
                        className="h-20 flex flex-col gap-2 bg-red-600 hover:bg-red-700"
                        onClick={() => setActiveSection("criminal-records")}
                      >
                        <Shield className="w-6 h-6" />
                        <span>Criminal Records</span>
                      </Button>
                      <Button
                        className="h-20 flex flex-col gap-2 bg-green-600 hover:bg-green-700"
                        onClick={() => setActiveSection("analytics")}
                      >
                        <BarChart3 className="w-6 h-6" />
                        <span>View Analytics</span>
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* System Status */}
                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-lg">System Status</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center">
                        <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-2">
                          <CheckCircle2 className="w-6 h-6 text-white" />
                        </div>
                        <p className="text-sm text-gray-400">System Health</p>
                        <p className="text-lg font-bold text-green-400">Excellent</p>
                      </div>
                      <div className="text-center">
                        <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-2">
                          <Activity className="w-6 h-6 text-white" />
                        </div>
                        <p className="text-sm text-gray-400">Active Users</p>
                        <p className="text-lg font-bold text-blue-400">1,247</p>
                      </div>
                      <div className="text-center">
                        <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-2">
                          <Shield className="w-6 h-6 text-white" />
                        </div>
                        <p className="text-sm text-gray-400">Security Status</p>
                        <p className="text-lg font-bold text-orange-400">Protected</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Right sidebar with calendar */}
              <div className="space-y-6">
                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">Court Calendar</CardTitle>
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                          onClick={() => {
                            const newDate = new Date(currentDate)
                            newDate.setMonth(newDate.getMonth() - 1)
                            setCurrentDate(newDate)
                          }}
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                          onClick={() => {
                            const newDate = new Date(currentDate)
                            newDate.setMonth(newDate.getMonth() + 1)
                            setCurrentDate(newDate)
                          }}
                        >
                          <ChevronRight className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-7 gap-1 mb-2">
                      {["S", "M", "T", "W", "T", "F", "S"].map((day) => (
                        <div
                          key={day}
                          className="h-8 w-8 flex items-center justify-center text-xs text-gray-400 font-medium"
                        >
                          {day}
                        </div>
                      ))}
                    </div>
                    <div className="grid grid-cols-7 gap-1">{generateCalendar()}</div>
                  </CardContent>
                </Card>

                {/* Recent Activity */}
                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-lg">Recent Activity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <div className="text-sm">
                          <p className="text-gray-300">Case CR-2024-001 resolved</p>
                          <p className="text-gray-500 text-xs">2 minutes ago</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <div className="text-sm">
                          <p className="text-gray-300">New criminal record added</p>
                          <p className="text-gray-500 text-xs">5 minutes ago</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                        <div className="text-sm">
                          <p className="text-gray-300">Court hearing scheduled</p>
                          <p className="text-gray-500 text-xs">10 minutes ago</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        )
    }
  }

  const handleUserProfileClick = () => {
    if (user) {
      const userInfo = `
        ${user.faydaId ? `Fayda ID: ${user.faydaId}` : `Email: ${user.email}`}
        Role: ${user.role}
        Verified: ${user.verified ? "Yes" : "No"}
        ${user.oidcVerified ? "VeriFayda OIDC: Verified" : ""}
        Login Time: ${new Date(user.loginTime).toLocaleString()}
      `
      if (confirm(`${userInfo}\n\nDo you want to logout?`)) {
        logout()
      }
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full w-64 bg-gray-800 border-r border-gray-700">
        <div className="p-6">
          <div className="flex items-center gap-2 mb-8 cursor-pointer" onClick={() => setActiveSection("dashboard")}>
            <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xl font-bold">FaydaJustice</span>
              <p className="text-xs text-gray-400">Digital Court System</p>
            </div>
          </div>

          <nav className="space-y-2">
            {sidebarItems.map((item, index) => (
              <div
                key={index}
                onClick={() => setActiveSection(item.key)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-colors ${
                  activeSection === item.key
                    ? "bg-orange-500 text-white"
                    : "text-gray-400 hover:text-white hover:bg-gray-700"
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </div>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-64 p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold capitalize flex items-center gap-2">{activeSection.replace("-", " ")}</h1>
            <p className="text-gray-400">
              {activeSection === "dashboard"
                ? "FaydaJustice - Advanced Digital Court & Legal Services Tracker for Ethiopia"
                : `Advanced ${activeSection.replace("-", " ")} management across Ethiopian regions and court systems`}
            </p>
          </div>

          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              className="bg-gray-800 border-gray-700"
              onClick={() => setShowSearch(!showSearch)}
            >
              <Search className="w-4 h-4 mr-2" />
              Search
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="bg-gray-800 border-gray-700 relative"
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <Bell className="w-4 h-4" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs flex items-center justify-center">
                {notifications.filter((n) => !n.read).length}
              </span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="bg-gray-800 border-gray-700"
              onClick={handleUserProfileClick}
            >
              <UserCheck className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Search Bar */}
        {showSearch && (
          <div className="mb-6">
            <Input
              placeholder="Search cases, citizens, criminal records, or documents..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-gray-800 border-gray-700 max-w-md"
            />
          </div>
        )}

        {/* Notifications Panel */}
        {showNotifications && (
          <Card className="mb-6 bg-gray-800 border-gray-700">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Bell className="w-5 h-5" />
                  Notifications
                </CardTitle>
                <Button variant="ghost" size="sm" onClick={() => setShowNotifications(false)}>
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-3 rounded-lg cursor-pointer hover:bg-gray-700 transition-colors ${
                      notification.read ? "bg-gray-750" : "bg-gray-700"
                    }`}
                    onClick={() => handleNotificationClick(notification)}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-2 h-2 rounded-full mt-2 ${
                          notification.type === "error"
                            ? "bg-red-500"
                            : notification.type === "warning"
                              ? "bg-orange-500"
                              : notification.type === "success"
                                ? "bg-green-500"
                                : "bg-blue-500"
                        }`}
                      ></div>
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{notification.title}</h4>
                        <p className="text-xs text-gray-400 mt-1">{notification.message}</p>
                        <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Dynamic Content */}
        {renderContent()}
      </div>

      {/* Criminal Record Details Modal */}
      {selectedRecord && (
        <Dialog open={!!selectedRecord} onOpenChange={() => setSelectedRecord(null)}>
          <DialogContent className="bg-gray-800 border-gray-700 max-w-4xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Shield className="w-6 h-6 text-red-500" />
                Criminal Record Details - {selectedRecord.id}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                      <User className="w-5 h-5" />
                      Personal Information
                    </h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Full Name:</span>
                        <span>{selectedRecord.fullName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Fayda ID:</span>
                        <span className="font-mono">{selectedRecord.faydaId}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Age:</span>
                        <span>{selectedRecord.age} years</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Occupation:</span>
                        <span>{selectedRecord.occupation}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                      <MapPin className="w-5 h-5" />
                      Contact Information
                    </h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Address:</span>
                        <span className="text-right">{selectedRecord.address}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Phone:</span>
                        <span>{selectedRecord.phone}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Region:</span>
                        <span>{selectedRecord.region}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                      <Gavel className="w-5 h-5" />
                      Case Information
                    </h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Crime Type:</span>
                        <span>{selectedRecord.crimeType}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Severity:</span>
                        <Badge
                          className={
                            selectedRecord.severity === "High"
                              ? "bg-red-500/20 text-red-400"
                              : selectedRecord.severity === "Medium"
                                ? "bg-orange-500/20 text-orange-400"
                                : "bg-green-500/20 text-green-400"
                          }
                        >
                          {selectedRecord.severity}
                        </Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Status:</span>
                        <Badge
                          className={
                            selectedRecord.status === "Active"
                              ? "bg-red-500/20 text-red-400"
                              : selectedRecord.status === "Under Investigation"
                                ? "bg-orange-500/20 text-orange-400"
                                : "bg-green-500/20 text-green-400"
                          }
                        >
                          {selectedRecord.status}
                        </Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Court Assigned:</span>
                        <span className="text-right">{selectedRecord.courtAssigned}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                      <Clock className="w-5 h-5" />
                      Timeline
                    </h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Date of Crime:</span>
                        <span>{selectedRecord.dateOfCrime}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Arrest Date:</span>
                        <span>{selectedRecord.arrestDate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Last Modified:</span>
                        <span>{selectedRecord.lastModified}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Modified By:</span>
                        <span>{selectedRecord.modifiedBy}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-3">Case Description</h3>
                <p className="text-gray-300 bg-gray-700 p-4 rounded-lg">{selectedRecord.description}</p>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                  <FileCheck className="w-5 h-5" />
                  Evidence
                </h3>
                <div className="flex flex-wrap gap-2">
                  {selectedRecord.evidence.map((item: string, index: number) => (
                    <Badge key={index} className="bg-blue-500/20 text-blue-400">
                      {item}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-gray-700">
                <div className="flex items-center gap-2">
                  <Lock className="w-4 h-4 text-green-400" />
                  <span className="text-sm text-green-400">Record is deletion protected</span>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" className="bg-gray-700 border-gray-600">
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Record
                  </Button>
                  <Button variant="outline" className="bg-gray-700 border-gray-600">
                    <Download className="w-4 h-4 mr-2" />
                    Export PDF
                  </Button>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Metric Details Modal */}
      {selectedMetric && (
        <Dialog open={!!selectedMetric} onOpenChange={() => setSelectedMetric(null)}>
          <DialogContent className="bg-gray-800 border-gray-700">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <selectedMetric.icon className={`w-6 h-6 ${selectedMetric.color}`} />
                {selectedMetric.title} Details
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="text-center">
                <div className={`text-4xl font-bold ${selectedMetric.color} mb-2`}>{selectedMetric.value}</div>
                <p className="text-gray-400">{selectedMetric.description}</p>
              </div>
              <div className="bg-gray-700 p-4 rounded-lg">
                <p className="text-sm text-gray-300">{selectedMetric.details}</p>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
