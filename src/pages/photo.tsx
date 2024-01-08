import Link from 'next/link'
import { useRouter } from 'next/router'
import { PageLayout } from '@/components/layout'
import { useEffect, useState } from "react";
import { IPhoto } from "@/types/photos";

export const PhotoCard = (props: IPhoto) => {
  const router = useRouter()
  const { url, title, id } = props

  return (
    <Link href={router.pathname + '/' + id} id={"photo"}>
      <div className="mt-2 flex justify-between w-80 rounded-md bg-blue-200 p-2 gap-2">
        <img width={120} height={120} src={url} alt={'post'}/>
        <p className="font-semibold text-gray-900">{title}</p>
      </div>
    </Link>
  )
}


export default function Photo() {

  const [photos, setPhotos] = useState<IPhoto[]>([])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/photos');
        const data = await response.json();
        setPhotos(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <PageLayout>
      <div>
        <div id={'photos'} className="grid grid-cols-2 gap-4 ml-2 mr-2">
          {photos.map((photo) => {
            return <PhotoCard {...photo} key={photo.id} />
          })}
        </div>
      </div>
    </PageLayout>
  )
}
