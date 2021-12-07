import Poll from "@components/poll";
import { Tabs, Card } from "antd";
import React, { useState } from "react";

const { TabPane } = Tabs;

type Props = {};

// function EthicalPolls() {
class EthicalPolls extends React.Component {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const data = Array.from(Array(10).keys()).map((idx) => ({ id: idx })); //FIXME: 존재하는 id만 불러오는 api 필요
    // FIXME Get Questions
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
          {data.map((el, idx) => (
            <TabPane tab={question} key={idx}>
              <Poll id={el.id} key={idx} />
            </TabPane>
          ))}
        </Tabs>
      </>
    );
  }
}

export default EthicalPolls;
