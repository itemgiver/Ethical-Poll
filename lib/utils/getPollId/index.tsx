import firebase from "firebase/app";
import CollectionName from "@lib/firebase/collections";
import { useCollection } from "react-firebase-hooks/firestore";

function GetPollId() {
  return useCollection(
    firebase.firestore().collection(CollectionName.POLLID).limit(1),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );
}

export default GetPollId;
