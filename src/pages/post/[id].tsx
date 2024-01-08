import { PageLayout } from '@/components/layout'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { IPost } from "@/types/posts";


export default function PhotoDetails({
  post,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <PageLayout>
      <div className="flex h-max w-full flex-col gap-20 p-4 bg-blue-200 m-4">
        <div className="flex justify-center mt-4">
          <span className="rounded-md p-1 font-bold text-gray-900">{post.title}</span>
        </div>
        <div className="flex justify-center">
          <p className="rounded-md w-100 font-semibold text-gray-900" id="post-body">{post.body}</p>
        </div>
      </div>
    </PageLayout>
  )
}

export const getServerSideProps: GetServerSideProps<{ post: IPost }> = async ({ params }) => {
  if (!params?.id) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${params.id}`);
    const data = await response.json();

    return {
      props: {
        post: data,
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};
