import { Blockquote } from "flowbite-react";
import React from "react";
import CardBox from "../../shared/CardBox";

const ParagraphTypo = () => {
  return (
    <div>
      <CardBox>
        <h4 className="text-lg font-semibold mb-2">Paragraph context</h4>
        <p className="mb-3 text-gray-500 dark:text-gray-400">
          Track work across the enterprise through an open, collaborative
          platform. Link issues across Jira and ingest data from other software
          development tools, so your IT support and operations teams have richer
          contextual information to rapidly respond to requests, incidents, and
          changes.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-6">
          <p className="mb-3 text-gray-500 dark:text-gray-400">
            Track work across the enterprise through an open, collaborative
            platform. Link issues across Jira and ingest data from other
            software development tools, so your IT support and operations teams
            have richer contextual information to rapidly respond to requests,
            incidents, and changes.
          </p>
          <Blockquote className="mb-3">
            <p className="text-xl font-semibold italic text-gray-900 dark:text-white">
              "Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer "
            </p>
          </Blockquote>
        </div>
        <p className="mb-3 text-gray-500 dark:text-gray-400">
          Deliver great service experiences fast - without the complexity of
          traditional ITSM solutions.Accelerate critical development work,
          eliminate toil, and deploy changes with ease, with a complete audit
          trail for every change.
        </p>
      </CardBox>
    </div>
  );
};

export default ParagraphTypo;
