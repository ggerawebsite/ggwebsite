export interface PartyModel {
    _id: string;
    title: string;
    url: string;
    price: string;
    lobbyDescription: string;
    preferredServer: string;
    gameFormat: string;
    members: Member[];
    users: PartyUserModel[];
    createdBy: string;
    createdAt: string;
    updatedAt: string;
    stoppedAt: string;
    startedAt: string;
    status: string;
    isPrivate: boolean;
    __v: number;
}

export interface Member {
    id: string;
    type: string;
    timeSpent: string;
    _id: string;
}

export interface PartyUserModel {
    _id: string;
    username: string;
    profile_pic: string;
    channel_name: string;
    discord_id: string;
    elo: string;
    kd: string;
    about: string;
}
