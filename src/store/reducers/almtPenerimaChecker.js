// const checkerAlmtPenerimaValue = (state = {}, action) => {
//     switch (action.type) {
//         case 'CHECK_ALMTRESULT_ISEXIST':
//             const reducedClonedAlmt = action.almtR.reduce((all, item, i) => {
//                 all = item
//                 return all
//             }, {}),
//                 { subdistrict_name, district_name, city_name, province_name, country_name, zip_code, tariff_code } = reducedClonedAlmt,
//                 pickThtNeeded = "" + subdistrict_name + ", " + district_name + ", " + city_name + ", " + province_name + " - " + country_name
//             return action.almtR.lenght > 0 ? pickThtNeeded : action.almtP
//         default: return state
//     }
// }
