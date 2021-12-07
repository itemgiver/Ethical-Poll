import Poll from "@components/poll";
import { Tabs, Radio, Space } from 'antd';
import React from "react";

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
    const question = <div style={{width: '100px', height: '100px', wordBreak: "break-all", wordWrap: "break-word"}}>
      We have to ban macro programs. Macro programs are unmoral.
    </div>

    return (
      <>
        <Tabs tabPosition={tabPosition} size={"large"}>
          {/* <TabPane tab="We have to ban macro programs. Macro programs are unmoral." key="1"> */}
          {/* <TabPane tab={question} key="1">
            Content of Tab 1 Content of Tab 1 Content of Tab 1 Content of Tab 1 Content of Tab 1 Content of Tab 1 Content of Tab 1 Content of Tab 1
          </TabPane>
          <TabPane tab="Tab 2" key="2">
            Content of Tab 2
          </TabPane>
          <TabPane tab="Tab 3" key="3">
            Content of Tab 3
          </TabPane> */}
            {data.map((el, idx) => (
              <Poll id={el.id} key={idx} />
            ))}
        </Tabs>
      </>
    );
  }
}

export default EthicalPolls;
