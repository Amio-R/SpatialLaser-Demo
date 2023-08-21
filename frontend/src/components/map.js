'use client';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

export default function Map() {
    const CollinCountyLocation = [33.174719, -96.591638];
    return (
        <div className="relative flex justify-center">
            <MapContainer center={CollinCountyLocation} zoom={11} style={{height: 800, width: "75%"}}> 
                <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
            </ MapContainer>
        </div>
    )
}
