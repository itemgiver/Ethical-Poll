import type { NextPage } from "next";
import EthicalPolls from "@components/ethical-polls/";
import React, { useState } from "react";
import { Grid, TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import PostPoll from "@lib/utils/postPoll";

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

const Main: NextPage = () => {
  const [question, setQuestion] = useState("");
  const [questionId, setQuestionId] = useState("");
  const classes = useStyles();

  function handleKeyPress(e: any) {
    if (e.key === "Enter") submit();
  }

  function submit() {
    PostPoll({
      id: Number(questionId),
      question: question,
    }).then((res) => console.log(res));
  }

  return (
    <div className={classes.root} style={{ padding: "0px 150px" }}>
      <Grid container direction="column" spacing={3}>
        <Grid container item spacing={3} style={{ padding: "30px" }}>
          <Grid item xs={10}>
            <Grid container spacing={2}>
              <Grid item xs={2}>
                <TextField
                  label="Question id"
                  value={questionId}
                  onChange={(e) => setQuestionId(e.target.value)}
                  onKeyPress={handleKeyPress}
                  variant="outlined"
                  style={{ width: "100%" }}
                />
              </Grid>
              <Grid item xs={10}>
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
              disabled={question === "" || questionId === ""}
            >
              Submit
            </Button>
          </Grid>
        </Grid>

        {/* <Grid container item spacing={2}> */}
        <EthicalPolls />
        {/* </Grid> */}
      </Grid>
    </div>
  );
};

export default Main;
