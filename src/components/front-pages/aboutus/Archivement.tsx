import React from "react";

const Archivement = () => {
  return (
    <>
      <div className="dark:bg-dark border-t border-ld">
        <div className="container-1218 mx-auto lg:py-24 py-12">
          <div className="grid grid-cols-12 gap-6">
            <div className="xl:col-span-5 col-span-12">
              <h2 className="sm:text-44 text-3xl font-bold !leading-[48px] text-darklink dark:text-white">
                A unique story in every number
              </h2>
            </div>
            <div className="xl:col-span-7 col-span-12">
              <div className="flex flex-wrap lg:gap-12 gap-6">
                <div>
                  <h3 className="text-primary lg:text-64 text-5xl leading-tight font-normal">2019</h3>
                  <span className="text-sm text-dark opacity-90">When we founded Modernize</span>
                </div>
                <div>
                  <h3 className="text-primary lg:text-64 text-5xl leading-tight font-normal">300k+</h3>
                  <span className="text-sm text-dark opacity-90">Customers on Modernize</span>
                </div>
                <div>
                  <h3 className="text-primary lg:text-64 text-5xl leading-tight font-normal">25k+</h3>
                  <span className="text-sm text-dark opacity-90">
                    Dashboards built using MatDash
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Archivement;
