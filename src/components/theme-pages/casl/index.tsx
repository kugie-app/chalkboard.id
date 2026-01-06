"use client";
import React from "react";
import { defineAbility } from "@casl/ability";
import { Can } from "@casl/react";
import CardBox from "@/components/shared/CardBox";
import { Button, ListGroup, ListItem } from "flowbite-react";

interface actionType {
  action: string;
  subject: string;
}

interface PermissionType {
  CanEdit: actionType;
  CanDelete: actionType;
}

const permissions: PermissionType | any = {
  CanEdit: {
    action: "Can-Edit",
    subject: "address",
  },
  CanDelete: {
    action: "Can-Delete",
    subject: "address",
  },
};

interface userType {
  Admin: {
    permissions: Array<string>;
  };
  Manager: {
    permissions: Array<string>;
  };
  Subscriber: {
    permissions: Array<string>;
  };
}

const users: userType | any = {
  Admin: {
    permissions: ["CanEdit", "CanDelete"],
  },
  Manager: {
    permissions: ["CanEdit"],
  },
  Subscriber: {
    permissions: [],
  },
};

interface addressType {
  city: string;
  street: string;
  type: string;
}

const addresses: addressType[] = [
  {
    city: "New York",
    street: "5684 Max Summit",
    type: "address",
  },
  {
    city: "Manhatten York",
    street: "5684 Max Summit",
    type: "address",
  },
  {
    city: "Canada street York",
    street: "5684 Max Summit",
    type: "address",
  },
  {
    city: "Delhi street",
    street: "5684 Max Summit",
    type: "address",
  },
  {
    city: "UP Chawk",
    street: "5684 Max Summit",
    type: "address",
  },
];

const RollBaseIndex = () => {
  const [userId, setUserId] = React.useState(Object.keys(users)[0]);
  const userPermissions = users[userId].permissions.map(
    (id: number) => permissions[id]
  );

  const actions = [
    ...userPermissions.reduce(
      (collection: any, { action }: { action: any }) => {
        collection.add(action);

        return collection;
      },
      new Set()
    ),
  ];

  const ability = defineAbility((can) => {
    userPermissions.forEach(
      ({ action, subject }: { action: any; subject: any }) => {
        can(action, subject);
      }
    );
  });
  return (
    <>
      <CardBox>
        <div className="flex gap-2">
          {Object.entries(users).map(([id]) => {
            return (
              <>
                {userId !== id ? (
                  <Button
                    color={"outlineprimary"}
                    key={id}
                    onClick={() => setUserId(id)}
                  >
                    {id}
                  </Button>
                ) : (
                  <Button
                    color={"primary"}
                    key={id}
                    onClick={() => setUserId(id)}
                  >
                    {id}
                  </Button>
                )}
              </>
            );
          })}
        </div>

        <div className="bg-lightprimary dark:bg-lightprimary p-4 rounded-md my-2">
          {users[userId].permissions.map((permission: string) => (
            <h5 key={permission} className="text-sm opacity-80">
              {permission}
            </h5>
          ))}
        </div>

        <ListGroup className="border-0 dark:bg-transparent p-2">
          {addresses.map(({ city, street, type }) => (
            <ListItem key={city} className="mb-3">
              
                <div className="flex items-center gap-3">
                  <span className="text-bodytext font-normal">
                    {city}, {street}
                  </span>
                  {actions.map((action) => (
                    <Can I={action} a={type} ability={ability} key={action}>
                      <Button color={"lightprimary"} size="xs">
                        {action}
                      </Button>
                    </Can>
                  ))}
                </div>
              
            </ListItem>
          ))}
        </ListGroup>
      </CardBox>
    </>
  );
};

export default RollBaseIndex;
