export interface Cate {
    id: number;
    name: string;
    mark: string;
    order: number;
}

export interface Wall {
    id: number;
    name: string;
    cateId: number;
    cate: Cate;
    color: string;
    content: string;
    email: string;
    auditStatus: number;
    createTime: string;
    h_captcha_response: string;
}