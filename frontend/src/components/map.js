'use client';
import { useState } from 'react';
import { MapContainer, TileLayer, useMapEvents, Circle, CircleMarker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import '@/styles/map.css';

export default function Map() {
    const CollinCountyLocation = [33.188217, -96.556555];
    const [locate, setLocate] = useState(CollinCountyLocation);
    const [radius, setRadius] = useState(0)

    function LocateCursor () {
        useMapEvents({
            click: (e) => {
                console.log(locate, e.latlng)
                setLocate([e.latlng['lat'], e.latlng['lng']])
            }
        })
    }

    return (
        <div className=" justify-center">
            <div className=" flex justify-center mt-2">
                <MapContainer center={CollinCountyLocation} zoom={11} style={{height: 750, width: "75%"}} >
                    <LocateCursor />
                    <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        maxZoom={15}
                    />
                    <CircleMarker center={locate} radius={5} color="red" fill="red" fillOpacity={0.6} />
                    <Circle center={locate} radius={radius} />
                </ MapContainer>
            </div>
            <div className=" flex justify-center mt-5">
                <label htmlFor="range" className="block text-2xl font-bold text-white dark:text-white">Radius: {radius/1000} km</label>
            </div>
            <div className=" flex justify-center mt-5">
                <input id="range" type="range" min={0} max={100000}
                    value={radius}
                    onInput={e => setRadius(e.target.value)}
                    onChange={e => setRadius(e.target.value)}
                    className="w-8/12 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700">
                </input>
            </div>
        </div>
    )
}
