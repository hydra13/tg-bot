export interface TGUser {
    first_name: string,
    id: number,
    last_name: string,
    username: string
}

export interface TGEntite {
    length: number,
    offset: number,
    type: string
}

export interface TGMessage {
    chat: TGUser & Record<'type', string>,
    date: number,
    from: TGUser & Record<'is_bot', boolean>,
    message_id: number,
    text: string,
    entities: TGEntite[]
}

export interface TGUpdateMsg {
    message: TGMessage
    update_id: number
}