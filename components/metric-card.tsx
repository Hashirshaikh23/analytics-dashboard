import type React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown } from "lucide-react"

interface MetricCardProps {
  title: string
  value: string
  change: number
  icon: React.ReactNode
  darkMode?: boolean
}

export function MetricCard({ title, value, change, icon, darkMode = false }: MetricCardProps) {
  const isPositive = change > 0

  return (
    <Card
      className={`${darkMode ? "bg-[#16213e] border-gray-700" : "bg-white"} hover:shadow-lg transition-all duration-300 hover:scale-105`}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className={`text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-600"}`}>{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className={`text-2xl font-bold ${darkMode ? "text-white" : "text-gray-900"} mb-2`}>{value}</div>
        <div className="flex items-center gap-1 text-sm">
          {isPositive ? (
            <TrendingUp className="h-4 w-4 text-green-500" />
          ) : (
            <TrendingDown className="h-4 w-4 text-red-500" />
          )}
          <span className={isPositive ? "text-green-500" : "text-red-500"}>
            {isPositive ? "+" : ""}
            {change}%
          </span>
          <span className={`${darkMode ? "text-gray-400" : "text-gray-500"}`}>vs last month</span>
        </div>
      </CardContent>
    </Card>
  )
}
