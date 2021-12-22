import GetPoll from "@lib/utils/getPoll";
import React, { useState } from "react";
import { Card, Button, Row, Col } from "antd";
import { Comment, Avatar } from "antd";
import { PieChart } from "react-minimal-pie-chart";
import PostPoll from "@lib/utils/postPoll";
import { BlockList } from "net";

type Props = {
  id: number;
  onChange: any;
};

function Poll(props: Props) {
  const [value, loading, error] = GetPoll({ id: props.id });
  const flag = loading || error || !value || value.docs.length === 0;
  const poll = flag ? {} : value.docs[0].data();

  const [agree, setAgree] = useState(-1);
  const [toggle, setToggle] = useState("survey");
  const cardHeight = 300;

  const submitAgree = () => {
    PostPoll({
      id: poll.id,
      question: poll.question,
      agree: poll.agree + (agree !== 1 ? 1 : 0),
      disagree: poll.disagree + (agree === 0 ? -1 : 0),
    });
    setToggle("result");
    if (props.onChange) {
      const json = '{"id": ' + props.id + ', "agree": ' + 1 + "}";
      props.onChange(JSON.parse(json));
    }
    setAgree(1);
  };

  const submitDisagree = () => {
    PostPoll({
      id: poll.id,
      question: poll.question,
      agree: poll.agree + (agree === 1 ? -1 : 0),
      disagree: poll.disagree + (agree !== 0 ? 1 : 0),
    });
    setToggle("result");
    if (props.onChange) {
      const json = '{"id": ' + props.id + ', "agree": ' + 0 + "}";
      props.onChange(JSON.parse(json));
    }
    setAgree(0);
  };

  const checkboxContent = (
    <div className="site-button-ghost-wrapper">
      <Row style={{ width: "100%", height: "300px" }}>
        <Col
          span={12}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "50px",
          }}
        >
          <Button
            style={{ width: "100%", height: "100%", fontSize: "25px" }}
            type="primary"
            ghost
            onClick={submitAgree}
          >
            AGREE
          </Button>
        </Col>

        <Col
          span={12}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "50px",
          }}
        >
          <Button
            style={{ width: "100%", height: "100%", fontSize: "25px" }}
            type="primary"
            danger
            ghost
            onClick={submitDisagree}
          >
            DISAGREE
          </Button>
        </Col>
      </Row>
    </div>
  );

  const unsubmit = () => {
    setToggle("survey");
  };
  const agree_percentage = Number(
    ((poll.agree * 100.0) / (poll.agree + poll.disagree)).toFixed(1)
  );
  const disagree_percentage = Number(
    ((poll.disagree * 100.0) / (poll.agree + poll.disagree)).toFixed(1)
  );
  const agree_json = {
    title: "Agree",
    value: agree_percentage,
    color: "#6bb7c7",
  };
  const disagree_json = {
    title: "Disagree",
    value: disagree_percentage,
    color: "#d79d91",
  };
  const json_array = [];
  if (agree_percentage !== 0) json_array.push(agree_json);
  if (disagree_percentage !== 0) json_array.push(disagree_json);

  const resultItem = (
    <div>
      <PieChart
        data={json_array}
        lineWidth={18} //width
        background="#f3f3f3"
        lengthAngle={360}
        rounded
        animate
        label={({ dataEntry }) => dataEntry.title + ":" + dataEntry.value + "%"}
        labelStyle={{
          fontSize: "6px",
          fill: "#33333",
        }}
        style={{ height: "250px", display: "inline-block" }}
      ></PieChart>

      <div
        style={{
          display: "inline-block",
          width: "100%",
          textAlign: "center",
          margin: "10px 0",
        }}
      >
        <Button style={{ height: "100%", width: "100px" }} onClick={unsubmit}>
          Vote Again
        </Button>
      </div>
    </div>
  );

  const pollContent = toggle === "survey" ? checkboxContent : resultItem;

  const ExampleComment = () => (
    <Comment
      actions={[<span key="comment-nested-reply-to">Reply to</span>]}
      author={<a>Shin Yoo</a>}
      avatar={
        <Avatar src="https://joeschmoe.io/api/v1/random" alt="Shin Yoo" />
      }
      content={
        <p>
          This course is concerned with a broad range of ethical issues that are
          closely related to, or have their origins at, computing technology and
          their uses. The aim of the course is not to find the answer to these
          problems. Rather, we will examine them from various angles together
          and discuss what we can do.
        </p>
      }
    ></Comment>
  );

  const poll_title = (question: string) => {
    return (
      <div
        style={{
          wordWrap: "break-word",
          whiteSpace: "normal",
        }}
      >
        {question}
      </div>
    );
  };

  return (
    <>
      {!flag && (
        <div>
          <Card
            style={{
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
              whiteSpace: "normal",
            }}
            title={poll_title(poll.question)}
          >
            <div
              style={{
                height: cardHeight,
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                verticalAlign: "middle",
              }}
            >
              {pollContent}
            </div>
          </Card>
          <ExampleComment></ExampleComment>
        </div>
      )}
    </>
  );
}

export default Poll;
