import GetPoll from "@lib/utils/getPoll";
import React, { useState } from "react";
import { Card } from "antd";

type Props = {
  id: number;
};

function Poll(props: Props) {
  const [value, loading, error] = GetPoll({ id: props.id });
  const flag = loading || error || !value || value.docs.length === 0;
  const poll = flag ? {} : value.docs[0].data();

  const tabList = [
    {
      key: "Poll",
      tab: "Poll",
    },
    {
      key: "Discussion",
      tab: "Discussion",
    },
  ];

  const [activeTabKey1, setActiveTabKey1] = useState("Poll");

  const onPollChange = (key: React.SetStateAction<string>) => {
    setActiveTabKey1(key);
  };

  return (
    <div>
      {flag ? (
        <div>Loading</div>
      ) : (
        <Card
          style={{ width: "100%" }}
          title={poll.id + ". " + poll.question}
          // extra={<a href="#">More</a>}
          tabList={tabList}
          activeTabKey={activeTabKey1}
          onTabChange={(key) => {
            onPollChange(key);
          }}
        >
          {activeTabKey1}
        </Card>
      )}
    </div>
  );
}

export default Poll;
