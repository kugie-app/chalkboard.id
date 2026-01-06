import { Card } from "flowbite-react";
import React from "react";
import CardBox from "../../shared/CardBox";
import CodeModal from "../CodeModal";

const DefaultCard = () => {
  return (
    <div>
      <CardBox>
      <div className="flex items-center justify-between mb-2">
      <h4 className="text-lg font-semibold">Default Card</h4>
          <CodeModal>
            {`
    import { Card } from "flowbite-react";

    <Card href="#">
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Noteworthy technology acquisitions
          </h5>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout. The point
            of using Lorem Ipsum is that it has a more-or-less normal
            distribution of letters, as opposed to using more-or-less normal
            distribution of letters, as opposed to using more-or-less normal
            distribution of letters
          </p>
    </Card>
            `}
          </CodeModal>
        </div>
        
        <Card href="#" >
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Noteworthy technology acquisitions
          </h5>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout. The point
            of using Lorem Ipsum is that it has a more-or-less normal
            distribution of letters, as opposed to using more-or-less normal
            distribution of letters, as opposed to using more-or-less normal
            distribution of letters
          </p>
        </Card>
      </CardBox>
    </div>
  );
};

export default DefaultCard;
