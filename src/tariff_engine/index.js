// import React, {Component} from 'react';
import axios from 'axios';
import _ from 'lodash';
// {
//   /*getAPI*/
// }
// export function getApi() {
//     return axios.get(API).then((response) => {
//         const { data } = response.data
//         fetchedData = data.reduce((all, item, i) => {
//             all[i] = item
//             return all
//         }, {})
//
//     })
// }
// {
//   /*getAPI*/
// }

// {/*kg_groupee*/ }
// const dataMapped = fetchedData.map(item => {
//     return item.tarif
// })

// function trimString(s) {
//     let l = 0, r = s.length - 1
//     while (l < s.length && s[l] == ' ') l++;
//     while (r > l && s[r] == ' ') r -= 1;
// }
// function compareObjects(o1, o2) {
//     let k = ''
//     for (k in o1) if (o1[k] !== o2[k]) return false
//     for (k in o2) if (o1[k] !== o2[k]) return false
//     return true
// }
// function itemExist(haystack, needle) {
//     for (var i = 0; i < haystack.length; i++) if (compareObjects(haystack[i], needle)) return true
//     return false
// }
// function search_kg_groupee(toSearch) {
//     let results = []
//     toSearch = trimString(toSearch)
//     for (let i = 0; i < dataMapped.length; i++) {
//         for (const key in dataMapped[i]) {
//             if (dataMapped[i][key].indexOf(toSearch) !== -1) {
//                 if (!itemExist(results, dataMapped[i])) results.push(dataMapped[i])
//             }
//         }
//     }
//     return results
// }
// {
//   /*AW,CW,VW Calculation*/
// }
export let VCW, CW, AW;
export const computeVW = (p, l, t) => {
  VCW = (p * l * t / 6000).toPrecision(3);
  return VCW;
};
//
export const computeCW = () => {
  const firstNum = Math.floor(VCW);
  CW = VCW > parseFloat(`${firstNum}.${301}`) ? firstNum + 1 : firstNum;
  return CW;
};
//

export const computeAW = () => {
  AW = Math.max(calBerat, CW);
  return AW;
};
//
// {
//   /*AW,CW,VW Calculation*/
// }

// const reducedData = fetchedData.reduce((all, item, i) => {
//     all = item
//     return all
// }, {})

let calBerat = null,
  dataResponse = null;
export let Biaya = 0;
export let getDataFromReact = (b, tarifCode) => {
  // calBerat = b
  //
  // if (!dataResponse) {
  //     // return axios.get(`http://192.168.0.105/core_laravel/public/api/service?origin=BDO10000&destination=${tarifCode}`)
  //     // const API = 'http://192.168.0.111/core_laravel/public/api/'
  //     const API = 'http://coreapi.skyware.systems/api/'
  //     let fetchedData
  //     return axios.get(`${API}service?origin=CGK10000&destination=${tarifCode}`)
  //         .then((response) => {
  //             const { data } = response.data
  //             fetchedData = data
  //             dataResponse = fetchedData.length > 0 ? data.reduce((all, item, i) => {
  //                 all = item
  //
  //                 return all
  //             }, {}) :
  //         }).then(response => fetchedData.length > 0 && BaseTariff())
  // } else {
  //     return BaseTariff()
  // }
};

export const getBaseTarif = (dataTarif, actualWeight) => {
  let Berat = actualWeight;
  let Price = 0;
  const {
    min_weight,
    max_weight,
    kg_1,
    kg_2,
    kg_3,
    kg_4,
    kg_5,
    kg_6,
    kg_7,
    kg_8,
    kg_9,
    kg_10,
    price_1,
    price_2,
    price_3,
    price_4,
    price_5,
    price_6,
    price_7,
    price_8,
    price_9,
    price_10,
  } = dataTarif;

  if (Berat && Berat >= min_weight && Berat <= max_weight) {
    let arrMaxWeight = [
      kg_1,
      kg_2,
      kg_3,
      kg_4,
      kg_5,
      kg_6,
      kg_7,
      kg_8,
      kg_9,
      kg_10,
    ];
    let arrPrices = [
      price_1,
      price_2,
      price_3,
      price_4,
      price_5,
      price_6,
      price_7,
      price_8,
      price_9,
      price_10,
    ];
    for (let i = 0; i < arrMaxWeight.length; i++) {
      if (Price === arrMaxWeight[i]) {
        Price = Price + arrMaxWeight[i] * arrPrices[i];
        break;
      } else if (Berat > arrMaxWeight[i]) {
        Price = Price + arrMaxWeight[i] * arrPrices[i];
        Berat = Berat - arrMaxWeight[i];
      } else {
        Price = Price + Berat * arrPrices[i];
        break;
      }
    }
    //
  }

  return Price;
};

let BaseTariff = () => {
  let Berat = calBerat;

  const {
    min_weight,
    max_weight,
    kg_1,
    kg_2,
    kg_3,
    kg_4,
    kg_5,
    kg_6,
    kg_7,
    kg_8,
    kg_9,
    kg_10,
    price_1,
    price_2,
    price_3,
    price_4,
    price_5,
    price_6,
    price_7,
    price_8,
    price_9,
    price_10,
  } = dataResponse.tarif;

  if (Berat && Berat >= min_weight && Berat <= max_weight) {
    let arrMaxWeight = [
      kg_1,
      kg_2,
      kg_3,
      kg_4,
      kg_5,
      kg_6,
      kg_7,
      kg_8,
      kg_9,
      kg_10,
    ];
    let arrPrices = [
      price_1,
      price_2,
      price_3,
      price_4,
      price_5,
      price_6,
      price_7,
      price_8,
      price_9,
      price_10,
    ];
    for (let i = 0; i < arrMaxWeight.length; i++) {
      if (Berat === arrMaxWeight[i]) {
        Biaya = Biaya + arrMaxWeight[i] * arrPrices[i];
        break;
      } else if (Berat > arrMaxWeight[i]) {
        Biaya = Biaya + arrMaxWeight[i] * arrPrices[i];
        Berat = Berat - arrMaxWeight[i];
      } else {
        Biaya = Biaya + Berat * arrPrices[i];
        break;
      }
    }

    return new Promise((resolve, reject) => {
      resolve(Biaya);
    }).then(() => (Biaya = 0));
  } else if (Berat && Berat < min_weight) {
  } else {
  }
};
