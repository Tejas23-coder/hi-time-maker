import React, { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, CircleMarker } from 'react-leaflet';
import { Icon, divIcon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Layers, 
  Search, 
  Filter,
  AlertTriangle,
  Waves,
  CloudRain,
  Mountain
} from 'lucide-react';

// Fix for default markers in react-leaflet
delete (Icon.Default.prototype as any)._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Mock data for Indian coastal hazards
const mockReports = [
  {
    id: '1',
    type: 'tsunami',
    severity: 'critical',
    location: [8.5241, 76.9366], // Kerala Coast
    title: 'Tsunami Warning',
    description: 'High waves observed near Kochi',
    timestamp: '2024-01-15T10:30:00Z',
    status: 'verified'
  },
  {
    id: '2',
    type: 'cyclone',
    severity: 'high',
    location: [22.5726, 88.3639], // West Bengal Coast
    title: 'Cyclone Formation',
    description: 'Cyclone developing in Bay of Bengal',
    timestamp: '2024-01-15T09:15:00Z',
    status: 'pending'
  },
  {
    id: '3',
    type: 'flood',
    severity: 'medium',
    location: [19.0760, 72.8777], // Mumbai Coast
    title: 'Coastal Flooding',
    description: 'Rising sea levels causing local flooding',
    timestamp: '2024-01-15T08:45:00Z',
    status: 'verified'
  },
];

const mockHotspots = [
  {
    id: 'h1',
    location: [13.0827, 80.2707], // Chennai
    intensity: 0.8,
    reports: 15,
    title: 'Chennai Bay Area'
  },
  {
    id: 'h2',
    location: [15.2993, 74.1240], // Goa
    intensity: 0.6,
    reports: 8,
    title: 'Goa Coastline'
  },
];

const getMarkerIcon = (type: string, severity: string) => {
  const color = severity === 'critical' ? '#dc2626' : 
                severity === 'high' ? '#ea580c' : '#eab308';
  
  const getIconHtml = () => {
    switch (type) {
      case 'tsunami':
        return `<div style="background-color: ${color}; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);">🌊</div>`;
      case 'cyclone':
        return `<div style="background-color: ${color}; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);">🌀</div>`;
      case 'flood':
        return `<div style="background-color: ${color}; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);">💧</div>`;
      default:
        return `<div style="background-color: ${color}; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);">⚠️</div>`;
    }
  };

  return divIcon({
    html: getIconHtml(),
    className: 'custom-marker',
    iconSize: [30, 30],
    iconAnchor: [15, 15],
  });
};

export default function MapView() {
  const [selectedLayers, setSelectedLayers] = useState(['reports', 'hotspots']);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="h-screen flex">
      {/* Map Container */}
      <div className="flex-1 relative">
        <MapContainer
          center={[20.5937, 78.9629]} // Center of India
          zoom={5}
          className="h-full w-full"
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          
          {/* Reports Layer */}
          {selectedLayers.includes('reports') && mockReports.map((report) => (
            <Marker
              key={report.id}
              position={[report.location[0], report.location[1]]}
              icon={getMarkerIcon(report.type, report.severity)}
            >
              <Popup>
                <div className="p-2">
                  <h3 className="font-semibold">{report.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">{report.description}</p>
                  <div className="flex items-center gap-2">
                    <Badge variant={report.severity === 'critical' ? 'destructive' : 'secondary'}>
                      {report.severity}
                    </Badge>
                    <Badge variant={report.status === 'verified' ? 'default' : 'outline'}>
                      {report.status}
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(report.timestamp).toLocaleString()}
                  </p>
                </div>
              </Popup>
            </Marker>
          ))}

          {/* Hotspots Layer */}
          {selectedLayers.includes('hotspots') && mockHotspots.map((hotspot) => (
            <CircleMarker
              key={hotspot.id}
              center={[hotspot.location[0], hotspot.location[1]]}
              radius={hotspot.intensity * 50}
              pathOptions={{
                fillColor: '#dc2626',
                fillOpacity: 0.3,
                color: '#dc2626',
                weight: 2,
                opacity: 0.7,
              }}
            >
              <Popup>
                <div className="p-2">
                  <h3 className="font-semibold">{hotspot.title}</h3>
                  <p className="text-sm">
                    {hotspot.reports} active reports
                  </p>
                  <p className="text-sm">
                    Intensity: {Math.round(hotspot.intensity * 100)}%
                  </p>
                </div>
              </Popup>
            </CircleMarker>
          ))}
        </MapContainer>

        {/* Map Controls */}
        <div className="absolute top-4 left-4 z-[1000] space-y-2">
          <Card className="w-80">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Map Controls</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search location..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {/* Layer Toggle */}
              <div>
                <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                  <Layers className="h-4 w-4" />
                  Layers
                </h4>
                <div className="space-y-2">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={selectedLayers.includes('reports')}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedLayers([...selectedLayers, 'reports']);
                        } else {
                          setSelectedLayers(selectedLayers.filter(l => l !== 'reports'));
                        }
                      }}
                      className="rounded"
                    />
                    <span className="text-sm">Hazard Reports</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={selectedLayers.includes('hotspots')}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedLayers([...selectedLayers, 'hotspots']);
                        } else {
                          setSelectedLayers(selectedLayers.filter(l => l !== 'hotspots'));
                        }
                      }}
                      className="rounded"
                    />
                    <span className="text-sm">Hotspots</span>
                  </label>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Legend */}
        <div className="absolute bottom-4 right-4 z-[1000]">
          <Card className="w-64">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Legend</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-red-600 rounded-full"></div>
                <span className="text-xs">Critical Severity</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-orange-600 rounded-full"></div>
                <span className="text-xs">High Severity</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-yellow-600 rounded-full"></div>
                <span className="text-xs">Medium Severity</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-red-600 rounded-full opacity-30"></div>
                <span className="text-xs">Hotspot Areas</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}