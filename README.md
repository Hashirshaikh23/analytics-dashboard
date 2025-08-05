# 📊 ADmyBRAND Insights Dashboard

**A modern, responsive marketing analytics dashboard built with Next.js**

## ✨ Features

### 🎯 **Core Analytics**
- **Real-time Metrics**: Track revenue, users, conversions, and ROAS
- **Campaign Performance**: Detailed campaign analysis with sorting and filtering
- **Channel Insights**: Multi-channel marketing performance comparison
- **Budget Allocation**: Visual budget distribution across marketing channels

### 🎨 **User Experience**
- **Responsive Design**: Seamless experience across desktop, tablet, and mobile
- **Dark/Light Mode**: Toggle between themes with persistent preferences
- **Interactive Charts**: Beautiful data visualizations with Recharts
- **Professional UI**: Built with shadcn/ui components and Tailwind CSS

### 📈 **Data Visualization**
- **Revenue Trends**: Line charts showing growth over time
- **Channel Performance**: Bar charts comparing spend vs revenue
- **Budget Distribution**: Interactive pie charts with hover tooltips
- **Campaign Table**: Sortable, searchable data table with pagination

### 📤 **Export Capabilities**
- **PDF Reports**: Professional formatted reports with branding
- **CSV Export**: Raw data export for further analysis
- **Print-Friendly**: Optimized layouts for printing
- **Multiple Formats**: Dashboard overview and detailed campaign reports

### 🔧 **Technical Features**
- **TypeScript**: Full type safety and better developer experience
- **Server Components**: Optimized performance with Next.js 15
- **Mobile-First**: Responsive design with mobile navigation
- **Accessibility**: WCAG compliant with proper ARIA labels

## 🚀 Live Demo

**[View Live Dashboard →](ai-dashboard-analytics.vercel.app)**

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Charts**: [Recharts](https://recharts.org/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Deployment**: [Vercel](https://vercel.com/)

## 🏃‍♂️ Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn or pnpm

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Hashirshaikh23/analytics-dashboard.git
   cd analytics-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
analytics-dashboard/
├── app/
│   ├── globals.css          # Global styles and Tailwind config
│   ├── layout.tsx           # Root layout component
│   ├── loading.tsx          # Loading UI component
│   └── page.tsx             # Main dashboard page
├── components/
│   ├── ui/                  # shadcn/ui components
│   └── metric-card.tsx      # Custom metric card component
├── utils/
│   └── export-utils.ts      # Export functionality utilities
├── public/
│   ├── admybrand-logo.svg   # Brand logo
│   └── admybrand-logo.png   # Brand logo (PNG)
└── README.md
```

## 🎯 Features Breakdown

### 📊 Dashboard Metrics
- **Total Revenue**: $1,247,890 (+18.2% growth)
- **Active Users**: 58,590 (+12.5% growth)  
- **Conversions**: 2,486 (-3.1% change)
- **Average ROAS**: 3.42x (+8.7% improvement)

### 📈 Analytics Charts
- **Revenue Trends**: 6-month performance tracking
- **Channel Performance**: Spend vs Revenue comparison
- **Budget Allocation**: Visual budget distribution

### 🏢 Marketing Channels
- Google Ads (38.2% budget allocation)
- Facebook Ads (27.1% budget allocation)
- Instagram (16.0% budget allocation)
- LinkedIn (10.5% budget allocation)
- YouTube (8.2% budget allocation)

## 🔧 Customization

### Adding New Metrics
1. Update the data arrays in `app/page.tsx`
2. Modify the metric cards in the dashboard
3. Update export utilities if needed

### Styling Changes
1. Modify `app/globals.css` for global styles
2. Update Tailwind classes in components
3. Customize shadcn/ui theme variables

### Adding New Charts
1. Import additional Recharts components
2. Create new chart sections in the dashboard
3. Update responsive breakpoints as needed

## 📤 Export Features

### PDF Export
- **Dashboard Overview**: Complete metrics and channel performance
- **Campaign Reports**: Detailed campaign analysis
- **Professional Formatting**: Branded headers and clean layouts

### CSV Export  
- **Raw Data**: Campaign performance data
- **Metrics Summary**: Key performance indicators
- **Excel Compatible**: Ready for spreadsheet analysis

## 🌟 Performance Optimizations

- **Server Components**: Reduced client-side JavaScript
- **Image Optimization**: Next.js automatic image optimization
- **Code Splitting**: Automatic route-based code splitting
- **Responsive Images**: Optimized for different screen sizes

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Use Tailwind CSS for styling
- Ensure responsive design
- Add proper accessibility attributes
- Test on multiple devices

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for the beautiful UI components
- [Recharts](https://recharts.org/) for the amazing chart library
- [Lucide](https://lucide.dev/) for the clean icons
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework


<div align="center">

**Built with ❤️ by [Hashir Shaikh](https://github.com/Hashirshaikh23)**
</div>


