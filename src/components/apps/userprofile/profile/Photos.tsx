import React from "react";
import Image from "next/image";
import user1 from "/public/images/profile/user-2.jpg";
import user2 from "/public/images/profile/user-3.jpg";
import user3 from "/public/images/profile/user-4.jpg";
import user4 from "/public/images/profile/user-5.jpg";
import user5 from "/public/images/profile/user-6.jpg";
import user6 from "/public/images/profile/user-7.jpg";
import user7 from "/public/images/profile/user-8.jpg";
import user8 from "/public/images/profile/user-9.jpg";
import user9 from "/public/images/profile/user-10.jpg";
import CardBox from "@/components/shared/CardBox";

const photos = [
  {
    cardimage: user1,
    id: 1,
  },
  {
    cardimage: user2,
    id: 2,
  },
  {
    cardimage: user3,
    id: 3,
  },
  {
    cardimage: user4,
    id: 4,
  },
  {
    cardimage: user5,
    id: 5,
  },
  {
    cardimage: user6,
    id: 6,
  },
  {
    cardimage: user7,
    id: 7,
  },
  {
    cardimage: user8,
    id: 8,
  },
  {
    cardimage: user9,
    id: 9,
  },
];

const Photos = () => {
  return (
    <>
      <CardBox>
        <h5 className="card-title mb-2">Photos</h5>
        <div className="grid grid-cols-12 gap-5">
          {photos.map((photo) => (
            <div key={photo.id} className="md:col-span-4 sm:col-span-6 col-span-4">
              <Image src={photo.cardimage} alt="profile" className="rounded-md" />
            </div>
          ))}
        </div>
      </CardBox>
    </>
  );
};

export default Photos;
