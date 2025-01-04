import Userinfo from '@/components/UserInfo'
import PaymentTransferForm from '@/components/PaymentTransferForm'

import React from 'react'

const Transfer = async () => {

  



  return (
    <section className="payment-transfer">
      <Userinfo
        title="Payment Transfer"
        subtext="Please provide any specific details or notes related to the payment transfer"
      />

      <section className="size-full pt-5">
        <PaymentTransferForm  />
      </section>
    </section>
  )
}

export default Transfer