import Image from 'next/image';
import dynamic from 'next/dynamic';
import {useMemo} from 'react';

export default function Home() {
  const Map =  dynamic(
    () => import('@/components/map'),
    { 
      loading: () => <p>A map is loading</p>,
      ssr: false
    }
  )
  
  return (
    <main className="flex min-h-screen text-center flex-col bg-[#202125] p-5">
      <h1 className="text-7xl font-bold tracking-tight text-[#6091AF] p-5">Spatial Laser Demo</h1>
      <Map />
    </main>
  )
}
