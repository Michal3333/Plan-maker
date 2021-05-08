export enum FB_COLLECTIONS {
   USERS = "users",
   MY_PROJECTS = "myProjects",
   MY_PROJECTS_SHARED = "myProjectsShared",
   CONTRIBUTORS = "contributors",
   SHARED_STATUSES = "sharedStatuses",
   INVITATIONS = "invitations",
   OTHER_PROJECTS = "otherProjects",
   NOTIFICATIONS = "notifications"
}

export enum CONTRIBUTOR_STATUS {
   PENDING = 'pending',
   ACCEPTED = 'accepted',
   DECLINED = 'declined'
}

export enum NOTIFICATION_TYPE {
   INVITATION = 'invitation',
   MESSAGE = 'message',
   INVITATION_ANSWER = 'invitationAnswer'
}

export enum INITATION_STATUS {
   PENDING = "pending",
   ACCEPTED = "accepted",
   DECLINED = "declined"
}