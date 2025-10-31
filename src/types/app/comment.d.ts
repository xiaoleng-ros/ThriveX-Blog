export interface Comment {
    id?: number,
    name: string,
    avatar: string,
    email: string,
    url: string,
    content: string,
    articleId?: number,
    articleTitle?: number,
    commentId?: number,
    auditStatus?: number,
    children?: Comment[],
    createTime: string,
    h_captcha_response: string | null,
}

export interface Info {
    tab: string,
    loading: boolean,
    list: Comment[],
    paginate: Page
}