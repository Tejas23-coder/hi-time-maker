import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  AlertTriangle, 
  Activity, 
  Users, 
  TrendingUp,
  MapPin,
  Clock
} from 'lucide-react';
import { useReportStore } from '@/store/useReportStore';

const mockStats = [
  {
    title: 'Total Reports',
    value: '234',
    change: '+12%',
    icon: Activity,
    color: 'text-blue-600',
  },
  {
    title: 'Active Hotspots',
    value: '5',
    change: '+2',
    icon: AlertTriangle,
    color: 'text-red-600',
  },
  {
    title: 'Response Time',
    value: '4.2min',
    change: '-15%',
    icon: Clock,
    color: 'text-green-600',
  },
  {
    title: 'Active Users',
    value: '1,456',
    change: '+8%',
    icon: Users,
    color: 'text-purple-600',
  },
];

const recentReports = [
  {
    id: '1',
    type: 'flood',
    location: 'Mumbai, Maharashtra',
    severity: 'high',
    time: '2 minutes ago',
    status: 'verified',
  },
  {
    id: '2',
    type: 'cyclone',
    location: 'Chennai, Tamil Nadu',
    severity: 'critical',
    time: '5 minutes ago',
    status: 'pending',
  },
  {
    id: '3',
    type: 'earthquake',
    location: 'Delhi NCR',
    severity: 'medium',
    time: '10 minutes ago',
    status: 'verified',
  },
];

export default function Dashboard() {
  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">
            Real-time hazard monitoring and reporting overview
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {mockStats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                <span className={stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}>
                  {stat.change}
                </span>{' '}
                from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Reports */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Recent Reports
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentReports.map((report) => (
              <div key={report.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${
                    report.severity === 'critical' ? 'bg-red-500' :
                    report.severity === 'high' ? 'bg-orange-500' : 'bg-yellow-500'
                  }`} />
                  <div>
                    <p className="font-medium capitalize">{report.type}</p>
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {report.location}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge variant={report.status === 'verified' ? 'default' : 'secondary'}>
                    {report.status}
                  </Badge>
                  <p className="text-xs text-muted-foreground mt-1">{report.time}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Active Hotspots */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Active Hotspots
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 border rounded-lg bg-red-50 dark:bg-red-950/20">
                <div>
                  <p className="font-medium">Coastal Kerala</p>
                  <p className="text-sm text-muted-foreground">Tsunami Warning</p>
                </div>
                <Badge variant="destructive">Critical</Badge>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg bg-orange-50 dark:bg-orange-950/20">
                <div>
                  <p className="font-medium">West Bengal</p>
                  <p className="text-sm text-muted-foreground">Cyclone Alert</p>
                </div>
                <Badge className="bg-orange-500">High</Badge>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg bg-yellow-50 dark:bg-yellow-950/20">
                <div>
                  <p className="font-medium">Gujarat Coast</p>
                  <p className="text-sm text-muted-foreground">Flood Watch</p>
                </div>
                <Badge variant="secondary">Medium</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}