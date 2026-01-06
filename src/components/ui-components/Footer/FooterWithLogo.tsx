import FullLogo from "@/components/layout/shared/logo/FullLogo";
import { Footer } from "flowbite-react";
import React from "react";
import CardBox from "../../shared/CardBox";
import CodeModal from "../CodeModal";

const FooterWithLogo = () => {
  return (
    <div>
      <CardBox>
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-lg font-semibold">Footer With Logo</h4>
          <CodeModal>
            {`
    import { Footer } from "flowbite-react";
    
    <Footer container className="rounded-md">
      <div className="w-full text-center">
        <div className="w-full justify-between sm:flex sm:items-center sm:justify-between">
          <FullLogo/>
          <Footer.LinkGroup>
            <Footer.Link href="#">About</Footer.Link>
            <Footer.Link href="#">Privacy Policy</Footer.Link>
            <Footer.Link href="#">Licensing</Footer.Link>
            <Footer.Link href="#">Contact</Footer.Link>
          </Footer.LinkGroup>
        </div>
        <Footer.Divider />
        <Footer.Copyright href="#" by="MateriaIM" year={2024} />
      </div>
    </Footer>
                `}
          </CodeModal>
        </div>
        <Footer container className="rounded-md">
          <div className="w-full text-center">
            <div className="w-full justify-between sm:flex sm:items-center sm:justify-between">
              <FullLogo />
              <Footer.LinkGroup>
                <Footer.Link href="#">About</Footer.Link>
                <Footer.Link href="#">Privacy Policy</Footer.Link>
                <Footer.Link href="#">Licensing</Footer.Link>
                <Footer.Link href="#">Contact</Footer.Link>
              </Footer.LinkGroup>
            </div>
            <Footer.Divider />
            <Footer.Copyright href="#" by="MateriaIM" year={2024} />
          </div>
        </Footer>
      </CardBox>
    </div>
  );
};

export default FooterWithLogo;
