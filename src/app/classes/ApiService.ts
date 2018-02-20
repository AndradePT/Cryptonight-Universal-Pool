import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { Observable } from "rxjs/Observable";
import "rxjs/Rx";

import { Pools } from './Pools';
import { PoolBlocks } from './Poolblocks';
import { Payments, PaymentsInfo } from './Payments';
import { Poolinfo, Ports } from './Poolinfo';
import { AddressInfo, AddressPay } from './AddressInfo';


@Injectable()
export class ApiService {

    private _postsURL = './assets/config.json';

    constructor(private http: Http) {
    }

    getApis(): Observable<Pools[]> {
        return this.http
            .get(this._postsURL)
            .map((response: Response) => {
                return <Pools[]>response.json();
            })
            .catch(this.handleError);
    }

    private handleError(error: Response) {
        return Observable.throw(error.statusText);
    }

    getStats(apiurl: string) {
        return this.http.get(apiurl + '/stats');
    }

    getAddress(_address: string, Coin): Observable<Observable<AddressInfo>> {


        return this.getCoininfo(Coin).map(data => {
            return this.http.get(data.url + '/stats_address', {
                params: {
                    address: _address
                }
            }).map(res => {
                let dt = res.json();


                let address = {
                    Balance: this.coinsConvert(dt['stats'].balance, data.coinUnit).toString(),
                    Paid: this.coinsConvert(dt['stats'].paid, data.coinUnit).toString(),
                    Hashrate: dt['stats'].hashrate,
                    AddressPayment: []
                }

                let CoinUnit = 0;


                for (let pay of Object.keys(dt['payments'])) {


                    if (parseInt(pay) % 2 != 0)
                        address.AddressPayment.push({
                            Time: this.dateConvert(dt['payments'][pay]).toLocaleDateString(),
                            TransactionHash: dt['payments'][parseInt(pay) - 1].split(':')[0].substr(0, 22) + '...',
                            Amount: this.coinsConvert(dt['payments'][parseInt(pay) - 1].split(':')[1], dt['payments'][parseInt(pay) - 1].split(':')[2]),
                            Url: this.urlConvert(dt['payments'][parseInt(pay) - 1].split(':')[0], data.transactionExplorer)
                        });
                }


                return <AddressInfo>address;
            });
        });


    }

    getCoininfo(coin: string): Observable<Pools> {

        return this.getApis().map((res) => { return <Pools>this.findObjectByKey(res, coin) })

    }


    private findObjectByKey(array, value) {
        for (var i = 0; i < array.length; i++) {
            if (array[i]['symbol'] === value) {
                return array[i];
            }
        }
        return null;
    }



    UpdatePayment(Coin): Observable<Observable<PaymentsInfo>> {
        return this.getCoininfo(Coin).map((res) => {

            return this.getStats(res.url).map((lastres) => {
                let dataStas = lastres.json();


                let paymentsInfo = {
                    DenominationUnit: dataStas['config'].denominationUnit,
                    totalMinersPaid: dataStas['pool'].totalMinersPaid,
                    totalPayments: dataStas['pool'].totalPayments,
                    MinPaymentThreshold: dataStas['config'].minPaymentThreshold,
                    Payments: []
                }


                for (let pay of Object.keys(dataStas['pool']['payments'])) {

                    if (parseInt(pay) > 30)
                        break;


                    if (parseInt(pay) % 2 != 0)
                        paymentsInfo.Payments.push({
                            Time: this.dateConvert(dataStas['pool']['payments'][pay]).toLocaleDateString(),
                            TransactionHash: dataStas['pool']['payments'][parseInt(pay) - 1].split(':')[0].substr(0, 40) + '...',
                            Amount: this.coinsConvert(dataStas['pool']['payments'][parseInt(pay) - 1].split(':')[1], paymentsInfo.DenominationUnit).toString(),
                            Payees: dataStas['pool']['payments'][parseInt(pay) - 1].split(':')[4],
                            Url: this.urlConvert(dataStas['pool']['payments'][parseInt(pay) - 1].split(':')[0], res.transactionExplorer)
                        });


                }


                return <PaymentsInfo>paymentsInfo;


            })
        })
    }

    UpdateBlokcs(Coin): Observable<Observable<PoolBlocks[]>> {

        return this.getCoininfo(Coin).map(data => {

            return this.getStats(data.url).map(dataStats => {

                let dataStas = dataStats.json();


                let poolblock: any[] = [];

                for (let pay of Object.keys(dataStas['pool']['blocks'])) {

                    if (parseInt(pay) > 30)
                        break;


                    if (parseInt(pay) % 2 != 0)
                        poolblock.push({
                            Height: dataStas['pool']['blocks'][pay],
                            BlockHash: dataStas['pool']['blocks'][parseInt(pay) - 1].split(':')[0].substr(0, 40) + '...',
                            Difficulty: dataStas['pool']['blocks'][parseInt(pay) - 1].split(':')[2],
                            TimeFound: this.dateConvert(dataStas['pool']['blocks'][parseInt(pay) - 1].split(':')[1]).toLocaleDateString(),
                            Url: this.urlConvert(dataStas['pool']['blocks'][parseInt(pay) - 1].split(':')[0], data.blockchainExplorer)
                        });



                }

                return <PoolBlocks[]>poolblock;

            })
        })

    }

    UpdateCoins(PoolApi): Observable<Poolinfo> {

        return this.getStats(PoolApi).map(data => {
            var t = data.json();

            let pool = {
                Hashrate: t['pool'].hashrate,
                Miners: t['pool'].miners,
                Name: t['config'].coin.toUpperCase(),
                Symbol: t['config'].symbol,
                Reward: (t['network'].reward / t['config'].coinUnits).toString(),
                ports: t['config'].ports as Ports[],
            }




            return <Poolinfo>pool

        })

    }






    urlConvert(value, url) {
        return url.replace('{id}', value);
    }

    dateConvert(value) {
        return new Date(parseInt(value) * 1000);
    }

    coinsConvert(value, CoinUnit) {
        return value / parseInt(CoinUnit);
    }

}