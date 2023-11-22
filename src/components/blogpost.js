import * as React from "react"

import Tag from "../components/tag"



const BlogPost = ({ id, title, date, excerpt, categories }) => {

    return (
        <div className="flex flex-col gap-2">
            <p className="text-ellipsis font-bold text-2xl text-red-900 dark:text-red-500">{title}</p>
            <p className="text-base text-red-900 dark:text-slate-400">{date}</p>
            <p className="text-ellipsis line-clamp-2 text-lg text-black max-w-prose dark:text-white">{excerpt}</p>

            <div className="flex flex-row gap-3">
                {
                    categories.split('|').map((category) => {
                        return <Tag key={category} category={category} />
                    })

                }
            </div>

        </div>
    )
}

export default BlogPost