'use client';

import React from 'react';
import AccountManagement from '../../../components/AccountManagement'; // Adjust the path to the component
import UserInfo from '@/components/UserInfo';

export default function AccountManagementPage() {
    return (
        <section className="payment-transfer">
            <UserInfo
                title="Account Managements"
                subtext="Effortlessly manage your Account details."
            />


            <div className=" size-full pt-5">

            <AccountManagement />

        </div >

           
        </section >
    );
}
