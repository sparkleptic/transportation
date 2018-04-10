export const allData = [];
export const searchAlmtContainer = {
  city_id: null,
  city_name: null,
  country_id: null,
  country_name: null,
  district_id: null,
  district_name: null,
  geolocation_list_id: null,
  location_name: null,
  province_id: null,
  province_name: null,
  status: null,
  subdistrict_id: null,
  subdistrict_name: null,
  tariff_code: null,
  zip_code: null,
};
export const baseTariff = 0;
export const initDestinationData = {
  namaPenerima: null,
  tlpPenerima: null,
  almtPenerima: null,
  triK: null,
  kodePos: null,
  kodeTo: null,
  customer_id: 0,
  focusField: '',
};
export const initOriginData = {
  namaPengirim: null,
  tlpPengirim: null,
  almtPengirim: null,
  kodePos: null,
  customer_id: 0,
  customer_code: null,
};
export const initOtherinfoData = {
  deskripsiBrg: null,
  service: null,
  serviceData: [],
  koli: [
    {
      id: 0,
      berat: 1.0,
      panjang: 10,
      lebar: 10,
      tinggi: 10,
      surcharge: '',
      packingKayu: false,
      pkType: '1',
      overWeight: false,
    },
  ],
  overWeightLimit: 0,
  overWeight: false,
  chargeableWeight: 1,
  pcs: 1,
  insuredVal: 0,
  adtSurcharge: [],
  otherSurcharges: '',
  pk: null,
  remarks: null,
  aw: 0,
  cw: 0,
  focusField: '',
};
 export const initGenericListTableData = {
   payload: {}
 }