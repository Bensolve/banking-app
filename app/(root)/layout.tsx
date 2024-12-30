'use client';

import HomePageSidebar from '@/components/HomePageSidebar';

export default function HomeLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <section className='flex'>
            {/* Sidebar */}
            <HomePageSidebar />


            {children}

        </section>





    );
}
