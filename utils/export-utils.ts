// Export campaign data to CSV
export const exportToCSV = (data: any[], filename = "campaign-data") => {
  const headers = [
    "Campaign",
    "Channel",
    "Spend ($)",
    "Impressions",
    "Clicks",
    "Conversions",
    "CTR (%)",
    "Status",
    "Last Updated",
  ]

  const csvContent = [
    headers.join(","),
    ...data.map((row) =>
      [
        `"${row.campaign}"`,
        row.channel,
        row.spend,
        row.impressions,
        row.clicks,
        row.conversions,
        row.ctr,
        row.status,
        `"${row.lastUpdated}"`,
      ].join(","),
    ),
  ].join("\n")

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
  const link = document.createElement("a")
  const url = URL.createObjectURL(blob)
  link.setAttribute("href", url)
  link.setAttribute("download", `${filename}.csv`)
  link.style.visibility = "hidden"
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

// Export dashboard metrics to CSV
export const exportMetricsToCSV = () => {
  const metricsData = [
    ["Metric", "Value", "Change", "Period"],
    ["Total Revenue", "$1,247,890", "+18.2%", "vs last month"],
    ["Active Users", "58,590", "+12.5%", "vs last month"],
    ["Conversions", "2,486", "-3.1%", "vs last month"],
    ["Avg. ROAS", "3.42x", "+8.7%", "vs last month"],
  ]

  const csvContent = metricsData.map((row) => row.join(",")).join("\n")
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
  const link = document.createElement("a")
  const url = URL.createObjectURL(blob)
  link.setAttribute("href", url)
  link.setAttribute("download", "dashboard-metrics.csv")
  link.style.visibility = "hidden"
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

// Simple PDF export without external dependencies
export const exportToPDF = (data: any[], filename = "campaign-report") => {
  // Create a simple HTML content for PDF
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Campaign Performance Report</title>
      <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        .header { text-align: center; margin-bottom: 30px; }
        .title { font-size: 24px; font-weight: bold; color: #333; }
        .subtitle { font-size: 14px; color: #666; margin-top: 10px; }
        .section { margin: 30px 0; }
        .section-title { font-size: 18px; font-weight: bold; margin-bottom: 15px; color: #333; }
        table { width: 100%; border-collapse: collapse; margin: 20px 0; }
        th, td { border: 1px solid #ddd; padding: 12px; text-align: left; }
        th { background-color: #4285f4; color: white; font-weight: bold; }
        tr:nth-child(even) { background-color: #f9f9f9; }
        .metrics-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; margin: 20px 0; }
        .metric-card { border: 1px solid #ddd; padding: 15px; border-radius: 8px; }
        .metric-value { font-size: 24px; font-weight: bold; color: #333; }
        .metric-change { font-size: 14px; color: #666; }
        .footer { text-align: center; margin-top: 50px; font-size: 12px; color: #666; }
      </style>
    </head>
    <body>
      <div class="header">
        <div class="title">Campaign Performance Report</div>
        <div class="subtitle">Generated on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}</div>
      </div>

      <div class="section">
        <div class="section-title">Key Metrics Summary</div>
        <div class="metrics-grid">
          <div class="metric-card">
            <div>Total Revenue</div>
            <div class="metric-value">$1,247,890</div>
            <div class="metric-change">+18.2% vs last month</div>
          </div>
          <div class="metric-card">
            <div>Active Users</div>
            <div class="metric-value">58,590</div>
            <div class="metric-change">+12.5% vs last month</div>
          </div>
          <div class="metric-card">
            <div>Conversions</div>
            <div class="metric-value">2,486</div>
            <div class="metric-change">-3.1% vs last month</div>
          </div>
          <div class="metric-card">
            <div>Avg. ROAS</div>
            <div class="metric-value">3.42x</div>
            <div class="metric-change">+8.7% vs last month</div>
          </div>
        </div>
      </div>

      <div class="section">
        <div class="section-title">Campaign Details</div>
        <table>
          <thead>
            <tr>
              <th>Campaign</th>
              <th>Channel</th>
              <th>Spend</th>
              <th>Impressions</th>
              <th>Clicks</th>
              <th>Conversions</th>
              <th>CTR</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            ${data
              .map(
                (row) => `
              <tr>
                <td>${row.campaign}</td>
                <td>${row.channel}</td>
                <td>$${row.spend.toLocaleString()}</td>
                <td>${row.impressions.toLocaleString()}</td>
                <td>${row.clicks.toLocaleString()}</td>
                <td>${row.conversions}</td>
                <td>${row.ctr}%</td>
                <td>${row.status}</td>
              </tr>
            `,
              )
              .join("")}
          </tbody>
        </table>
      </div>

      <div class="footer">
        ADmyBRAND Insights Dashboard - Confidential Report
      </div>
    </body>
    </html>
  `

  // Create and download the HTML file (which can be printed to PDF)
  const blob = new Blob([htmlContent], { type: "text/html" })
  const url = URL.createObjectURL(blob)
  const link = document.createElement("a")
  link.href = url
  link.download = `${filename}.html`
  link.style.display = "none"
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)

  // Also open in new window for immediate printing
  const printWindow = window.open("", "_blank")
  if (printWindow) {
    printWindow.document.write(htmlContent)
    printWindow.document.close()
    setTimeout(() => {
      printWindow.print()
    }, 500)
  }
}

// Export dashboard overview to PDF
export const exportDashboardToPDF = () => {
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Marketing Dashboard Overview</title>
      <style>
        body { font-family: Arial, sans-serif; margin: 20px; line-height: 1.6; }
        .header { text-align: center; margin-bottom: 40px; }
        .title { font-size: 28px; font-weight: bold; color: #333; margin-bottom: 10px; }
        .subtitle { font-size: 16px; color: #666; }
        .section { margin: 40px 0; page-break-inside: avoid; }
        .section-title { font-size: 20px; font-weight: bold; margin-bottom: 20px; color: #333; border-bottom: 2px solid #4285f4; padding-bottom: 5px; }
        .metrics-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; margin: 20px 0; }
        .metric-card { border: 1px solid #ddd; padding: 20px; border-radius: 8px; background: #f9f9f9; }
        .metric-label { font-size: 14px; color: #666; margin-bottom: 5px; }
        .metric-value { font-size: 28px; font-weight: bold; color: #333; margin-bottom: 5px; }
        .metric-change { font-size: 14px; color: #666; }
        table { width: 100%; border-collapse: collapse; margin: 20px 0; }
        th, td { border: 1px solid #ddd; padding: 12px; text-align: left; }
        th { background-color: #4285f4; color: white; font-weight: bold; }
        tr:nth-child(even) { background-color: #f9f9f9; }
        .channel-performance { margin: 20px 0; }
        .budget-item { display: flex; justify-content: space-between; padding: 10px; border-bottom: 1px solid #eee; }
        .footer { text-align: center; margin-top: 50px; font-size: 12px; color: #666; border-top: 1px solid #ddd; padding-top: 20px; }
        @media print {
          body { margin: 0; }
          .section { page-break-inside: avoid; }
        }
      </style>
    </head>
    <body>
      <div class="header">
        <div class="title">Marketing Dashboard Overview</div>
        <div class="subtitle">ADmyBRAND Insights - Generated on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}</div>
      </div>

      <div class="section">
        <div class="section-title">Key Performance Metrics</div>
        <div class="metrics-grid">
          <div class="metric-card">
            <div class="metric-label">Total Revenue</div>
            <div class="metric-value">$1,247,890</div>
            <div class="metric-change">+18.2% vs last month</div>
          </div>
          <div class="metric-card">
            <div class="metric-label">Active Users</div>
            <div class="metric-value">58,590</div>
            <div class="metric-change">+12.5% vs last month</div>
          </div>
          <div class="metric-card">
            <div class="metric-label">Conversions</div>
            <div class="metric-value">2,486</div>
            <div class="metric-change">-3.1% vs last month</div>
          </div>
          <div class="metric-card">
            <div class="metric-label">Average ROAS</div>
            <div class="metric-value">3.42x</div>
            <div class="metric-change">+8.7% vs last month</div>
          </div>
        </div>
      </div>

      <div class="section">
        <div class="section-title">Channel Performance</div>
        <table>
          <thead>
            <tr>
              <th>Channel</th>
              <th>Spend</th>
              <th>Conversions</th>
              <th>Revenue</th>
              <th>ROAS</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Google Ads</td><td>$45,200</td><td>892</td><td>$156,800</td><td>3.47x</td></tr>
            <tr><td>Facebook Ads</td><td>$32,100</td><td>654</td><td>$98,400</td><td>3.07x</td></tr>
            <tr><td>Instagram</td><td>$18,900</td><td>387</td><td>$67,200</td><td>3.56x</td></tr>
            <tr><td>LinkedIn</td><td>$12,400</td><td>198</td><td>$42,300</td><td>3.41x</td></tr>
            <tr><td>YouTube</td><td>$8,700</td><td>156</td><td>$28,900</td><td>3.32x</td></tr>
          </tbody>
        </table>
      </div>

      <div class="section">
        <div class="section-title">Budget Allocation</div>
        <div style="background: #f9f9f9; padding: 20px; border-radius: 8px;">
          <div class="budget-item"><span>Google Ads</span><span><strong>38.2%</strong></span></div>
          <div class="budget-item"><span>Facebook Ads</span><span><strong>27.1%</strong></span></div>
          <div class="budget-item"><span>Instagram</span><span><strong>16.0%</strong></span></div>
          <div class="budget-item"><span>LinkedIn</span><span><strong>10.5%</strong></span></div>
          <div class="budget-item"><span>YouTube</span><span><strong>8.2%</strong></span></div>
        </div>
      </div>

      <div class="section">
        <div class="section-title">Revenue Trends (Last 6 Months)</div>
        <table>
          <thead>
            <tr>
              <th>Month</th>
              <th>Revenue</th>
              <th>Users</th>
              <th>Conversions</th>
              <th>CTR</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>January</td><td>$124,500</td><td>8,420</td><td>342</td><td>3.2%</td></tr>
            <tr><td>February</td><td>$138,200</td><td>9,180</td><td>398</td><td>3.8%</td></tr>
            <tr><td>March</td><td>$142,800</td><td>9,650</td><td>425</td><td>4.1%</td></tr>
            <tr><td>April</td><td>$156,300</td><td>10,200</td><td>467</td><td>4.3%</td></tr>
            <tr><td>May</td><td>$149,700</td><td>9,890</td><td>441</td><td>4.0%</td></tr>
            <tr><td>June</td><td>$167,400</td><td>11,250</td><td>523</td><td>4.6%</td></tr>
          </tbody>
        </table>
      </div>

      <div class="footer">
        <p><strong>ADmyBRAND Insights Dashboard</strong></p>
        <p>Confidential Report - Generated automatically from your marketing data</p>
        <p>For questions or support, contact your account manager</p>
      </div>
    </body>
    </html>
  `

  // Create and download the HTML file
  const blob = new Blob([htmlContent], { type: "text/html" })
  const url = URL.createObjectURL(blob)
  const link = document.createElement("a")
  link.href = url
  link.download = "admybrand-dashboard-report.html"
  link.style.display = "none"
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)

  // Also open in new window for immediate printing
  const printWindow = window.open("", "_blank")
  if (printWindow) {
    printWindow.document.write(htmlContent)
    printWindow.document.close()
    setTimeout(() => {
      printWindow.print()
    }, 500)
  }
}
