// I couldn't create a billing account thats why not working properly

import React, { useState, useCallback } from 'react'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api'

function Map({ lat, lng }) {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script', googleMapsApiKey: 'AIzaSyCqzD1TYHh-qlP1ySSHV-7QZJ6qoeuy_JE'
    })

    const [map, setMap] = useState(null)

    const onLoad = useCallback(map => {
        const bounds = new window.google.maps.LatLngBounds()
        map.fitBounds(bounds)
        setMap(map)
    })

    return isLoaded ? (
        <GoogleMap center={{ lat, lng }} mapContainerClassName="map" zoom={10} onLoad={onLoad} onUnmount={() => setMap(null)}/>
    ) : (<div></div>)
}

export default Map
