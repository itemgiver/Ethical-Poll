import firebase from "firebase/app";
import CollectionName from "@lib/firebase/collections";
import PostPollInfo from "@lib/utils/postPollInfo";

type Props = {
  id: number;
  question: string;
  agree: number;
  disagree: number;
};

async function PostPoll(props: Props) {
  const targetPoll = await firebase
    .firestore()
    .collection(CollectionName.POLL)
    .where("id", "==", props.id)
    .limit(1)
    .get();

  if (targetPoll.docs.length === 0) {
    const pollRef = await firebase.firestore().collection(CollectionName.POLL);

    pollRef.add(props);
  } else {
    const pollPathId = targetPoll.docs[0].id;
    const pollRef = await firebase
      .firestore()
      .collection(CollectionName.POLL)
      .doc(pollPathId);

    pollRef.update(props);
  }

  PostPollInfo({ id: props.id, question: props.question });
}

export default PostPoll;
