import GetPoll from "@lib/utils/getPoll";

type Props = {
  id: number;
};

function Poll(props: Props) {
  const [value, loading, error] = GetPoll(props.id);
  const flag = loading || error || !value || value.docs.length === 0;
  const poll = flag ? {} : value.docs[0].data();

  return (
    <div>
      {flag ? (
        <div>Loading</div>
      ) : (
        <div>
          <p>Number : {poll.id}</p>
          <p>Question : {poll.question}</p>
        </div>
      )}
    </div>
  );
}

export default Poll;
