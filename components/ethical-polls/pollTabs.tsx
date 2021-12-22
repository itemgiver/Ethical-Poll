import Poll from "@components/poll";
import { Tabs } from "antd";
import React from "react";

const { TabPane } = Tabs;

type SimplePoll = {
  id: number;
  question: string;
};

type Props = {
  polls: SimplePoll[];
};

function PollTabs(props: Props) {
  const poll_tab = (question: string) => {
    return (
      <div
        style={{
          width: "300px",
          wordWrap: "break-word",
          whiteSpace: "normal",
        }}
      >
        {question}
      </div>
    );
  };

  const eventHandler = (data: any) => {
    console.log(data);
  };

  return (
    <>
      <Tabs tabPosition={"left"} size={"large"}>
        {props.polls.map((poll, idx) => (
          <TabPane tab={poll_tab(poll.question)} key={idx}>
            <Poll id={poll.id} onChange={eventHandler} />
          </TabPane>
        ))}
      </Tabs>
    </>
  );
}

export default PollTabs;
