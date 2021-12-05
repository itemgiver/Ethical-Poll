import type { NextPage } from "next";
import EthicalPolls from "@components/ethical-polls/";
import React, { useState } from "react";
import { Form, Input, Button, Radio } from "antd";
import { Row, Col } from "antd";

const Main: NextPage = () => {
  return (
    <div>
      <Row style={{ padding: "0px 0px 10px 0px" }}>
        <Col span={22}>
          <Input placeholder="New Qeustion" />
        </Col>
        <Col
          span={2}
          style={{
            padding: "0px 5px",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Button type="primary" block>
            Submit
          </Button>
        </Col>
      </Row>
      <EthicalPolls />
    </div>
  );
};

export default Main;
