import { useEffect } from "react";
import Poll from "@components/poll";
import PostPoll from "@lib/utils/postPoll";

function EthicalPolls() {
  useEffect(() => {
    PostPoll(3, "Question 3?");
  }, []);

  return (
    <div>
      <Poll id={1} />
      <Poll id={2} />
    </div>
  );
}

export default EthicalPolls;
