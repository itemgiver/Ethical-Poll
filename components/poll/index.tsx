import GetPoll from "@lib/utils/getPoll";
import React, { useState } from "react";
import { Card } from "antd";
import { Grid, Checkbox, Button, TextField } from "@material-ui/core";
import { RadialChart } from "react-vis";
import { Comment, Avatar } from "antd";
import { PieChart } from 'react-minimal-pie-chart'

type Props = {
  id: number;
};

function Poll(props: Props) {
  const [agree, setAgree] = useState(-1);
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

  function handleCheck(value: any) {
    if (agree === value) setAgree(-1);
    else setAgree(value);
  }

  const checkboxContent = ( //FIXME: 데이터 연동 필요
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
          onChange={() => handleCheck(1)}
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
          onChange={() => handleCheck(0)}
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

  const value1 = 123;
  const value2 = 134;
  const value3 = 24;
  const sum = value1 + value2 + value3;
  const resultItem = (
    // <Grid container>
    //   <Grid item xs={8}>
    //     <RadialChart
    //       data={[
    //         {
    //           angle: value1,
    //           label: `value1(${Math.round((value1 / sum) * 100)}%)`,
    //         },
    //         {
    //           angle: value2,
    //           label: `value2(${Math.round((value2 / sum) * 100)}%)`,
    //         },
    //         {
    //           angle: value3,
    //           label: `value3(${Math.round((value3 / sum) * 100)}%)`,
    //         },
    //       ]}
    //       width={cardHeight - 148 - 10}
    //       height={cardHeight - 148 - 10}
    //       showLabels
    //       labelsStyle={{ fontWeight: "bold" }}
    //     />
    //   </Grid>
    //   <Grid
    //     container
    //     item
    //     xs={4}
    //     direction="column"
    //     style={{ width: "fit-content", padding: "1em" }}
    //     spacing={2}
    //   >
    //     <Grid item>
    //       <TextField label="A1" value={value1} color="primary" />
    //     </Grid>
    //     <Grid item>
    //       <TextField label="A2" value={value2} color="primary" />
    //     </Grid>
    //     <Grid item>
    //       <TextField label="A3" value={value3} color="primary" />
    //     </Grid>
    //   </Grid>
    // </Grid>
    <PieChart
      data={[
        {
          value: 20,
          color: '#F6CB44',
          name: 'name1',
        },
      ]}
      reveal={20} //percent
      lineWidth={18} //width
      background='#f3f3f3'
      lengthAngle={360}
      rounded
      animate
      label={({dataEntry})=>dataEntry.value + '%'}
      labelStyle={{
        fontSize: '26px',
        fill: '#33333',
      }}
      labelPosition={0}
      style={{width: '250px'}}>
    </PieChart>
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
            style={{width: "100%", height: cardHeight, alignItems: 'center', justifyContent: 'center'}}
            title={poll.id + ". " + poll.question}
          >
            <div style={{alignItems: 'center', justifyContent: 'center'}}>
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
