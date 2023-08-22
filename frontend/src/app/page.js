import Image from 'next/image';
import dynamic from 'next/dynamic';
import {useMemo} from 'react';
import LoadSVG from '../../public/spinning-circles.svg';

export default function Home() {
  const Map =  dynamic(
    () => import('@/components/map'),
    { 
      loading: () => <Image className="block m-auto" src={LoadSVG} width={150} height={150} />,
      ssr: false
    }
  )
  
  return (
    <main className="flex min-h-screen text-center flex-col bg-[#202125]">
      <h1 className="text-7xl font-bold tracking-tight text-[#6091AF] p-5">Spatial Laser Demo</h1>
      <Map />
    </main>
  )
}
