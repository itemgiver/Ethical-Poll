import Poll from "@components/poll";
import { Tabs, Card } from "antd";
import React, { useState } from "react";
import GetPollInfo from "@lib/utils/getPollInfo";

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
      <Card
        style={{
          width: "300px",
          wordBreak: "break-all",
          wordWrap: "break-word",
        }}
      >
        {question}
      </Card>
    );
  };

  return (
    <>
      <Tabs tabPosition={"left"} size={"large"}>
        {props.polls.map((poll, idx) => (
          <TabPane tab={poll_tab(poll.question)} key={idx}>
            <Poll id={poll.id} key={idx} />
          </TabPane>
        ))}
      </Tabs>
    </>
  );
}

export default PollTabs;
