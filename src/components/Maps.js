// @flow

import React from 'react';
import {compose, withProps} from 'recompose';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from 'react-google-maps';

import libraryKeys from '../constants/libraryKeys';

export type Coordinate = {
  lat: number,
  lng: number,
};

type Props = {
  defaultCenter: Coordinate,
  defaultZoom?: number,
  markerPositionList?: Array<Coordinate>,
};

const DEFAULT_ZOOM = 15;

export function Maps(props: Props) {
  let {defaultCenter, defaultZoom, markerPositionList} = props;
  return (
    <GoogleMap
      defaultZoom={defaultZoom || DEFAULT_ZOOM}
      defaultCenter={defaultCenter}
    >
      {markerPositionList &&
        markerPositionList.map((markerPosition, index) => {
          return <Marker key={index} position={markerPosition} />;
        })}
    </GoogleMap>
  );
}

export default compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${
      libraryKeys.googleMap.key
    }`,
    loadingElement: <div style={{height: `100%`}} />,
    containerElement: <div style={{height: `100%`}} />,
    mapElement: <div style={{height: `100%`}} />,
  }),
  withScriptjs,
  withGoogleMap,
)(Maps);
