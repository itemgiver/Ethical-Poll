import firebase from "firebase/app";
import CollectionName from "@lib/firebase/collections";
import { useCollection } from "react-firebase-hooks/firestore";

function GetPoll(id: number) {
  return useCollection(
    firebase
      .firestore()
      .collection(CollectionName.POLL)
      .where("id", "==", id)
      .limit(1),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );
}

export default GetPoll;
