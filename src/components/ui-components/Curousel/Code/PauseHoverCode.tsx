import React from "react";
import CodeModal from "../../CodeModal";

const PauseHoverCode = () => {
  return (
    <div>
      <CodeModal>
        {`
    "use client"
    import { Carousel } from "flowbite-react";

    <Carousel pauseOnHover>
      <img
        src="/images/blog/blog-img1.jpg"
        alt="..."
      />
      <img
        src="/images/blog/blog-img2.jpg"
        alt="..."
      />
      <img
        src="/images/blog/blog-img3.jpg"
        alt="..."
      />
      <img
        src="/images/blog/blog-img4.jpg"
        alt="..."
      />
      <img
        src="/images/blog/blog-img5.jpg"
        alt="..."
      />
    </Carousel>
                `}
      </CodeModal>
    </div>
  );
};

export default PauseHoverCode;
