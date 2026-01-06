import React, { useContext } from "react";
import { TbDotsVertical } from "react-icons/tb";
import { format } from "date-fns";
import { Badge, Dropdown, TextInput } from "flowbite-react";
import { Icon } from "@iconify/react";
import CardBox from "@/components/shared/CardBox";
import Image from "next/image";
import { UserDataContext } from '@/app/context/UserDataContext/index';


const PortfolioCards = () => {

  const { gallery }: any = useContext(UserDataContext);
  const [search, setSearchLocal] = React.useState('');

  const filterPhotos = (photos: any[], cSearch: string) => {
    if (photos)
      return photos.filter((t: { name: string; }) => t.name.toLocaleLowerCase().includes(cSearch.toLocaleLowerCase()));
    return photos;
  };

  const getPhotos = filterPhotos(gallery, search);

  return (
    <>
      <div className="md:flex justify-between mb-6">
        <h5 className="text-2xl flex gap-3 items-center sm:my-0 my-4">
          Portfolio <Badge color={"secondary"}>{getPhotos.length}</Badge>
        </h5>
        <TextInput
          icon={() => <Icon icon="solar:magnifer-line-duotone" height={18} />}
          type="text"
          sizing="md"
          className="form-control "
          placeholder="Search Gallery"
          onChange={(e) => setSearchLocal(e.target.value)}
        />
      </div>
      <div className="grid grid-cols-12 gap-[30px]">
        {getPhotos.map((photo) => {
          return (
            <div
              className="lg:col-span-4 md:col-span-4 sm:col-span-6 col-span-12"
              key={photo.id}
            >
              <CardBox className="overflow-hidden p-0 card-hover">
                <div className="h-[220px]  overflow-hidden">
                  <Image
                    src={photo.cover}
                    height={220}
                    width={500}
                    alt="gllery"
                    className="object-center object-cover h-full"
                  />
                </div>
                <div className="pt-4 p-6 flex">
                  <div>
                    <h6 className="text-sm">{photo.name}jpg</h6>
                    <p className="text-xs font-medium text-darklink dark:text-bodytext">
                      {" "}
                      {format(new Date(photo.time), "E, MMM d, yyyy")}
                    </p>
                  </div>
                  <div className="ms-auto">
                    <Dropdown
                      label=""
                      dismissOnClick={false}
                      renderTrigger={() => (
                        <span className="h-9 w-9 flex justify-center items-center rounded-full hover:bg-lightprimary hover:text-primary cursor-pointer">
                          <TbDotsVertical size={22} />
                        </span>
                      )}
                    >
                      <Dropdown.Item className="flex gap-3">
                        <span>{photo.name}.jpg</span>
                      </Dropdown.Item>
                    </Dropdown>
                  </div>
                </div>
              </CardBox>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default PortfolioCards;
