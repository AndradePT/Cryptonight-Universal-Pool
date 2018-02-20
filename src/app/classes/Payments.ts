

export interface Payments {
    Time: string;
    TransactionHash: string;
    Amount: string;
    Payees: string;
    Url: string;
}


export interface PaymentsInfo {
    Payments: Payments[];
    MinPaymentThreshold: string;
    DenominationUnit: string;
    totalPayments: string;
    totalMinersPaid: string;
}
