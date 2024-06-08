import React from 'react'
import { Link } from 'react-router-dom';

interface BlogCardInterface{
    authorName: string;
    title: string;
    content: string;
    publishedDate: string;
    id: string;
}



export const BlogCard = ({title,content,id,authorName,publishedDate} : BlogCardInterface) => {
  return (

    <Link to= {`/blog/${id}`}>
    <div className='p-4 border-b border-slate-200 max-w-screen-md w-screen cursor-pointer'>
        <div className='flex'>
            <Avtar name= {authorName}/>
            <div className='font-extralight text-sm flex flex-col justify-center pl-2'>{authorName}</div>
            <div className='flex flex-col justify-center pl-2'> <Circle/></div>
            <div className='text-slate-500 text-sm flex flex-col justify-center pl-2'>{publishedDate}</div>
        </div>
        <div className='text-xl font-semibold pt-2'>
            {title}
        </div>
        <div className='text-md font-thin'>
            {content.slice(0,100) + "..."}
        </div>
        <div className='text-slate-500 text-sm font-thin pt-4 '>
            {`${Math.ceil(content.length/100)} min read`}
        </div>
    </div>
    </Link>
  )
}


export function Avtar({name,size = "small"} : {name: string, size?: "small" | "big"}){
    return(
        <div className={`relative inline-flex items-center justify-center overflow-hidden bg-gray-600 rounded-full ${size === "small" ? "w-6 h-6" : "w-10 h-10"}`}>
        <span className={`${size === 'small' ? 'text-xs' : 'text-md'} font-extralight text-gray-600 dark:text-gray-300`}>
            {name[0]}
        </span>
        </div>
    )
}

export function Circle(){
    return (
        <div className='rounded-full h-1 w-1 bg-slate-500'>

        </div>
    )
}