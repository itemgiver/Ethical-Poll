import firebase from "firebase/app";
import CollectionName from "@lib/firebase/collections";
import { useCollection } from "react-firebase-hooks/firestore";

function GetPollInfo() {
  return useCollection(
    firebase.firestore().collection(CollectionName.POLL_INFO).limit(1),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );
}

export default GetPollInfo;
