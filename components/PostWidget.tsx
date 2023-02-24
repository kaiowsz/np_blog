import React, {useState, useEffect} from 'react'
import moment from 'moment'
import Link from 'next/link'
import { getRecentPosts, getSimilarPosts } from '../services'

interface Post {
  createdAt: string;
  featuredImage: {
    url: string;
  };
  slug: string;
  title: string;
}


const PostWidget = ({categories, slug}: any) => {

  const [relatedPosts, setRelatedPosts] = useState<Post[]>([])

  useEffect(() => {

    if(slug) {
      getSimilarPosts(categories, slug)
        .then((result: any) => setRelatedPosts(result))
    } else {
      getRecentPosts()
        .then((result: any) => setRelatedPosts(result))
    } 
  }, [slug])

  console.log(relatedPosts)

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
      <h3 className="text-xl mb-8 font-semibold border-b pb-4">{slug ? "Related Posts" : "Recent Posts"}</h3>
      
      {relatedPosts.map((post) => (
          <div key={post.title} className="flex items-center w-full mb-4">
            <div className="w-16 flex-none">
              <img src={post.featuredImage.url} alt={post.title} className="rounded-full w-[60px] h-[60px] align-middle" />
            </div>

            <div className="flex-grow ml-4">
              <Link href={`/post/${post.slug}`} className="text-md">
                {post.title}
              </Link>
              <p className="text-gray-500 font-xs">{moment(post.createdAt).format("MMM DD, YYYY")}</p>
            </div>

          </div>
        ))}



    </div>
  )
}

export default PostWidget