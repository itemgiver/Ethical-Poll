import Poll from "@components/poll";
import { Tabs, Card } from "antd";
import React, { useState } from "react";
import GetPollInfo from "@lib/utils/getPollInfo";

const { TabPane } = Tabs;

type SimplePoll = {
  id: number;
  question: string;
};

function EthicalPolls() {
  const [value, loading, error] = GetPollInfo();
  const flag = loading || error || !value || value.docs.length === 0;
  const polls: SimplePoll[] = [];

  if (!flag) {
    for (var i = 1; i <= value.docs[0].data().len; i++) {
      polls.push(value.docs[0].data()["poll_" + i]);
    }
  }

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
        {polls.map((poll, idx) => (
          <TabPane tab={poll_tab(poll.question)} key={idx}>
            <Poll id={poll.id} key={idx} />
          </TabPane>
        ))}
      </Tabs>
    </>
  );
}

export default EthicalPolls;
