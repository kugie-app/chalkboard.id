"use client";
import { MdCheck } from "react-icons/md";
import "flowbite";
import { Badge, Button, HR, Rating } from "flowbite-react";
import Link from "next/link";
import React, { useContext, useState } from "react";
import { ProductContext } from '@/app/context/Ecommercecontext/index';
import { useParams } from "next/navigation";
import { ProductType } from '@/app/[locale]/(DashboardLayout)/types/apps/eCommerce';

const ProductDetail = () => {
  const { products, addToCart } = useContext(ProductContext);
  const { id } = useParams<{ id: string }>();

  // Find product by id
  const product: ProductType | undefined = products.find((prod) => prod.id === parseInt(id as string));

  // States for color selection and quantity
  const [scolor, setScolor] = useState<string>(product ? product.colors[0] : '');
  const [count, setCount] = useState<number>(1);


  // Handle color selection
  const setColor = (color: string) => {
    setScolor(color);
  };

  // Handle quantity change
  const handleQuantityChange = (increment: boolean) => {
    if (increment) {
      setCount(count + 1);
    } else {
      setCount(count > 1 ? count - 1 : 1);
    }
  };

  // Handle adding to cart
  const handleAddToCart = () => {
    if (product) {
      addToCart({ ...product, qty: count });
    }
  };

  return (
    <>
      {/* Category */}
      {product ? (
        <>
          <div className="flex gap-2 items-center">
            <Badge color={"success"}>{product.stock == true ? 'In Stock' : ' Out Of Stock'}</Badge>
            <span className="text-xs text-darklink dark:text-bodytext"> {product.category}</span>
          </div>
          <h4 className="text-xl my-2">{product.title}</h4>
          <p className="text-sm text-darklink dark:text-bodytext">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ex arcu,
            tincidunt bibendum felis.
          </p>
          {/* Price */}
          <h5 className="text-xl flex gap-2 items-center my-3">
            <span className="font-normal text-lg text-darklink dark:text-bodytext line-through font-semibold">
              ${product.salesPrice}
            </span>

            ${product.price}
          </h5>
          {/* Rattings */}
          <div className="flex items-center gap-2">
            <Rating size={"cs"} >
              <Rating.Star />
              <Rating.Star />
              <Rating.Star />
              <Rating.Star />
              <Rating.Star filled={false} />
            </Rating>
            <span className="text-sm text-ld font-medium">(236 reviews)</span>
          </div>
          <HR className="my-6" />
          {/* Colors */}
          <div className="flex items-center gap-5 mb-8">
            <span className="text-base text-ld font-semibold">Colors:</span>
            {product.colors.map((color) => (
              <div className="flex gap-3">
                <div className={`h-6 w-6 rounded-full cursor-pointer flex items-center justify-center ${scolor === color ? `bg-${color}` : ''}`} onClick={() => setColor(color)}
                  style={{
                    transition: '0.1s ease-in',
                    backgroundColor: `${color}`,
                  }}
                >   {scolor === color ? <MdCheck size={16} className="text-white" />
                  : ''}</div>
              </div>
            ))}
          </div>
          {/* Qty */}
          <div className="flex items-center gap-10">
            <span className="text-base text-ld font-semibold">QTY:</span>
            <form className="max-w-xs">
              <div className="relative flex items-center ">
                <button
                  type="button"
                  id="decrement-button"
                  data-input-counter-decrement="quantity-input"
                  onClick={() => handleQuantityChange(false)}
                  className="focus:ring-0 focus:outline-none border border-ld h-10 min-w-10 rounded-s-md rounded-e-none text-center flex justify-center items-center hover:bg-lightprimary hover:text-primary"
                >
                  <span className="text-3xl">-</span>
                </button>

                <input
                  type="text"
                  id="quantity-input"
                  data-input-counter
                  aria-describedby="helper-text-explanation"
                  className="!rounded-s-none !rounded-e-none text-center h-10 !border-x-0 w-fit max-w-12 border-y border-ld !focus:ring-0 focus:border-ld focus:ring-transparent focus:ring-offset-0 bg-transparent"
                  placeholder="0"
                  required
                  value={count}

                />

                <button
                  type="button"
                  id="increment-button"
                  data-input-counter-increment="quantity-input"
                  onClick={() => handleQuantityChange(true)}
                  className="focus:ring-0 focus:outline-none border border-ld h-10 min-w-10 rounded-e-md rounded-s-none text-center flex justify-center items-center hover:bg-lightprimary hover:bg-lightprimary hover:text-primary"
                >
                  <span className="text-2xl">+</span>
                </button>
              </div>
            </form>
          </div>
          <HR className="my-6" />
          {/* Action Buttons */}
          <div className="flex gap-3 items-center mb-6">
            <Button color={"primary"} className="px-6  rounded-xl" onClick={handleAddToCart}>
              Buy now
            </Button>
            <Button color={"error"} className="px-6  rounded-xl" onClick={handleAddToCart}>
              Add to Cart
            </Button>
          </div>
          <p className="text-sm text-darklink dark:text-bodytext ">Dispatched in 2-3 weeks</p>
          <Link href="" className="text-sm text-ld text-primary-ld font-medium">
            Why the longer time for delivery?
          </Link>
        </>
      ) : (
        'No product'
      )}
    </>
  );
};

export default ProductDetail;
