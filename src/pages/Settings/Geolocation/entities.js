import cities from './CityTab/create';
import country from './CountryTab/create';
import district from './DistrictTab/create';
import province from './ProvinceTab/create';
import subdistrict from './SubDistrictTab/create';
import timezone from './TimezoneTab/create';
import zipcode from './ZipcodeTab/create';
import geolocation from './GeolocationTab/create';

import genericList from '../genericList';

const form = {
  geolocation: {
    columnData: [
      {
        id: 'geolocation_list_id',
        numeric: false,
        disablePadding: true,
        label: 'ID',
      },
      {
        id: 'country_name',
        numeric: false,
        disablePadding: true,
        label: 'Geolocation',
      },
      {
        id: 'province_name',
        numeric: false,
        disablePadding: true,
        label: 'Province',
      },
      {id: 'city_name', numeric: false, disablePadding: true, label: 'City'},
      {
        id: 'district_name',
        numeric: false,
        disablePadding: true,
        label: 'District',
      },
      {
        id: 'subdistrict_name',
        numeric: false,
        disablePadding: true,
        label: 'SubDistrict',
      },
      {id: 'zip_code', numeric: true, disablePadding: true, label: 'Zip Code'},
      {
        id: 'tariff_code',
        numeric: false,
        disablePadding: true,
        label: 'Tariff Code',
      },
      {
        id: 'timezone',
        key: 'time_zone_name',
        numeric: false,
        disablePadding: true,
        label: 'Timezone',
      },
    ],
    idfield: 'geolocation_list_id',
    listForm: genericList,
    createForm: geolocation,
  },
  countries: {
    columnData: [
      {id: 'id', numeric: false, disablePadding: true, label: 'ID'},
      {id: 'country_code', numeric: false, disablePadding: true, label: 'Code'},
      {id: 'country_name', numeric: false, disablePadding: true, label: 'Name'},
    ],
    idfield: 'id',
    listForm: genericList,
    createForm: country,
  },
  provinces: {
    columnData: [
      {id: 'province_id', numeric: false, disablePadding: false, label: 'ID'},
      {
        id: 'country',
        key: 'country_name',
        numeric: false,
        disablePadding: true,
        label: 'Country',
      },
      {
        id: 'province_name',
        numeric: false,
        disablePadding: true,
        label: 'Name',
      },
    ],
    postData: ['country_id', 'province_name', 'province_id'],
    idfield: 'province_id',
    listForm: genericList,
    createForm: province,
  },
  cities: {
    columnData: [
      {id: 'city_id', numeric: false, disablePadding: false, label: 'ID'},
      {
        id: 'province',
        key: 'province_name',
        numeric: false,
        disablePadding: true,
        label: 'Province',
      },
      {id: 'city_name', numeric: false, disablePadding: true, label: 'Name'},
      {
        id: 'timezone',
        key: 'time_zone_name',
        numeric: false,
        disablePadding: false,
        label: 'Timezone',
      },
    ],
    postData: ['city_id', 'city_name', 'status', 'province_id', 'time_zone_id'],
    idfield: 'city_id',
    listForm: genericList,
    createForm: cities,
  },
  district: {
    columnData: [
      {id: 'district_id', numeric: false, disablePadding: false, label: 'ID'},
      {
        id: 'city',
        key: 'city_name',
        numeric: false,
        disablePadding: false,
        label: 'City',
      },
      {
        id: 'district_name',
        numeric: false,
        disablePadding: false,
        label: 'Name',
      },
    ],
    postData: ['district_id', 'city_id', 'district_name'],
    idfield: 'district_id',
    listForm: genericList,
    createForm: district,
  },
  subdistrict: {
    columnData: [
      {
        id: 'subdistrict_id',
        numeric: false,
        disablePadding: false,
        label: 'ID',
      },
      {
        id: 'district',
        key: 'district_name',
        numeric: false,
        disablePadding: false,
        label: 'District',
      },
      {
        id: 'subdistrict_name',
        numeric: false,
        disablePadding: false,
        label: 'Name',
      },
    ],
    postData: ['subdistrict_id', 'city_id', 'district_id', 'subdistrict_name'],
    idfield: 'subdistrict_id',
    listForm: genericList,
    createForm: subdistrict,
  },
  zipcodes: {
    columnData: [
      {id: 'zip_code', numeric: true, disablePadding: true, label: 'Zip Code'},
      {
        id: 'subdistrict_name',
        numeric: false,
        disablePadding: true,
        label: 'Subdistrict',
      },
      {
        id: 'district_name',
        numeric: false,
        disablePadding: true,
        label: 'District',
      },
      {id: 'city_name', numeric: false, disablePadding: true, label: 'City'},
      {
        id: 'province_name',
        numeric: false,
        disablePadding: true,
        label: 'Province',
      },
    ],
    postData: [
      'subdistrict_id',
      'city_id',
      'district_id',
      'province_id',
      'country_code',
      'zip_code',
    ],
    idfield: 'id',
    listForm: genericList,
    createForm: zipcode,
  },
  timezones: {
    columnData: [
      {id: 'time_zone_id', numeric: false, disablePadding: false, label: 'ID'},
      {
        id: 'district',
        numeric: false,
        disablePadding: false,
        label: 'District',
      },
      {
        id: 'time_zone_name',
        numeric: false,
        disablePadding: false,
        label: 'Name',
      },
    ],
    idfield: 'time_zone_id',
    listForm: genericList,
    createForm: timezone,
  },
};
export default form;
