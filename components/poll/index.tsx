import GetPoll from "@lib/utils/getPoll";
import React, { useState } from "react";
import { Tabs, Radio, Space } from 'antd';
import { Grid, Checkbox, Button, TextField } from "@material-ui/core";
import { RadialChart } from "react-vis";

type Props = {
  id: number;
};

function Poll(props: Props) {
  const { TabPane } = Tabs;

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
    <Grid container>
      <Grid item xs={8}>
        <RadialChart
          data={[
            {
              angle: value1,
              label: `value1(${Math.round((value1 / sum) * 100)}%)`,
            },
            {
              angle: value2,
              label: `value2(${Math.round((value2 / sum) * 100)}%)`,
            },
            {
              angle: value3,
              label: `value3(${Math.round((value3 / sum) * 100)}%)`,
            },
          ]}
          width={cardHeight - 148 - 10}
          height={cardHeight - 148 - 10}
          showLabels
          labelsStyle={{ fontWeight: "bold" }}
        />
      </Grid>
      <Grid
        container
        item
        xs={4}
        direction="column"
        style={{ width: "fit-content", padding: "1em" }}
        spacing={2}
      >
        <Grid item>
          <TextField label="A1" value={value1} color="primary" />
        </Grid>
        <Grid item>
          <TextField label="A2" value={value2} color="primary" />
        </Grid>
        <Grid item>
          <TextField label="A3" value={value3} color="primary" />
        </Grid>
      </Grid>
    </Grid>
  );

  /* FIXME: sumbit 누르면 checkboxItem -> resultItem으로 변경 필요(api 연결) */
  const pollContent = props.id % 2 ? checkboxItem : resultItem;

  /* TODO: 댓글 관련 Content */
  const discussionContent = "notDeveloped";

  const question = <div style={{width: '100px', height: '100px', wordBreak: "break-all", wordWrap: "break-word"}}>
    We have to ban macro programs. Macro programs are unmoral.
  </div>

  return (
    <>
      <TabPane tab="Tab1" key={poll.id} style={{width: '1000px', backgroundColor: 'yellow'}}>
            Content of Tab 1 Content of Tab 1 Content of Tab 1 Content of Tab 1 Content of Tab 1 Content of Tab 1 Content of Tab 1 Content of Tab 1
      </TabPane>
    </>
  );
}

export default Poll;
