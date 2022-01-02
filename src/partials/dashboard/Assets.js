import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'
// import { request, GraphQLClient } from 'graphql-request'

function Assets() {
  const currentAccount = useSelector(state => state.currentUser).user
  const [assetsData, setCurrentAssetsData] = useState("");
  // const query = `
  // {
  //     ethereum(network: $ethereum) {
  //       address(address: {is: ${currentAccount}) {
  //         balances {
  //           currency {
  //             address
  //             symbol
  //             tokenType
  //           }
  //           value
  //         }
  //       }
  //     }
  // }`;
  // const endpoint = "https://graphql.bitquery.io";
  // const headers = {
  //     "Content-Type": "application/json",
  //     "X-API-KEY": "BQYsYrM8vR0jzQlFLSmvNcTQU06f5Arq",
  //     "Access-Control-Allow-Origin": "http://localhost:3000",
  //     'Access-Control-Allow-Methods':'POST'
  // };
  // const client = new GraphQLClient(endpoint, { headers })
  // client.request(query, currentAccount).then((data) => console.log(data))

  const dummyData = {
    "ethereum": {
      "address": [
        {
          "balances": [
            {
              "currency": {
                "address": "0xddb3422497e61e13543bea06989c0789117555c5",
                "symbol": "COTI",
                "tokenType": "ERC20"
              },
              "value": 1461.5048761562412
            },
            {
              "currency": {
                "address": "-",
                "symbol": "ETH",
                "tokenType": ""
              },
              "value": 0.00795356467009024
            }
          ]
        }
      ]
    }
  }
  const iterableData = dummyData.ethereum.address[0].balances;
  const cleanedData = [];
  iterableData.forEach(async item => {
    let fetchedPrice = await fetch(`https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=${item.currency.symbol}&to_currency=USD&apikey=I7APEHOD77HLGMCD`)
    let json = await fetchedPrice.json();
    cleanedData.push({
      symbol: item.currency.symbol,
      value: item.value,
      price: json["Realtime Currency Exchange Rate"]["5. Exchange Rate"],
      address: item.currency.address
    });
  });

  return (
    <div className="col-span-full xl:col-span-8 bg-white shadow-lg rounded-sm border border-gray-200">
      <header className="px-5 py-4 border-b border-gray-100">
        <h2 className="font-semibold text-gray-800">Top Assets</h2>
      </header>
      <div className="p-3">

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            {/* Table header */}
            <thead className="text-xs uppercase text-gray-400 bg-gray-50 rounded-sm">
              <tr>
                <th className="p-2">
                  <div className="font-semibold text-left">Symbol</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Value</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">$</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">address</div>
                </th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody className="text-sm font-medium divide-y divide-gray-100">
              {/* Row */}
              {iterableData.map((item, index) => {
                return (
                  <tr key={index}>
                    <td className="p-2">
                      <div className="flex items-center">

                        <div className="text-gray-800">{item.currency.symbol}</div>
                      </div>
                    </td>
                    <td className="p-2">
                      <div className="text-center">{item.value}</div>
                    </td>
                    <td className="p-2">
                      <div className="text-center text-green-500"></div>
                    </td>
                    <td className="p-2">
                      <div className="text-center">{item.currency.address}</div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Assets;
