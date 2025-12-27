import "./admin.css";
import { redirect } from "next/navigation";
import { auth, signOut } from "@/auth";
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { LogOut, Settings } from "lucide-react";
import Link from "next/link";
import { AdminNavItem } from "@/components/admin/AdminNavItem";
import { ScrollArea } from "@/components/ui/scroll-area";

const menuItems = [
  { iconName: "layout-dashboard" as const, label: "Dashboard", href: "/admin" },
  {
    iconName: "map-pin" as const,
    label: "Destinations",
    href: "/admin/destinations",
  },
  {
    iconName: "compass" as const,
    label: "Experiences",
    href: "/admin/experiences",
  },
  {
    iconName: "layers" as const,
    label: "Experience Types",
    href: "/admin/experience-types",
  },
  { iconName: "package" as const, label: "Tours", href: "/admin/tours" },
  {
    iconName: "file-text" as const,
    label: "Trip Requests",
    href: "/admin/tour-requests",
  },
  { iconName: "hotel" as const, label: "Hotels", href: "/admin/hotels" },
  { iconName: "info" as const, label: "About Us", href: "/admin/about-us" },
];

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  return (
    <SidebarProvider>
      <Sidebar

        // collapsible="icon"
        className="border-r border-gray-800"
      >
        <SidebarHeader className="border-b border-gray-800 bg-black">
          <div className="p-6">
            <Link href="/" className="block">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-white flex items-center justify-center">
                  <span className="text-black font-black text-lg">B</span>
                </div>
                <div>
                  <span className="text-lg font-bold tracking-widest uppercase block text-white">
                    BHUTAN
                  </span>
                  <span className="text-[9px] tracking-[0.2em] text-gray-400 block">
                    ADMIN PORTAL
                  </span>
                </div>
              </div>
            </Link>
          </div>
        </SidebarHeader>

        <SidebarContent className="bg-black text-white">
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu className="space-y-1 px-2 py-4">
                {menuItems.map((item) => (
                  <AdminNavItem
                    key={item.href}
                    iconName={item.iconName}
                    label={item.label}
                    href={item.href}
                  />
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter className="border-t border-gray-800 bg-black">
          <SidebarMenu className="space-y-1 px-2 py-4">
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link
                  href="/admin/settings"
                  className="flex items-center gap-3 px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-800 transition-all"
                >
                  <Settings className="w-5 h-5" />
                  <span>Settings</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <form action={async () => {
                "use server";
                await signOut({ redirectTo: "/login" });
              }}>
                <SidebarMenuButton asChild>
                  <button
                    type="submit"
                    className="w-full flex items-center gap-3 px-3 py-2 text-red-400 hover:text-red-300 hover:bg-red-950/20 transition-all"
                  >
                    <LogOut className="w-5 h-5" />
                    <span>Sign Out</span>
                  </button>
                </SidebarMenuButton>
              </form>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>

      <SidebarInset>
        <header className="h-16 bg-white border-b border-gray-200 sticky top-0 z-30 px-8 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-4">
            <SidebarTrigger className="hover:bg-gray-100 border border-gray-300 text-gray-700" />
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span className="font-bold text-black uppercase tracking-wider">
                Admin
              </span>
              <span className="text-gray-300">/</span>
              <span className="text-gray-600">Portal</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-gray-900 text-white flex items-center justify-center text-xs font-bold">
              AD
            </div>
          </div>
        </header>
        <ScrollArea className="h-[calc(100vh-6rem)] bg-gray-50">
          <div className="p-8">{children}</div>
        </ScrollArea>
      </SidebarInset>
    </SidebarProvider>
  );
}
