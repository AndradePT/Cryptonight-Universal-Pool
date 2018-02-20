export interface AddressInfo {
    Balance: string;
    Paid: string;
    Hashrate: string;
    AddressPayment: AddressPay[];
}


export interface AddressPay {
    Time: string;
    TransactionHash: string;
    Amount: string;
    Url: string;
}