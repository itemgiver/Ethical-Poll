import Poll from "@components/poll";
import { Tabs, Card } from "antd";
import React, { useState } from "react";
import GetPollId from "@lib/utils/getPollId";

const { TabPane } = Tabs;

function EthicalPolls() {
  const [value, loading, error] = GetPollId();
  const flag = loading || error || !value || value.docs.length === 0;
  const poll_id: number[] = flag ? [] : value.docs[0].data().poll_id;
  const question = (
    <Card
      style={{
        width: "300px",
        wordBreak: "break-all",
        wordWrap: "break-word",
      }}
    >
      We have to ban macro programs.
    </Card>
  );

  return (
    <>
      <Tabs tabPosition={"left"} size={"large"}>
        {poll_id.map((id, idx) => (
          <TabPane tab={question} key={idx}>
            <Poll id={id} key={idx} />
          </TabPane>
        ))}
      </Tabs>
    </>
  );
}

export default EthicalPolls;
