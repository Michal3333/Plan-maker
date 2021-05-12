import { INITATION_STATUS } from "../API/collections";

class Invitation {
   id: string;
   sharedStatus: string;
   fromMail: string;
   projectName: string;
   status: INITATION_STATUS
   allowMessage: boolean;
   allowDetails: boolean;

   setId = (id : string) => {
      this.id = id;
   }

   constructor(id: string, sharedStatus: string, fromMail: string, projectName: string, status: INITATION_STATUS, allowMessage: boolean, allowDetails: boolean) {
      this.sharedStatus = sharedStatus;
      this.id = id;
      this.fromMail = fromMail;
      this.projectName = projectName;
      this.status = status;
      this.allowMessage = allowMessage;
      this.allowDetails = allowDetails;
   }
}

export const invitationConverter = {
   toFirestore: (status: Invitation) => ({
      sharedStatus: status.sharedStatus,
      fromMail: status.fromMail,
      projectName: status.projectName,
      status: status.status,
      allowMessage: status.allowMessage,
      allowDetails: status.allowDetails,
   }),
   fromFirestore: (snapshot: firebase.firestore.QueryDocumentSnapshot, options: firebase.firestore.SnapshotOptions) : Invitation => {
      const data = snapshot.data();
      return new Invitation(snapshot.id, data.sharedStatus, data.fromMail, data.projectName, data.status,  data.allowMessage, data.allowDetails);
  },
}

export default Invitation;
