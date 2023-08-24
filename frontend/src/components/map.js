'use client';
import { useState } from 'react';
import { MapContainer, TileLayer, useMapEvents, Circle, CircleMarker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import Image from 'next/image';
import LoadSVG from '../../public/spinning-circles.svg';
import getCentroidIncomePopulation from '@/api/map/getIncomePopulation';
import '@/styles/map.css';

export default function Map() {
    const CollinCountyLocation = [33.188217, -96.556555];
    const [locate, setLocate] = useState(CollinCountyLocation);
    const [radius, setRadius] = useState(0);
    const [showValue, setShowValue] = useState({"initial": 1});

    function LocateCursor () {
        useMapEvents({
            click: (e) => {
                setLocate([e.latlng['lat'], e.latlng['lng']])
            }
        })
    }

    const findIncomePopulation = async () => {
        const result = await getCentroidIncomePopulation(locate, radius, setShowValue);
        setShowValue({"found": result})
    }

    const changeRadiusInput = (e) => {
        setRadius(e.target.value);
        setShowValue({"initial": 1});
    }

    return (
        <div className="justify-center">
            <div className="flex justify-center mt-2">
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
            <label htmlFor="range" className="mx-auto mt-5 block text-2xl font-bold text-white dark:text-white">Radius: {radius/1000} km</label>
            { (showValue?.initial) && 
                <div> 
                    <input id="range" type="range" min={1} max={100000}
                    value={radius}
                    onChange={e => changeRadiusInput(e)}
                    className="mx-auto mt-5 w-8/12 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700">
                    </input>
                    <button onClick={findIncomePopulation} className="block mx-auto mt-5 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full">
                        Find Income and Population
                    </button>
                </div>
            }
            {(showValue?.fetching) &&  <Image className="block m-auto mt-5" alt="loading" src={LoadSVG} width={40} height={40} />}
            {(showValue?.found) &&  
                (<div>
                    <input id="range" type="range" min={1} max={100000}
                        value={radius}
                        onChange={e => changeRadiusInput(e)}
                        className="mx-auto mt-5 w-8/12 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700">
                    </input>
                    {(showValue?.found == "error")
                        ?   <button onClick={findIncomePopulation} className="block mx-auto mt-5 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full">
                                Find Income and Population
                            </button>
                        :   <p className="mx-auto mt-5 block text-2xl font-bold text-white dark:text-white">
                                Average Income: {showValue?.found?.averageIncome} &nbsp
                                Total Population: {showValue?.found?.totalPopulation}
                            </p>
                    }
                </div>)
            }
        </div>
    )
}
