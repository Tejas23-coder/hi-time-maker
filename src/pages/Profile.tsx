import React from 'react';
import { Camera, MapPin, Phone, Mail, Building, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useUserStore } from '@/store/useUserStore';
import { useReportStore } from '@/store/useReportStore';

export default function Profile() {
  const { user } = useUserStore();
  const { reports } = useReportStore();

  if (!user) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">Please log in to view your profile.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const userReports = reports.filter(report => report.userId === user.id);
  const verifiedReports = userReports.filter(report => report.status === 'verified');

  const stats = [
    { label: 'Reports Submitted', value: userReports.length, color: 'text-blue-600' },
    { label: 'Verified Reports', value: verifiedReports.length, color: 'text-green-600' },
    { label: 'Response Rate', value: '98%', color: 'text-purple-600' },
    { label: 'Member Since', value: 'Jan 2024', color: 'text-orange-600' },
  ];

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Profile</h1>
        <p className="text-muted-foreground">Manage your account and view your activity</p>
      </div>

      {/* Profile Card */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row items-start gap-6">
            {/* Avatar Section */}
            <div className="flex flex-col items-center space-y-4">
              <div className="relative">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={user.profilePicture} />
                  <AvatarFallback className="text-2xl">
                    {user.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <Button
                  size="icon"
                  variant="outline"
                  className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full"
                >
                  <Camera className="h-4 w-4" />
                </Button>
              </div>
              <Badge variant="secondary" className="capitalize">
                {user.role.replace('_', ' ')}
              </Badge>
            </div>

            {/* User Info */}
            <div className="flex-1 space-y-4">
              <div>
                <h2 className="text-xl font-semibold">{user.name}</h2>
                <p className="text-muted-foreground">Active Community Reporter</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>{user.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{user.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{user.location}</span>
                </div>
                {user.organization && (
                  <div className="flex items-center gap-2 text-sm">
                    <Building className="h-4 w-4 text-muted-foreground" />
                    <span>{user.organization}</span>
                  </div>
                )}
              </div>

              <div className="flex gap-2">
                <Button>Edit Profile</Button>
                <Button variant="outline">Settings</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className={`text-2xl font-bold ${stat.color}`}>
                  {stat.value}
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  {stat.label}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          {userReports.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No reports submitted yet.</p>
              <Button className="mt-4" onClick={() => window.location.href = '/create-report'}>
                Submit Your First Report
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {userReports.slice(0, 5).map((report) => (
                <div key={report.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <div>
                      <p className="font-medium capitalize">{report.hazardType} Report</p>
                      <p className="text-sm text-muted-foreground">
                        {report.location.address}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge 
                      variant={report.status === 'verified' ? 'default' : 'secondary'}
                      className="capitalize"
                    >
                      {report.status}
                    </Badge>
                    <p className="text-xs text-muted-foreground mt-1">
                      {report.timestamp.toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}