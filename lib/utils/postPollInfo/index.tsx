import firebase from "firebase/app";
import CollectionName from "@lib/firebase/collections";

type Props = {
  id: number;
  question: string;
};

async function PostPollInfo(props: Props) {
  const targetPoll = await firebase
    .firestore()
    .collection(CollectionName.POLL_INFO)
    .limit(1)
    .get();

  const pollPathId = targetPoll.docs[0].id;
  const pollRef = await firebase
    .firestore()
    .collection(CollectionName.POLL_INFO)
    .doc(pollPathId);

  const json =
    '{"poll_' +
    props.id +
    '.id": ' +
    props.id +
    ', "poll_' +
    props.id +
    '.question": "' +
    props.question +
    `"}`;
  console.log(json);
  console.log(JSON.parse(json));

  pollRef.update(JSON.parse(json));
}

export default PostPollInfo;
