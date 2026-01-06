"use client";
import Link from "next/link";
import CardBox from "../../shared/CardBox";

const RecentTransactionData = [
  {
    title: "09:30 ",
    subtitle: "Payment received from John Doe of $385.90",
    textcolor: "primary",
    boldtext: false,
    line: true,
    link: "",
    url: "",
  },
  {
    title: "10:00 ",
    subtitle: "New sale recorded",
    textcolor: "warning",
    boldtext: true,
    line: true,
    link: "#ML-3467",
    url: "",
  },
  {
    title: "12:00 ",
    subtitle: "Payment was made of $64.95 to Michael",
    textcolor: "warning",
    boldtext: false,
    line: true,
    link: "",
    url: "",
  },
  {
    title: "09:30 ",
    subtitle: "New sale recorded",
    textcolor: "secondary",
    boldtext: true,
    line: true,
    link: "#ML-3467",
    url: "",
  },
  {
    title: "09:30 ",
    subtitle: "Project meeting",
    textcolor: "error",
    boldtext: true,
    line: true,
    link: "",
    url: "",
  },
  {
    title: "12:00 ",
    subtitle: "Payment received from John Doe of $385.90",
    textcolor: "primary",
    boldtext: false,
    line: false,
    link: "",
    url: "",
  },
];

const RecentTransactionCard = () => {
  return (
    <>
      <CardBox className="pb-4">
        <h5 className="card-title">Recent Transactions</h5>
        <div className="mt-6">
          {RecentTransactionData.map((item, i) => (
            <div className="flex gap-x-3" key={i}>
              <div className="w-1/6 text-end">
                <span className="text-dark dark:text-white font-medium text-sm  opacity-80">
                  {item.title}
                </span>
              </div>
              <div className="relative">
                <div className="relative z-10 w-7 h-5 flex justify-center items-center ">
                  <div
                    className={`h-3 w-3 rounded-full  bg-${item.textcolor}`}
                  ></div>
                </div>
                {item.line ? (
                  <div className="border-s border-ld h-full -mt-2 ms-3.5"></div>
                ) : (
                  <div className="border-0"></div>
                )}
              </div>
              <div className="w-1/4 grow pt-0.5 pb-5">
                {item.boldtext ? (
                  <p className="text-dark dark:text-white font-semibold">
                    {item.subtitle}
                  </p>
                ) : (
                  <p className="text-dark dark:text-white font-medium">
                    {item.subtitle}
                  </p>
                )}

                {item.link ? (
                  <Link href={item.url} className="text-primary text-sm">
                    {item.link}
                  </Link>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </CardBox>
    </>
  );
};

export default RecentTransactionCard;
