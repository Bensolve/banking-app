import { Home, Wallet, CreditCard, Settings, FileText, DollarSign, Bell, User } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

// Menu items for the bank dashboard
const items = [
  {
    title: "Home",
    url: "#",
    icon: Home,
  },
  {
    title: "Accounts",
    url: "#",
    icon: Wallet,
  },
  {
    title: "Transactions",
    url: "#",
    icon: FileText,
  },
  {
    title: "Transfers",
    url: "#",
    icon: DollarSign,
  },
  {
    title: "Loans",
    url: "#",
    icon: CreditCard,
  },
  {
    title: "Investments",
    url: "#",
    icon: DollarSign,
  },
  {
    title: "Cards",
    url: "#",
    icon: CreditCard,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
  {
    title: "Notifications",
    url: "#",
    icon: Bell,
  },
  {
    title: "Profile",
    url: "#",
    icon: User,
  },
]

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Banking Dashboard</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
