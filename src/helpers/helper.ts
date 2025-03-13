import algosdk from "algosdk";
 import { getClient, getAccount } from "../config/config.js";

 export const storeWeatherData = async (data: WeatherData): Promise<void> => {
 try {
 const client = getClient();
 const account = getAccount();
 const suggestedParams = await client.getTransactionParams().do();

 const note = algosdk.msgpackRawEncode(data);

 const txn = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
 sender: account.addr,
 receiver: account.addr, // Sending the transaction to oneself
 amount: 1000, // Minimum amount
 note: note,
 suggestedParams: suggestedParams,
 });

 const signedTxn = txn.signTxn(account.sk);
 const sendTxn = await client.sendRawTransaction(signedTxn).do();

 console.log("Transaction ID:", sendTxn.txid);
 } catch (error) {
 console.error("Failed to store weather data:", error);
 }
 };