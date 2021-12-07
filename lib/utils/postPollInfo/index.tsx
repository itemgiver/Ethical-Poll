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

  const str_id = "poll_" + props.id + ".id";
  const str_question = "poll_" + props.id + ".question";

  pollRef.update({
    "${str_id}": props.id,
    "${str_question}": props.question,
  });
}

export default PostPollInfo;
