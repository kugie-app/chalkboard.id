"use client";
import React from "react";

import CardBox from "@/components/shared/CardBox";
import Image from "next/image";
import Link from "next/link";
import { Button, Rating, Tooltip } from "flowbite-react";
import { Icon } from "@iconify/react";
import { ProductsData } from "../productData";
const ProductRelated = () => {
  return (
    <>
      <div className="mt-10">
        <h5 className="text-xl">Related Products</h5>
        <div className="grid grid-cols-12 gap-5 mt-4">
          {ProductsData.map((product) => (
            <>
              {product.related == true ? (
                <div
                  className="lg:col-span-3 md:col-span-6 col-span-12"
                  key={product.id}
                >
                  <CardBox className="p-0 overflow-hidden group card-hover group">
                    <div className="relative">
                      <Link href={`/apps/blog/detail/${product.id}`}>
                        <div className="overflow-hidden h-[265px]">
                          <Image
                            src={product.photo}
                            alt="MatDash"
                            height={265}
                            width={500}
                            className="w-100"
                          />
                        </div>
                        <div className="p-6 pt-4">
                          <div className="flex justify-between items-center -mt-8 ">
                            <div className="ms-auto">
                              <Tooltip content={"Add To Cart"} className="">
                                <Button
                                  color={"primary"}
                                  className="btn-circle ms-auto p-0 !rounded-full"
                                >
                                  <Icon icon='solar:cart-3-outline' height={18} />
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
                      </Link>
                    </div>
                  </CardBox>
                </div>
              ) : null}
            </>
          ))}
        </div>
      </div>
    </>
  );
};

export default ProductRelated;
