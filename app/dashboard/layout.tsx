import MobileSidebar from "@/components/MobileSidebar";
import Sidebar from "@/components/Sidebar";
import Image from "next/image";


export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <main className="flex h-screen w-full font-inter">
      <Sidebar />
      <div className="flex size-full flex-col">
        <div className="root-layout">
          <Image src="/assets/logo.svg" width={30} height={30} alt="logo" />
          <div>
            <MobileSidebar  />
          </div>
        </div>
        {children}
      </div>
     
   </main>
    );
  }
  