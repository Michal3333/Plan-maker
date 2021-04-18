class NotificationOut {
   id: string;
   type: NotificationType;
   fromMail: string;
   toMail: string;
   projectId: string;
   result: boolean | null

   constructor(id: string, type: NotificationType, fromMail: string, toMail: string, projectId: string, result: boolean | null = null){
      this.id = id;
      this.type = type;
      this.fromMail = fromMail;
      this.toMail = toMail;
      this.projectId = projectId;
      this.result = result;
   }
}


export const notificationOutConverter = {
   toFirestore: (notification : NotificationOut) => ({ 
      type : notification.type,
      fromMail : notification.fromMail,
      toMail : notification.toMail,
      projectId : notification.projectId,
      result: notification.result
   }),
   fromFirestore: (snapshot: firebase.firestore.QueryDocumentSnapshot, options: firebase.firestore.SnapshotOptions) => {
      const data = snapshot.data(options);
      return new NotificationOut(snapshot.id, data.type, data.fromMail, data.toMail, data.projectId, data.result);
  }
}

export default NotificationOut;

export enum NotificationType {
   request = 'request',
   answer = 'answer'
}