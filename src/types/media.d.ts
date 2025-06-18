declare namespace IMedia {
    export interface ICommentItem {
        /** 评论唯一标识符 */
        id?: string;
        /** 用户昵称 */
        nickName: string;
        /** 用户头像地址 */
        avatar?: string;
        /** 评论正文内容 */
        comment: string;
        /** 点赞数量 */
        like?: number;
        /** 评论创建时间戳 */
        createAt?: number;
        /** 用户地理位置信息 */
        location?: string;
    }

    export interface IComment extends ICommentItem {
        /** 评论的回复列表 */
        replies?: IComment[];
    }
}
