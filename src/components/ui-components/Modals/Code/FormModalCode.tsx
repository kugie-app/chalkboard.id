import React from "react";
import CodeModal from "../../CodeModal";

const FormModalCode = () => {
  return (
    <div>
      <CodeModal>
        {`
    "use client";
    const [formModal, setFormModal] = useState(false);
    const [email, setEmail] = useState("");
    function onCloseModal() {
        setFormModal(false);
        setEmail("");
      }
    
    <Button
    onClick={() => setFormModal(true)}
    className="w-fit"
    color="info"
    >
    Modal with form elements
    </Button>
    <Modal show={formModal} size="md" onClose={onCloseModal} popup>
        <Modal.Header className="px-6 pb-4">Sign in to our platform</Modal.Header>
        <Modal.Body>
            <div className="space-y-6">
            
            <div>
                <div className="mb-2 block">
                <Label htmlFor="email" value="Your email" />
                </div>
                <TextInput
                id="email"
                placeholder="name@company.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
                />
            </div>
            <div>
                <div className="mb-2 block">
                <Label htmlFor="password" value="Your password" />
                </div>
                <TextInput id="password" type="password" required />
            </div>
            <div className="flex justify-between">
                <div className="flex items-center gap-2">
                <Checkbox id="remember" />
                <Label htmlFor="remember">Remember me</Label>
                </div>
                <a
                href="#"
                className="text-sm text-cyan-700 hover:underline dark:text-cyan-500"
                >
                Lost Password?
                </a>
            </div>
            <div className="w-full">
                <Button className=" bg-primary">
                Log in to your account
                </Button>
            </div>
            <div className="flex justify-between text-sm font-medium text-gray-500 dark:text-gray-300">
                Not registered?&nbsp;
                <a
                href="#"
                className="text-cyan-700 hover:underline dark:text-cyan-500"
                >
                Create account
                </a>
            </div>
            </div>
        </Modal.Body>
    </Modal>
              `}
      </CodeModal>
    </div>
  );
};

export default FormModalCode;
