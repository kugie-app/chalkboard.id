"use client";
import ProductFilter from "@/components/apps/ecommerce/productGrid/ProductFilter";
import ProductList from "@/components/apps/ecommerce/productGrid/ProductList";
import CardBox from "@/components/shared/CardBox";
import { ProductProvider } from '@/app/context/Ecommercecontext/index';
import { Drawer } from "flowbite-react";
import { useState } from "react";

const EcommerceShop = () => {
  const [isOpenShop, setIsOpenShop] = useState(false);
  const handleClose = () => setIsOpenShop(false);

  return (
    <>
      <ProductProvider>
        <CardBox className="p-0">
          {/* ------------------------------------------- */}
          {/* Left part */}
          {/* ------------------------------------------- */}
          <div className="flex">
            <Drawer
              open={isOpenShop}
              onClose={handleClose}
              className="lg:relative lg:transform-none lg:h-auto lg:bg-transparent max-w-[250px] w-full lg:z-[0]"
            >
              <ProductFilter />
            </Drawer>
            {/* ------------------------------------------- */}
            {/* Right part */}
            {/* ------------------------------------------- */}
            <div className="p-6 w-full">
              <ProductList openShopFilter={setIsOpenShop} />
            </div>
          </div>
        </CardBox>
      </ProductProvider>
    </>
  );
};

export default EcommerceShop;
