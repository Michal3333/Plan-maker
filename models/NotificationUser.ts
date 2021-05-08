import { NOTIFICATION_TYPE } from "../API/collections";


class NotificationUser {
   id: string;
   text: string;
   type: NOTIFICATION_TYPE;
   read: boolean;
   sender: string;
   constructor(id: string, text: string, type: NOTIFICATION_TYPE, read: boolean, sender: string) {
      this.id = "";
      this.text = text;
      this.type = type;
      this.read = read;
      this.sender = sender;
   }
}
export const notificationConverter = {
   toFirestore: (notification: NotificationUser) => ({
      text: notification.text,
      type: notification.type,
      read: notification.read,
      sender: notification.sender,
   }),
   fromFirestore: (snapshot: firebase.firestore.QueryDocumentSnapshot, options: firebase.firestore.SnapshotOptions): NotificationUser => {
      const data = snapshot.data();
      return new NotificationUser(snapshot.id, data.text, data.type, data.read, data.sender);
  },
}

export default NotificationUser;
