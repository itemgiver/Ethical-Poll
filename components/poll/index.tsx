import GetPoll from "@lib/utils/getPoll";
import React, { useState } from "react";
import { Card } from "antd";
import { Grid, Checkbox, Button, TextField } from "@material-ui/core";
import { RadialChart } from "react-vis";
import { Comment, Avatar } from "antd";
import { PieChart } from "react-minimal-pie-chart";

type Props = {
  id: number;
};

function Poll(props: Props) {
  const [agree, setAgree] = useState(-1);
  const [value, loading, error] = GetPoll({ id: props.id });
  const flag = loading || error || !value || value.docs.length === 0;
  const poll = flag ? {} : value.docs[0].data();

  const [activeTabKey1, setActiveTabKey1] = useState("Poll");

  const checkboxContent = (
    <Grid container spacing={2}>
      <Grid
        item
        xs={6}
        style={{
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        <Checkbox
          checked={agree === 1}
          color="primary"
          onChange={() => setAgree(1)}
        />
        Agree
      </Grid>
      <Grid
        item
        xs={6}
        style={{
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        <Checkbox
          checked={agree === 0}
          color="secondary"
          onChange={() => setAgree(0)}
        />
        Disagree
      </Grid>
    </Grid>
  );

  const cardHeight = 350;
  const buttonHeight = "3em";

  const checkboxItem = (
    <Grid container style={{ height: cardHeight }}>
      <Grid container item>
        {checkboxContent}
      </Grid>
      <Grid container item justifyContent="center">
        <Button
          variant="contained"
          color="primary"
          // onClick={submit}
          style={{ height: buttonHeight, width: "100%" }}
        >
          Submit
        </Button>
      </Grid>
    </Grid>
  );

  const resultItem = (
    <PieChart
      data={[
        {title: 'Agree', value:40, color: '#d79d91'},
        {title: 'Disagree', value:60, color: '#6bb7c7'}
      ]}
      lineWidth={18} //width
      background="#f3f3f3"
      lengthAngle={360}
      rounded
      animate
      label={({ dataEntry }) => 
        dataEntry.title + ":" + dataEntry.value + "%"
      }
      labelStyle={{
        fontSize: "6px",
        fill: "#33333",
      }}
      style={{ width: "250px", display: "inline-block" }}
    ></PieChart>
  );

  /* FIXME: sumbit 누르면 checkboxItem -> resultItem으로 변경 필요(api 연결) */
  const pollContent = props.id % 2 ? checkboxItem : resultItem;

  /* TODO: 댓글 관련 Content */
  const discussionContent = "notDeveloped";

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
            title={poll.id + ". " + poll.question}
          >
            <div
              style={{
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
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
