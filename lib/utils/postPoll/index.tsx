import firebase from "firebase/app";
import CollectionName from "@lib/firebase/collections";

async function PostPoll(id: number, question: string) {
  const targetPoll = await firebase
    .firestore()
    .collection(CollectionName.POLL)
    .where("id", "==", id)
    .limit(1)
    .get();

  if (targetPoll.docs.length === 0) {
    const pollRef = await firebase.firestore().collection(CollectionName.POLL);

    pollRef.add({
      id: id,
      question: question,
    });
  } else {
    const pollPathId = targetPoll.docs[0].id;
    const pollRef = await firebase
      .firestore()
      .collection(CollectionName.POLL)
      .doc(pollPathId);

    pollRef.update({
      id: id,
      question: question,
    });
  }
}

export default PostPoll;
