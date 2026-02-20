export interface BarangayData {
  barangay_list: string[];
}

export interface MunicipalityList {
  [municipalityName: string]: {
    barangay_list: string[];
  };
}

export interface ProvinceData {
  municipality_list: MunicipalityList;
}

export interface RegionData {
  region_name: string;
  province_list: {
    [provinceName: string]: ProvinceData;
  };
}

export interface PhilippinesData {
  [regionCode: string]: RegionData;
}
