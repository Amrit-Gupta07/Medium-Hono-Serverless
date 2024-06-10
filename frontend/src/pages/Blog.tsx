import React from 'react'
import { useParams } from 'react-router-dom'
import { useBlog } from '../hooks';
import { Appbar } from '../components/Appbar';
import { Spinner } from '../components/Spinner';
import { FullBlog } from '../components/FullBlog';

export const Blog = () => {

   const {id} = useParams();
   const {blog,loading} = useBlog({id:id || ""})

   if(loading || !blog){
    return(
      <div>
        <Appbar/>
        <div>
          <div>
              <Spinner/>
          </div>
        </div>
      </div>
    )
   }


  return (
    <div>
      <FullBlog blog = {blog} />
    </div>
  )
}
