import Poll from "@components/poll";
import { Tabs, Card } from 'antd';
import React, { useState } from "react";

const { TabPane } = Tabs;


// function EthicalPolls() {
class EthicalPolls extends React.Component{

  constructor(props){
    super(props);

    this.state = {
      tabPosition: 'left',  
    }
  }

  changeTabPosition = e => {
    this.setState({ tabPosition: e.target.value });
  };


  render() {
    const { tabPosition } = this.state;
    const data = Array.from(Array(100).keys()).map((idx) => ({ id: idx })); //FIXME: 존재하는 id만 불러오는 api 필요
    // FIXME Get Questions
    const question = <Card style={{width: '300px', wordBreak: "break-all", 
                                  wordWrap: "break-word"}}> 
      We have to ban macro programs.
    </Card>

    return (
      <>
        <Tabs tabPosition={tabPosition} size={"large"}>
            {data.map((el, idx) => (
              <TabPane tab={question} key={idx}> 
                <Poll id={el.id} key={idx}/>
              </TabPane>
            ))}
        </Tabs>
      </>
    );
  }
}

export default EthicalPolls;
