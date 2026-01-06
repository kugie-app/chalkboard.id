import React from "react";
import leader1 from "/public/images/front-pages/team/leader1.png";
import leader2 from "/public/images/front-pages/team/leader2.png";
import leader3 from "/public/images/front-pages/team/leader3.png";
import leader4 from "/public/images/front-pages/team/leader4.png";
import Image from "next/image";
const OurTeam = () => {
  const team = [
    {
      img: leader1,
      name: "Alex Martinez",
      position: "CEO & Co-Founder",
    },
    {
      img: leader2,
      name: "Jordan Nguyen",
      position: "CTO & Co-Founder",
    },
    {
      img: leader3,
      name: "Taylor Roberts",
      position: "Product Manager",
    },
    {
      img: leader4,
      name: "Morgan Patel",
      position: "Lead Developer",
    },
  ];
  return (
    <>
      <div className="bg-sky lg:py-24 py-12">
        <div className="container-1218 mx-auto">
          <div className="grid grid-cols-12 gap-30 flex justify-between pb-12">
            <div className="lg:col-span-7 col-span-12">
              <h2 className="sm:text-44 text-3xl font-bold !leading-[48px] text-white">
                Meet our team
              </h2>
            </div>
            <div className="lg:col-span-5 col-span-12">
              <p className="text-17 leading-[32px] lg:ps-5">
                Our robust analytics offer rich insights into the information
                buyers want, informing where teams
              </p>
            </div>
          </div>
          <div className="grid grid-cols-12 gap-30">
            {team.map((item, index) => (
              <div
                className="lg:col-span-3 md:col-span-6 col-span-12"
                key={index}
              >
                <div className="relative group">
                  <Image src={item.img} alt="team-member" />
                  <div className="bg-white dark:bg-dark text-center rounded-md py-4 px-3 absolute bottom-3 start-3 end-3 lg:opacity-0 opacity-100 group-hover:opacity-100 transition-[0.5s]">
                    <h5 className="text-lg">{item.name}</h5>
                    <span>{item.position}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default OurTeam;
