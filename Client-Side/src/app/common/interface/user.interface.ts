export interface UserModel {
    _id: string;
    otp: number;
    email: string;
    provider: string;
    proPlayer: boolean;
    superAdmin: boolean;
    current_balance: number;
    status: string;
    __v: number;
}

export interface UserDetailedModel {
    _id: string;
    username: string;
    profile_pic: string;
    phone_number: string;
    discord_id: string;
    communication_type: string;
    current_balance: number;
    otp: number;
    email: string;
    provider: string;
    proPlayer: boolean;
    superAdmin: boolean;
    status: string;
    __v: number;
    adminReq: boolean;
    country: string;
    elo: string;
    gamer: string;
    gamerID: string;
    kd: string;
    kills: string;
    platform: string;
    winrate: string;
    wins: string;
    wr: null;
    about: string;
    account_name: string;
    account_number: string;
    bank_name: string;
    flawless: string;
    language: string;
    pro_cost: string;
    vip_cost: string;
    channel_name: string;
    preference: PreferenceModel;
}

export interface PreferenceModel {
    selectedGame: string;
}

export interface WalletModel {
    balance: number;
    userId: string;
}
export interface WithdrawModel {
    _id: string;
    orderNo: string;
    amount: string;
    userId: string;
    isApproved: boolean;
    createdAt: string;
    updatedAt: string;
}
