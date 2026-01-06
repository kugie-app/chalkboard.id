"use client";
import { Accordion } from "flowbite-react";
import Link from "next/link";

export const FAQ = () => {
  const Questions = [
    {
      key: "question1",
      question: "What is included with my purchase?",
      answer:
        "Tailor the dashboard to your exact needs. Customize layouts, color schemes, and widgets effortlessly for a personalized user experience.",
    },
    {
      key: "question2",
      question: "Are there any recurring fees?",
      answer:
        "Unlock the true potential of your data with our advanced analytics tools. Gain valuable insights and make data-driven decisions with ease.",
    },
    {
      key: "question3",
      question: "Can I use the template on multiple projects?",
      answer:
        "Visualize complex data sets beautifully with our interactive graphs and charts. Quickly grasp trends and patterns for smarter analysis.",
    },
    {
      key: "question4",
      question:
        "Can I customize the admin dashboard template to match my brand?",
      answer:
        "Visualize complex data sets beautifully with our interactive graphs and charts. Quickly grasp trends and patterns for smarter analysis.",
    },
    {
      key: "question5",
      question: "Are there any restrictions on using the template?",
      answer:
        "Visualize complex data sets beautifully with our interactive graphs and charts. Quickly grasp trends and patterns for smarter analysis.",
    },
    {
      key: "question6",
      question: "How can I get support after purchase?",
      answer:
        "Visualize complex data sets beautifully with our interactive graphs and charts. Quickly grasp trends and patterns for smarter analysis.",
    },
  ];
  return (
    <>
      <div className="dark:bg-dark">
        <div className="max-w-[800px] mx-auto px-5 lg:py-24 py-12">
          <h2 className="sm:text-44 text-3xl font-bold !leading-[48px] text-darklink dark:text-white text-center mb-14">
            Frequently asked questions
          </h2>
          <Accordion className="shadow-none dark:shadow-none divide-y-1 divide-b-0 divided:border-ld !rounded-none flex flex-col gap-4">
            {Questions.map((item,index) => {
              return (
               
                  <Accordion.Panel key={index}>
                    <Accordion.Title className="focus:ring-0 px-6  text-lg text-ld py-5 border border-ld rounded-md !border-b-none">
                      {item.question}
                    </Accordion.Title>
                    <Accordion.Content className="!p-0 px-0 pt-0 rounded-none">
                      <p className="text-base text-ld opacity-80 leading-7 border border-t-0 border-ld -mt-5 px-6 py-5 rounded-b-md">
                        {item.answer}
                      </p>
                    </Accordion.Content>
                  </Accordion.Panel>
               
              );
            })}
          </Accordion>
          <p className="mt-14 text-sm font-medium justify-center text-ld opacity-80 flex flex-wrap items-center gap-1 border border-dashed w-fit mx-auto px-3 py-1.5 rounded-md">
            Still have a question?{" "}
            <Link
              href="https://discord.com/invite/XujgB8ww4n"
              className="underline hover:text-primary"
              target="_blank"
            >
              Ask On Discord
            </Link>{" "}
            <span>or</span>
            <Link
              href="https://adminmart.com/support/"
              className="underline hover:text-primary"
              target="_blank"
            >
              Submit A Ticket
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};
