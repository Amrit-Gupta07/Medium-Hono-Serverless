import React from 'react'

import {Blog} from "../hooks/index.js"
import { Appbar } from './Appbar.js'
export const FullBlog = ({ blog } :{blog : Blog}) => {
  return (
    <div>

        <Appbar/>

        <div>
            {blog.title}
        </div>
        <div className="text-slate-500 pt-2">
                        Post on 2nd December 2023
                    </div>
        <div>
            {blog.content}
        </div>

    </div>
  )
}
