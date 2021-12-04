import { useCollection } from "react-firebase-hooks/firestore";
import firebase from "firebase/app";
import type PollType from "@models/poll";
import CollectionName from "@lib/firebase/collections";

type Props = {
  id: number;
};

function Poll(props: Props) {
  const [value, loading, error] = useCollection<PollType>(
    firebase
      .firestore()
      .collection(CollectionName.POLL)
      .where("id", "==", props.id),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  if (loading) return <div>Loading</div>;
  if (error) return <div>Error</div>;
  if (!value) return null;

  const poll = value.docs[0].data();

  return (
    <div>
      {poll && (
        <div>
          <p>Number : {poll.id}</p>
          <p>Question : {poll.question}</p>
        </div>
      )}
    </div>
  );
}

export default Poll;
