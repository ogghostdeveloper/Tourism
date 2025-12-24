import { StatCard } from "@/components/admin/StatCard";
import { Users, Package, Calendar, DollarSign, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Bookings"
          value="1,284"
          change="+12.5%"
          trend="up"
          icon={Calendar}
        />
        <StatCard
          title="Active Packages"
          value="15"
          change="0%"
          trend="neutral"
          icon={Package}
        />
        <StatCard
          title="Total Visitors"
          value="45.2k"
          change="+8.2%"
          trend="up"
          icon={Users}
        />
        <StatCard
          title="Revenue"
          value="$2.4M"
          change="+15.3%"
          trend="up"
          icon={DollarSign}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity */}
        <Card className="lg:col-span-2 border border-gray-300 shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-black">
                Recent Activity
              </h2>
              <button className="text-xs font-medium uppercase text-gray-500 hover:text-black transition-colors tracking-wide">
                View All
              </button>
            </div>
            <div className="space-y-6">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 pb-6 border-b border-gray-200 last:border-0 last:pb-0"
                >
                  <div className="w-10 h-10 bg-gray-100 flex items-center justify-center shrink-0">
                    <span className="text-sm font-semibold text-gray-700">
                      JD
                    </span>
                  </div>
                  <div>
                    <p className="text-sm text-black font-medium">
                      John Doe submitted an enquiry for{" "}
                      <span className="font-semibold">Cultural Immersion</span>
                    </p>
                    <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="bg-gray-900 text-white shadow-lg border border-gray-700">
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold mb-6 uppercase tracking-wide">
              Quick Actions
            </h2>
            <div className="space-y-3">
              <Link
                href="/admin/packages/new"
                className="flex items-center justify-between p-4 bg-white/10 hover:bg-white/20 transition-colors group border border-white/20"
              >
                <span className="text-sm font-medium">Add New Package</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/admin/experiences/new"
                className="flex items-center justify-between p-4 bg-white/10 hover:bg-white/20 transition-colors group border border-white/20"
              >
                <span className="text-sm font-medium">Add Experience</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/admin/destinations/new"
                className="flex items-center justify-between p-4 bg-white/10 hover:bg-white/20 transition-colors group border border-white/20"
              >
                <span className="text-sm font-medium">Add Destination</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
