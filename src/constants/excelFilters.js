export function getConnoteData (columnList, data) {
  let columns = [];
  let rows = [], row=[];
  columnList.forEach(element => {
    columns.push(element.label)
  });
  data.forEach(element => {
    row.push(element.connoteNumber); // this element is on only connonte so we just need to make fillter function for every table element
    row.push(element.createdOn);
    row.push(element.toTariffCode);
    row.push(element.chargeableWeight);
    row.push(element.serviceCode);
    row.push(element.slaDate);
    row.push(element.isWoodPackage);
    rows.push(row);
    row = [];
  });
  return { columns, excelData: rows}
}
