import { NOTIFICATION_TYPE } from "../API/collections";

class NotificationIn {
   id: string;
   type: NOTIFICATION_TYPE;
   fromMail: string;
   projectName: string;
   contributorID: string

   constructor(id: string, type: NOTIFICATION_TYPE, fromMail: string, projectName: string, contributorID: string){
      this.id = id;
      this.type = type;
      this.fromMail = fromMail;
      this.projectName = projectName;
      this.contributorID = contributorID;
   }
}


export const notificationInConverter = {
   toFirestore: (notification : NotificationIn) => ({ 
      type : notification.type,
      fromMail : notification.fromMail,
      projectName : notification.projectName,
      contributorID: notification.contributorID
   }),
   fromFirestore: (snapshot: firebase.firestore.QueryDocumentSnapshot, options: firebase.firestore.SnapshotOptions) => {
      const data = snapshot.data(options);
      return new NotificationIn(snapshot.id, data.type, data.fromMail, data.projectName, data.contributorID);
  }
}

export default NotificationIn;

