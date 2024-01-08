import Link from 'next/link'
import { useRouter } from 'next/router'
import { PageLayout } from '@/components/layout'
import { useEffect, useState } from "react";
import { IPost } from "@/types/posts";

export const PostCard = (props: IPost) => {
  const router = useRouter()
  const { body, title, id } = props

  return (
    <Link href={router.pathname + '/' + id} id={"post"}>
      <div className="mt-4 flex w-100 rounded-md gap-10 bg-blue-200 p-2 border-r-4">
        <div>
          <span className="ml-auto font-bold text-gray-900">{title}</span>
        </div>
        <div>
          <span className="ml-auto font-semibold text-gray-700">{body}</span>
        </div>
      </div>
    </Link>
  )
}


export default function Post() {

  const [posts, setPosts] = useState<IPost[]>([])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <PageLayout>
      <div>
        <div id={'posts'} className="grid grid-cols-2 gap-4 ml-4 mr-4">
          {posts.map((post) => {
            return <PostCard {...post} key={post.id} />
          })}
        </div>
      </div>
    </PageLayout>
  )
}
