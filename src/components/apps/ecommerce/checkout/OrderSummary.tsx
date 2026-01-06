import OutlineCard from '@/components/shared/OutlineCard'
import React from 'react'

const OrderSummary = ({ Discount, total }: any) => {
  return (
    <>
      <OutlineCard className="p-10 mt-6 shadow-none rounded-xl">
        <h5 className="text-lg">Order Summary</h5>
        <div className="flex flex-col gap-5 mt-3">
          <div className="flex justify-between gap-3 items-center">
            <p className="text-base text-ld opacity-70 font-medium">
              Sub Total
            </p>
            <h6 className="text-base">${total}</h6>
          </div>
          <div className="flex justify-between gap-3 items-center">
            <p className="text-base text-ld opacity-70 font-medium">
              Discount 5%
            </p>
            <h6 className="text-base text-error">-${Discount}</h6>
          </div>
          <div className="flex justify-between gap-3 items-center">
            <p className="text-base text-ld opacity-70 font-medium">
              Shipping
            </p>
            <h6 className="text-base">Free</h6>
          </div>
          <div className="flex justify-between gap-3 items-center">
            <p className="text-base text-ld font-semibold">
              Total
            </p>
            <h6 className="text-xl">${total - Discount}</h6>
          </div>
        </div>
      </OutlineCard>
    </>
  )
}

export default OrderSummary
