export interface ApiResponse<T> {
    username: any;
    profile_pic: any;
    country: any;
    language: any;
    gamer: any;
    gamerID: any;
    email: any;
    wr: any;
    discord_id: any;
    channel_name: any;
    kd: any;
    elo: any;
    winrate: any;
    kills: any;
    wins: any;
    platform: any;
    flawless: any;
    pro_cost: any;
    vip_cost: any;
    about: any;
    data: T;
    error: string | null;
}