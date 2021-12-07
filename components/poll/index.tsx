import GetPoll from "@lib/utils/getPoll";
import React, { useState } from "react";
import { Card, Button, Row, Col } from "antd";
import { Comment, Avatar } from "antd";
import { PieChart } from "react-minimal-pie-chart";
import PostPoll from "@lib/utils/postPoll";

type Props = {
  id: number;
  onChange: any;
};

function Poll(props: Props) {
  const [value, loading, error] = GetPoll({ id: props.id });
  const flag = loading || error || !value || value.docs.length === 0;
  const poll = flag ? {} : value.docs[0].data();

  const [toggle, setToggle] = useState("survey");
  const cardHeight = 400;

  const submitAgree = () => {
    PostPoll({
      id: poll.id,
      question: poll.question,
      agree: poll.agree + 1,
      disagree: poll.disagree + 0,
    });
    setToggle("result");
    if (props.onChange) {
      const json = '{"id": ' + props.id + ', "agree": ' + 1 + "}";
      props.onChange(JSON.parse(json));
    }
  };

  const submitDisagree = () => {
    PostPoll({
      id: poll.id,
      question: poll.question,
      agree: poll.agree + 0,
      disagree: poll.disagree + 1,
    });
    setToggle("result");
    if (props.onChange) {
      const json = '{"id": ' + props.id + ', "agree": ' + 0 + "}";
      props.onChange(JSON.parse(json));
    }
  };

  const checkboxContent = (
    <div className="site-button-ghost-wrapper">
      <Row style={{width: '100%', height: '300px', verticalAlign: 'middle'}}>
        <Col span={12} style={{padding: '0 30px'}}>
          <Button 
            style={{width: "100%", height: '100px', margin:'100px 0'}}
            type="primary" ghost
            onClick={submitAgree}>
            AGREE
          </Button>
        </Col>
        
        <Col span={12} style={{padding: '0 30px'}}>
          <Button 
            style={{width: "100%", height: '100px', margin:'100px 0'}}
            type="primary" danger ghost
            onClick={submitDisagree}>
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

  const resultItem = (
    <div>
      <PieChart
        data={[
          {
            title: "Agree",
            value: agree_percentage,
            color: "#d79d91",
          },
          {
            title: "Disagree",
            value: disagree_percentage,
            color: "#6bb7c7",
          },
        ]}
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

      <Button onClick={unsubmit}>Vote Again</Button>
    </div>
  );

  const pollContent = toggle === "survey" ? checkboxContent : resultItem;

  const ExampleComment = () => (
    <Comment
      actions={[<span key="comment-nested-reply-to">Reply to</span>]}
      author={<a>Han Solo</a>}
      avatar={
        <Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />
      }
      content={
        <p>
          We supply a series of design principles, practical patterns and high
          quality design resources (Sketch and Axure).
        </p>
      }
    ></Comment>
  );

  return (
    <>
      {!flag && (
        <div>
          <Card
            style={{
              width: "100%",
              height: cardHeight,
              alignItems: "center",
              justifyContent: "center",
            }}
            title={"Q. " + poll.question}
          >
            <div
              style={{
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                verticalAlign: 'middle',
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
