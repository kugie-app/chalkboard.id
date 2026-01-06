import { useRouter } from 'next/navigation';
import { useContext, useState } from 'react';
import { TicketType } from '@/app/[locale]/(DashboardLayout)/types/apps/ticket';
import { Avatar, Badge, Button, Table, TextInput, Tooltip } from 'flowbite-react';
import { format } from 'date-fns';
import { Icon } from '@iconify/react/dist/iconify.js';
import { TicketContext } from '@/app/context/TicketContext';

const TicketListing = () => {
  const { tickets, deleteTicket, searchTickets, ticketSearch, filter }: any =
    useContext(TicketContext);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const router = useRouter();

  const getVisibleTickets = (
    tickets: TicketType[],
    filter: string,
    ticketSearch: string
  ) => {
    switch (filter) {
      case "total_tickets":
        return tickets.filter(
          (c) =>
            !c.deleted &&
            c.ticketTitle.toLocaleLowerCase().includes(ticketSearch)
        );

      case "Pending":
        return tickets.filter(
          (c) =>
            !c.deleted &&
            c.Status === "Pending" &&
            c.ticketTitle.toLocaleLowerCase().includes(ticketSearch)
        );

      case "Closed":
        return tickets.filter(
          (c) =>
            !c.deleted &&
            c.Status === "Closed" &&
            c.ticketTitle.toLocaleLowerCase().includes(ticketSearch)
        );

      case "Open":
        return tickets.filter(
          (c) =>
            !c.deleted &&
            c.Status === "Open" &&
            c.ticketTitle.toLocaleLowerCase().includes(ticketSearch)
        );

      default:
        throw new Error(`Unknown filter: ${filter}`);
    }
  };

  const visibleTickets = getVisibleTickets(
    tickets,
    filter,
    ticketSearch.toLowerCase()
  );

  const ticketBadge = (ticket: TicketType) => {
    return ticket.Status === "Open"
      ? "success"
      : ticket.Status === "Closed"
        ? "error"
        : ticket.Status === "Pending"
          ? "warning"
          : ticket.Status === "Moderate"
            ? "primary"
            : "primary";
  };

  return (
    <>
      <div className="my-6">
        <div className="flex justify-between items-center mb-4">
          <Button
            onClick={() => router.push('/apps/tickets/create')}
            color={'primary'}
          >
            Create Ticket
          </Button>
          <TextInput
            type="text"
            sizing="md"
            className="form-control sm:max-w-60 max-w-full w-full"
            onChange={(e) => searchTickets(e.target.value)}
            placeholder="Search"
            icon={() => <Icon icon="solar:magnifer-line-duotone" height={18} />}
          />
        </div>
        <div className="overflow-x-auto">
          <Table>
            <Table.Head>
              <Table.HeadCell className="text-base font-semibold py-3 whitespace-nowrap">
                Id
              </Table.HeadCell>
              <Table.HeadCell className="text-base font-semibold py-3 whitespace-nowrap">
                Ticket
              </Table.HeadCell>
              <Table.HeadCell className="text-base font-semibold py-3 whitespace-nowrap">
                Assigned To
              </Table.HeadCell>
              <Table.HeadCell className="text-base font-semibold py-3 whitespace-nowrap">
                Status
              </Table.HeadCell>
              <Table.HeadCell className="text-base font-semibold py-3 whitespace-nowrap">
                Date
              </Table.HeadCell>
              <Table.HeadCell className="text-base font-semibold py-3 text-end">
                Action
              </Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y divide-border dark:divide-darkborder">
              {visibleTickets.map((ticket) => (
                <Table.Row key={ticket.Id}>
                  <Table.Cell className="whitespace-nowrap">
                    {ticket.Id}
                  </Table.Cell>
                  <Table.Cell className="max-w-md">
                    <h6 className="text-base truncate line-clamp-1">{ticket.ticketTitle}</h6>
                    <p className="text-sm text-darklink dark:text-bodytext truncate line-clamp-1 text-wrap sm:max-w-56">
                      {ticket.ticketDescription}
                    </p>
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div>
                        <Avatar
                          img={ticket.thumb}
                          alt={ticket.AgentName}
                          rounded
                        />
                      </div>
                      <h6 className="text-base"> {ticket.AgentName}</h6>
                    </div>
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap">
                    <Badge
                      className={`bg-light${ticketBadge(ticket)} dark:bg-dark${ticketBadge(ticket)} text-${ticketBadge(ticket)}`}
                    >
                      {ticket.Status}
                    </Badge>
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap">
                    <p className="text-sm text-darklink dark:text-bodytext">
                      {format(new Date(ticket.Date), "E, MMM d")}
                    </p>
                  </Table.Cell>
                  <Table.Cell>
                    <Tooltip content="Delete Ticket" placement="bottom" arrow={false}>
                      <Button className="btn-circle ms-auto" color={"transparent"}>
                        <Icon icon="solar:trash-bin-minimalistic-outline" height="18" onClick={() => deleteTicket(ticket.Id)} />
                      </Button>
                    </Tooltip>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
      </div>
    </>
  );
};

export default TicketListing;
