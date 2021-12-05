import { useEffect } from "react";
import Poll from "@components/poll";
import PostPoll from "@lib/utils/postPoll";
import { List, Card } from "antd";

function EthicalPolls() {
  useEffect(() => {
    PostPoll({
      id: 4,
      question: "Question 3?",
    });
  }, []);

  const data = [
    {
      id: 1,
    },
    {
      id: 2,
    },
    {
      id: 3,
    },
    {
      id: 4,
    },
  ];

  return (
    <List
      grid={{ gutter: 16, column: 3 }}
      dataSource={data}
      renderItem={(item) => (
        <List.Item>
          <Poll id={item.id} />
        </List.Item>
      )}
    />
  );
}

export default EthicalPolls;
