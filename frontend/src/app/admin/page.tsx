import { StatCard } from "@/components/admin/StatCard";
import { Users, Package, Calendar, DollarSign, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { getDashboardData } from "./actions";
import { formatDistanceToNow } from "date-fns";

export default async function AdminDashboard() {
  const data = await getDashboardData();
  const { stats, recentActivity } = data;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Trip Requests"
          value={stats.totalBookings.toString()}
          change="+12.5%"
          trend="up"
          icon={Calendar}
        />
        <StatCard
          title="Active Tours"
          value={stats.activeTours.toString()}
          change="0%"
          trend="neutral"
          icon={Package}
        />
        <StatCard
          title="Experiences"
          value={stats.totalExperiences.toString()}
          change="+8.2%"
          trend="up"
          icon={Users}
        />
        <StatCard
          title="Destinations"
          value={stats.totalDestinations.toString()}
          change="+5.3%"
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
                Recent trip requests
              </h2>
              <Link href="/admin/tour-requests">
                <button className="text-xs font-medium uppercase text-gray-500 hover:text-black transition-colors tracking-wide">
                  View All
                </button>
              </Link>
            </div>
            <div className="space-y-6">
              {recentActivity.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start gap-4 pb-6 border-b border-gray-200 last:border-0 last:pb-0"
                >
                  <div className="w-10 h-10 bg-gray-100 flex items-center justify-center shrink-0 rounded-lg">
                    <span className="text-sm font-semibold text-gray-700">
                      {activity.userName.split(" ").map(n => n[0]).join("")}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm text-black font-medium">
                      {activity.userName} submitted an enquiry for{" "}
                      <span className="font-semibold">{activity.packageName}</span>
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {formatDistanceToNow(new Date(activity.createdAt), { addSuffix: true })}
                    </p>
                  </div>
                </div>
              ))}
              {recentActivity.length === 0 && (
                <div className="py-12 text-center text-gray-400">
                  No recent activity found.
                </div>
              )}
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
                href="/admin/tours/new"
                className="flex items-center justify-between p-4 bg-white/10 hover:bg-white/20 transition-colors group border border-white/20 rounded-lg"
              >
                <span className="text-sm font-medium">Add New Tour</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/admin/experiences/new"
                className="flex items-center justify-between p-4 bg-white/10 hover:bg-white/20 transition-colors group border border-white/20 rounded-lg"
              >
                <span className="text-sm font-medium">Add Experience</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/admin/destinations/new"
                className="flex items-center justify-between p-4 bg-white/10 hover:bg-white/20 transition-colors group border border-white/20 rounded-lg"
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
