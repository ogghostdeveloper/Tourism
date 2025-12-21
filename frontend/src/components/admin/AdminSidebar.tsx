"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    MapPin,
    Compass,
    Package,
    Hotel,
    LogOut,
    Settings
} from "lucide-react";
import { cn } from "@/lib/utils";
import { logout } from "@/lib/auth";

const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/admin" },
    { icon: MapPin, label: "Destinations", href: "/admin/destinations" },
    { icon: Compass, label: "Experiences", href: "/admin/experiences" },
    { icon: Package, label: "Packages", href: "/admin/packages" },
    { icon: Hotel, label: "Hotels", href: "/admin/hotels" },
];

export function AdminSidebar() {
    const pathname = usePathname();

    return (
        <aside className="w-64 bg-black text-white h-screen fixed left-0 top-0 flex flex-col border-r border-gray-800">
            <div className="p-6 border-b border-gray-800">
                <Link href="/" className="block">
                    <span className="text-xl font-bold tracking-widest uppercase block">
                        Bhutan
                    </span>
                    <span className="text-[10px] tracking-[0.3em] text-gray-400 block mt-1">
                        Admin Portal
                    </span>
                </Link>
            </div>

            <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                {menuItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors",
                                isActive
                                    ? "bg-white text-black"
                                    : "text-gray-400 hover:text-white hover:bg-white/5"
                            )}
                        >
                            <item.icon className="w-5 h-5" />
                            {item.label}
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-gray-800 space-y-1">
                <button className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                    <Settings className="w-5 h-5" />
                    Settings
                </button>
                <form action={logout}>
                    <button type="submit" className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors">
                        <LogOut className="w-5 h-5" />
                        Sign Out
                    </button>
                </form>
            </div>
        </aside>
    );
}
