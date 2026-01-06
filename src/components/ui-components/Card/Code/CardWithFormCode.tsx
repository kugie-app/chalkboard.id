import React from "react";
import CodeModal from "../../CodeModal";

const CardWithFormCode = () => {
  return (
    <div>
      <CodeModal>
        {`
    import { Card, Label, TextInput, Checkbox, Button } from "flowbite-react";    
    <Card>
          <form className="flex flex-col gap-4">
            <div>
              <div className="mb-2 block">
                <Label htmlFor="email1" value="Your email" />
              </div>
              <TextInput
                id="email1"
                type="email"
                placeholder="info@matdash.com"
                className="form-control"
                required
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="password1" value="Your password" />
              </div>
              <TextInput
                id="password1"
                type="password"
                className="form-control"
                required
              />
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="remember" className="checkbox" />
              <Label htmlFor="remember">Remember me</Label>
            </div>
            <Button type="submit" color="primary">
              Submit
            </Button>
          </form>
    </Card>

        `}
      </CodeModal>
    </div>
  );
};

export default CardWithFormCode;
