import type { NextPage } from "next";
import PollTabs from "@components/ethical-polls/pollTabs";
import React, { useState } from "react";
import { Grid, TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import PostPoll from "@lib/utils/postPoll";
import GetPollInfo from "@lib/utils/getPollInfo";

type SimplePoll = {
  id: number;
  question: string;
};

const useStyles = makeStyles({
  root: {
    width: "99%",
    "&::-webkit-scrollbar": {
      display: "none",
    },
    padding: "0.7em",
    "& .MuiTextField-root": {
      "& .MuiInputLabel-root": {
        width: "calc(100% - 1em) !important",
        whiteSpace: "nowrap !important",
        overflow: "hidden !important",
        textOverflow: "ellipsis !important",
      },
    },
  },
});

export default function EthicalPolls() {
  const [question, setQuestion] = useState("");
  const classes = useStyles();

  const [value, loading, error] = GetPollInfo();
  const flag = loading || error || !value || value.docs.length === 0;
  const polls: SimplePoll[] = [];

  if (!flag) {
    for (var i = 1; i <= value.docs[0].data().len; i++) {
      polls.push(value.docs[0].data()["poll_" + i]);
    }
  }

  function handleKeyPress(e: any) {
    if (e.key === "Enter") submit();
  }

  function submit() {
    PostPoll({
      id: value.docs[0].data().len + 1,
      question: question,
      agree: 0,
      disagree: 0,
    }).then((res) => console.log(res));
  }

  return (
    <div className={classes.root} style={{ padding: "0px 150px" }}>
      <Grid container direction="column" spacing={3}>
        <Grid
          container
          item
          spacing={3}
          style={{ padding: "30px 0px 30px 30px" }}
        >
          <Grid item xs={10}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="New Qeustion"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  onKeyPress={handleKeyPress}
                  variant="outlined"
                  style={{ width: "100%" }}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={2}>
            <Button
              variant="contained"
              color="primary"
              onClick={submit}
              style={{ height: "100%", width: "100%" }}
              disabled={question === ""}
            >
              Submit
            </Button>
          </Grid>
        </Grid>

        {/* <Grid container item spacing={2}> */}
        <PollTabs polls={polls} />
        {/* </Grid> */}
      </Grid>
    </div>
  );
}
