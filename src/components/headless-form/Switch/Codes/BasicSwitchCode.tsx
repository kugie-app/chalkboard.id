import CodeModal from "@/components/ui-components/CodeModal";
import React from "react";

const BasicSwitchCode = () => {
  return (
    <div>
      <CodeModal>
        {`
    "use client";
    import { Switch } from "@headlessui/react";
    import { useState } from "react";

    const [enabled, setEnabled] = useState(false);

    <div className="flex flex-wrap gap-3">
        <Switch
          checked={enabled}
          onChange={setEnabled}
          className="group inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition data-[checked]:bg-primary"
        >
          <span className="size-4 translate-x-1 rounded-full bg-white transition group-data-[checked]:translate-x-6" />
        </Switch>  
        <Switch
          checked={enabled}
          onChange={setEnabled}
          className="group inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition data-[checked]:bg-secondary"
        >
          <span className="size-4 translate-x-1 rounded-full bg-white transition group-data-[checked]:translate-x-6" />
        </Switch>  
        <Switch
          checked={enabled}
          onChange={setEnabled}
          className="group inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition data-[checked]:bg-success"
        >
          <span className="size-4 translate-x-1 rounded-full bg-white transition group-data-[checked]:translate-x-6" />
        </Switch>    
        <Switch
          checked={enabled}
          onChange={setEnabled}
          className="group inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition data-[checked]:bg-error"
        >
          <span className="size-4 translate-x-1 rounded-full bg-white transition group-data-[checked]:translate-x-6" />
        </Switch>      
        <Switch
          checked={enabled}
          onChange={setEnabled}
          className="group inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition data-[checked]:bg-warning"
        >
          <span className="size-4 translate-x-1 rounded-full bg-white transition group-data-[checked]:translate-x-6" />
        </Switch> 
        <Switch
          checked={enabled}
          onChange={setEnabled}
          className="group inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition data-[checked]:bg-info"
        >
          <span className="size-4 translate-x-1 rounded-full bg-white transition group-data-[checked]:translate-x-6" />
        </Switch> 
        </div>
            `}
      </CodeModal>
    </div>
  );
};

export default BasicSwitchCode;
