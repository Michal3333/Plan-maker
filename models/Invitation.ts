import { INITATION_STATUS } from "../API/collections";

class Invitation {
   id: string;
   sharedStatus: string;
   fromMail: string;
   projectName: string;
   status: INITATION_STATUS

   setId = (id : string) => {
      this.id = id;
   }

   constructor(id: string, sharedStatus: string, fromMail: string, projectName: string, status: INITATION_STATUS) {
      this.sharedStatus = sharedStatus;
      this.id = id;
      this.fromMail = fromMail;
      this.projectName = projectName;
      this.status = status;
   }
}

export const invitationConverter = {
   toFirestore: (status: Invitation) => ({
      sharedStatus: status.sharedStatus,
      fromMail: status.fromMail,
      projectName: status.projectName,
      status: status.status,
   }),
   fromFirestore: (snapshot: firebase.firestore.QueryDocumentSnapshot, options: firebase.firestore.SnapshotOptions) : Invitation => {
      const data = snapshot.data();
      return new Invitation(snapshot.id, data.sharedStatus, data.fromMail, data.projectName, data.status);
  },
}

export default Invitation;
