import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"

export default function Layout({ children }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex h-screen w-full font-inter">
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  )
}
