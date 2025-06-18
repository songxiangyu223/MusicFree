declare namespace IMedia {
    export interface ICommentItem {
        id?: string;
        // Username
        nickName: string;
        // Avatar
        avatar?: string;
        // Comment content
        comment: string;
        // Number of likes
        like?: number;
        // Comment creation time
        createAt?: number;
        // Location
        location?: string;
    }

    export interface IComment extends ICommentItem {
        // Replies
        replies?: IComment[];
    }
}
