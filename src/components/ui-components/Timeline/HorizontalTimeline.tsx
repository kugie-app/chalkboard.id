"use client";
import { Timeline, Button } from 'flowbite-react'
import React from 'react'
import CardBox from '../../shared/CardBox'
import { HiArrowNarrowRight, HiCalendar } from "react-icons/hi";
const HorizontalTimeline = () => {
  return (
    <div>
      <CardBox>
            <h4 className="text-lg font-semibold mb-2">Horizontal Timeline</h4>
            <Timeline horizontal>
              <Timeline.Item>
                <Timeline.Point icon={HiCalendar} />
                <Timeline.Content>
                  <Timeline.Time>February 2022</Timeline.Time>
                  <Timeline.Title>
                    Application UI code in Tailwind CSS
                  </Timeline.Title>
                  <Timeline.Body>
                    Get access to over 20+ pages including a dashboard layout,
                    charts, kanban board, calendar, and pre-order E-commerce &
                    Marketing pages.
                  </Timeline.Body>
                  <Button color="primary">
                    Learn More
                    <HiArrowNarrowRight className="ml-2 h-3 w-3" />
                  </Button>
                </Timeline.Content>
              </Timeline.Item>
              <Timeline.Item>
                <Timeline.Point icon={HiCalendar} />
                <Timeline.Content>
                  <Timeline.Time>March 2022</Timeline.Time>
                  <Timeline.Title>Marketing UI design in Figma</Timeline.Title>
                  <Timeline.Body>
                    All of the pages and components are first designed in Figma
                    and we keep a parity between the two versions even as we
                    update the project.
                  </Timeline.Body>
                </Timeline.Content>
              </Timeline.Item>
              <Timeline.Item>
                <Timeline.Point icon={HiCalendar} />
                <Timeline.Content>
                  <Timeline.Time>April 2022</Timeline.Time>
                  <Timeline.Title>
                    E-Commerce UI code in Tailwind CSS
                  </Timeline.Title>
                  <Timeline.Body>
                    Get started with dozens of web components and interactive
                    elements built on top of Tailwind CSS.
                  </Timeline.Body>
                </Timeline.Content>
              </Timeline.Item>
            </Timeline>
          </CardBox> 
    </div>
  )
}

export default HorizontalTimeline
