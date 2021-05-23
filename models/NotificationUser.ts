import firebase from "firebase";
import { NOTIFICATION_TYPE } from "../API/collections";


class NotificationUser {
   id: string;
   text: string;
   type: NOTIFICATION_TYPE;
   read: boolean;
   sender: string;
   date: Date;
   projectName: string;
   projectId: string
   message: string;
   constructor(id: string, text: string, type: NOTIFICATION_TYPE, read: boolean, sender: string, date: Date, projectName: string, projectId: string, message: string) {
      this.id = id;
      this.text = text;
      this.type = type;
      this.read = read;
      this.sender = sender;
      this.date = date;
      this.projectName = projectName;
      this.projectId = projectId
      this.message = message;
   }
}
export const notificationConverter = {
   toFirestore: (notification: NotificationUser) => ({
      text: notification.text,
      type: notification.type,
      read: notification.read,
      sender: notification.sender,
      date : notification.date.getTime(),
      projectName : notification.projectName,
      projectId : notification.projectId,
      message : notification.message,
   }),
   fromFirestore: (snapshot: firebase.firestore.QueryDocumentSnapshot, options: firebase.firestore.SnapshotOptions): NotificationUser => {
      const data = snapshot.data(options);
      return new NotificationUser(snapshot.id, data.text, data.type, data.read, data.sender, new Date(data.date), data.projectName, data.projectId, data.message);
  },
}

export default NotificationUser;
