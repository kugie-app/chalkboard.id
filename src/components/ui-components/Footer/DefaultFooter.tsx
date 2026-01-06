import { Footer } from "flowbite-react";
import React from "react";
import CardBox from "../../shared/CardBox";
import CodeModal from "../CodeModal";

const DefaultFooter = () => {
  return (
    <div>
      <CardBox>
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-lg font-semibold ">Default Footer</h4>
          <CodeModal>
            {`
    import { Footer } from "flowbite-react";

    <Footer container className="rounded-md">
      <Footer.Copyright href="#" by="MateriaIM" year={2024} />
      <Footer.LinkGroup>
        <Footer.Link href="#">About</Footer.Link>
        <Footer.Link href="#">Privacy Policy</Footer.Link>
        <Footer.Link href="#">Licensing</Footer.Link>
        <Footer.Link href="#">Contact</Footer.Link>
      </Footer.LinkGroup>
    </Footer>
                `}
          </CodeModal>
        </div>
        <Footer container className="rounded-md">
          <Footer.Copyright href="#" by="MateriaIM" year={2024} />
          <Footer.LinkGroup>
            <Footer.Link href="#">About</Footer.Link>
            <Footer.Link href="#">Privacy Policy</Footer.Link>
            <Footer.Link href="#">Licensing</Footer.Link>
            <Footer.Link href="#">Contact</Footer.Link>
          </Footer.LinkGroup>
        </Footer>
      </CardBox>
    </div>
  );
};

export default DefaultFooter;
