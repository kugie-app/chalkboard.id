"use client";
import { Button, Rating, Tooltip, Alert } from "flowbite-react";
import React, { useState, useContext, SetStateAction, Dispatch } from "react";
import CardBox from "@/components/shared/CardBox";
import Link from "next/link";
import Image from "next/image";
import { Icon } from "@iconify/react";
import ProductSearch from "./ProductSearch";
import { ProductContext } from "@/app/context/Ecommercecontext/index";
import NoProduct from "/public/images/backgrounds/empty-shopping-cart.svg";

type ShopProps = {
  openShopFilter: Dispatch<SetStateAction<boolean>>;
};

const ProductList = ({ openShopFilter }: ShopProps) => {
  const { filteredAndSortedProducts, addToCart, filterReset } =
    useContext(ProductContext);
  const [cartAlert, setCartAlert] = useState(false);
  const handleClick = () => {
    setCartAlert(true);
    setTimeout(() => {
      setCartAlert(false);
    }, 3000);
  };



  return (
    <>
      {/* Search Products */}
      <ProductSearch onClickFilter={() => openShopFilter(true)} />
      <div className="grid grid-cols-12 gap-6 mt-6">
        {filteredAndSortedProducts.length > 0 ? (
          filteredAndSortedProducts.map((product) => (
            <div
              className="lg:col-span-4 md:col-span-6 col-span-12"
              key={product.id}
            >
              <CardBox className="p-0 overflow-hidden group card-hover">
                <div className="relative">
                  <Link href={`/apps/ecommerce/detail/${product.id}`}>
                    <div className="overflow-hidden h-[265px] w-full">
                      <Image
                        src={product.photo}
                        alt="MatDash"
                        height={265}
                        width={500}
                        className=" w-full h-full object-cover"
                      />
                    </div>
                  </Link>
                  <div className="p-6 pt-4">
                    <div className="flex justify-between items-center -mt-8 ">
                      <div className="ms-auto">
                        <Tooltip content={"Add To Cart"} className="">
                          <Button
                            color={"primary"}
                            className="btn-circle ms-auto p-0 !rounded-full"
                            onClick={() => {
                              addToCart(product.id);
                              handleClick();
                            }}
                          >
                            <Icon icon="solar:cart-3-outline" height={18} />
                          </Button>
                        </Tooltip>
                      </div>
                    </div>
                    <h6 className="text-base line-clamp-1 group-hover:text-primary">
                      {product.title}
                    </h6>
                    <div className="flex justify-between items-center mt-1">
                      <h5 className="text-base flex gap-2 items-center">
                        ${product.price}{" "}
                        <span className="font-normal text-sm text-darklink dark:text-bodytext line-through">
                          ${product.salesPrice}
                        </span>
                      </h5>
                      {product.rating == 5 ? (
                        <Rating size={"sm"}>
                          <Rating.Star />
                          <Rating.Star />
                          <Rating.Star />
                          <Rating.Star />
                          <Rating.Star />
                        </Rating>
                      ) : product.rating == 4 ? (
                        <Rating size={"sm"}>
                          <Rating.Star />
                          <Rating.Star />
                          <Rating.Star />
                          <Rating.Star />
                          <Rating.Star filled={false} />
                        </Rating>
                      ) : (
                        <Rating size={"sm"}>
                          <Rating.Star />
                          <Rating.Star />
                          <Rating.Star />
                          <Rating.Star filled={false} />
                          <Rating.Star filled={false} />
                        </Rating>
                      )}
                    </div>
                  </div>
                </div>
              </CardBox>
            </div>
          ))
        ) : (
          <>
            <div className="col-span-12">
              <div className="flex justify-center text-center">
                <div>
                  <Image src={NoProduct} alt="no product" height={400} />
                  <h2 className="text-2xl">There is no Product</h2>
                  <p className="text-darklink dark:text-bodytext my-3">
                    The product you are searching for is no longer available.
                  </p>
                  <Button
                    color={"primary"}
                    className="w-fit px-4 mx-auto"
                    onClick={filterReset}
                  >
                    Try Again
                  </Button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      {cartAlert && (
        <Alert color="primary" rounded className="fixed top-3 ">
          Item Added to the Cart!!!
        </Alert>
      )}
    </>
  );
};
export default ProductList;
