import { PageLayout } from '@/components/layout'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { IPhoto } from "@/types/photos";


export default function PhotoDetails({
  photo,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <PageLayout>
      <div className="flex h-max w-full flex-col justify-center gap-20">
        <div className="flex justify-center mt-4">
          <span className="rounded-md p-1 font-bold text-gray-900">{photo.title}</span>
        </div>
        <div className="flex justify-center">
          <img width={300} height={300} src={photo.url}/>
        </div>
      </div>
    </PageLayout>
  )
}

export const getServerSideProps: GetServerSideProps<{ photo: IPhoto }> = async ({ params }) => {
  if (!params?.id) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/photos/${params.id}`);
    const data = await response.json();

    return {
      props: {
        photo: data,
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};
