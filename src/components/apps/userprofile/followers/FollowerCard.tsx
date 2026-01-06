import React, { useContext } from "react";
import { Icon } from "@iconify/react";
import { Avatar, AvatarImageProps, Badge, Button, TextInput } from "flowbite-react";
import CardBox from "@/components/shared/CardBox";
import { UserDataContext } from '@/app/context/UserDataContext/index';


const FollowerCard = () => {
  const { followers, toggleFollow, setSearch }: any = useContext(UserDataContext);
  return (
    <>
      <div className="md:flex justify-between mb-6">
        <h5 className="text-2xl flex gap-3 items-center sm:my-0 my-4">
          Followers <Badge color={"secondary"}>{followers.length}</Badge>
        </h5>
        <TextInput
          icon={() => <Icon icon="solar:magnifer-line-duotone" height={18} />}
          type="text"
          sizing="md"
          className="form-control "
          placeholder="Search Followers"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="grid grid-cols-12 gap-[30px]">
        {followers.map((profile: { id: React.Key | null | undefined; avatar: string | ((props: AvatarImageProps) => React.ReactElement) | undefined; name: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; country: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; isFollowed: any; }) => {
          return (
            <div
              className="lg:col-span-4 md:col-span-6 sm:col-span-6 col-span-12"
              key={profile.id}
            >
              <CardBox>
                <div className="flex gap-3">
                  <Avatar img={profile.avatar} rounded />
                  <div>
                    <h6 className="text-base">{profile.name}</h6>
                    <p className="flex gap-1 items-center mt-0.5">
                      <Icon icon="solar:map-point-outline" height="14" /> <span className=" truncat line-clamp-1 text-wrap text-darklink dark:text-bodytext">{profile.country}</span>
                    </p>
                  </div>
                  <div className="ms-auto">
                    {profile.isFollowed ? (
                      <Button
                        color={"primary"}
                        size={'sm'}
                        onClick={() => toggleFollow(profile.id)}
                      >
                        Followed
                      </Button>
                    ) : (
                      <Button
                        color={"outlineprimary"}
                        size={'sm'}
                        onClick={() => toggleFollow(profile.id)}
                      >
                        Follow
                      </Button>
                    )}
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

export default FollowerCard;
