export interface Ports {
    port: string;
    difficulty: string;
    desc: string;
}



export interface Poolinfo {
    Hashrate: string;
    Miners: string;
    Name: string;
    Symbol: string;
    Reward: string;

    ports: Ports[];

}