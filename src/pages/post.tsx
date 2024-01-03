import Link from 'next/link'
import { useRouter } from 'next/router'
import { PageLayout } from '@/components/layout'
import { useEffect, useState } from "react";
import axios from "axios";
import { IPost } from "@/types/posts";

export const PostCard = (props: IPost) => {
  const router = useRouter()
  const { body, title, id } = props

  return (
    <Link href={router.pathname + '/' + id}>
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
        const response = await axios.get<IPost[]>('https://jsonplaceholder.typicode.com/posts');
        console.log('data', response.data);
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <PageLayout>
      <div>
        <div className="grid grid-cols-2 gap-4 ml-4 mr-4">
          {posts.map((post) => {
            return <PostCard {...post} key={post.id} />
          })}
        </div>
      </div>
    </PageLayout>
  )
}
