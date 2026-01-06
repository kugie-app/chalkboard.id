import React from "react";
import CardBox from "../../shared/CardBox";
import { Avatar } from "flowbite-react";
import Image from "next/image";
import CodeModal from "../CodeModal";

const ImageOverride = () => {
  return (
    <div>
      <CardBox>
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-lg font-semibold">Override Image</h4>
          <CodeModal>
            {`
    import { Avatar } from "flowbite-react";
    
     <div className="flex flex-wrap gap-2">
          <Avatar
            img={(props) => (
              <Image
                alt=""
                height="48"
                referrerPolicy="no-referrer"
                src="/images/profile/user-2.jpg"
                width="48"
                {...props}
              />
            )}
          />
          <Avatar
            img={(props) => (
              <picture>
                <source
                  media="(min-width: 900px)"
                  srcSet="/images/profile/user-2.jpg"
                />
                <source
                  media="(min-width: 480px)"
                  srcSet="/images/profile/user-1.jpg"
                />
                <Image
                  alt=""
                  height="48"
                  src="/images/profile/user-1.jpg"
                  width="48"
                  {...props}
                />
              </picture>
            )}
          />
    </div>
              `}
          </CodeModal>
        </div>

        <div className="flex flex-wrap gap-2">
          <Avatar
            img={(props) => (
              <Image
                alt=""
                height="48"
                referrerPolicy="no-referrer"
                src="/images/profile/user-2.jpg"
                width="48"
                {...props}
              />
            )}
          />
          <Avatar
            img={(props) => (
              <picture>
                <source
                  media="(min-width: 900px)"
                  srcSet="/images/profile/user-2.jpg"
                />
                <source
                  media="(min-width: 480px)"
                  srcSet="/images/profile/user-1.jpg"
                />
                <Image
                  alt=""
                  height="48"
                  src="/images/profile/user-1.jpg"
                  width="48"
                  {...props}
                />
              </picture>
            )}
          />
        </div>
      </CardBox>
    </div>
  );
};

export default ImageOverride;
