import firebase from "firebase/app";
import CollectionName from "@lib/firebase/collections";
import { useCollection } from "react-firebase-hooks/firestore";

type Props = {
  id: number;
};

function GetPoll(props: Props) {
  return useCollection(
    firebase
      .firestore()
      .collection(CollectionName.POLL)
      .where("id", "==", props.id)
      .limit(1),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );
}

export default GetPoll;
