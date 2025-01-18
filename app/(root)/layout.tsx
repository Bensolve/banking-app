import Navbar from "@/components/Navbar";
import HomeFooter from "@/components/HomeFooter";

export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
   <main className="pt-16">
      <Navbar/>
     {children}
      <HomeFooter/> 
   </main>
    );
  }
  