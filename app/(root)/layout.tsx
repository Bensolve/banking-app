'use client';
import Sidebar from '@/components/Sidebar';
import MobileNav from "@/components/MobileNav";
import { useAuthCheck } from '@/lib/hooks/useAuthCheck';
import Image from 'next/image';


export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { user, loading } = useAuthCheck();

    // Show loading state while checking authentication
    if (loading) return <p>Loading...</p>;

    // Prevent rendering if user is not authenticated
    if (!user) return null;

    return (
        <main className="flex h-screen w-full font-inter">
            {/* Sidebar */}
            <Sidebar />

            <div className="flex size-full flex-col">
                <div className="root-layout">
                    <Image src="/icons/logo.svg" width={30} height={30} alt="logo" />
                    <div>
                        <MobileNav />
                    </div>
                </div>
                {children}
            </div>
        </main>
    );
}
