import * as React from "react"

import Tag from "../components/tag"



const BlogPost = ({ title, date, excerpt, categories }) => {

    return (
        <div class="flex flex-col gap-2">
            <p class="text-ellipsis font-bold text-2xl text-red-900 dark:text-red-500">{title}</p>
            <p class="text-base text-red-900 dark:text-slate-400">{date}</p>
            <p class="text-ellipsis line-clamp-2 text-lg text-black max-w-prose dark:text-white">{excerpt}</p>

            <div class="flex flex-row gap-3">
                {
                    categories.split('|').map((category) => {
                        return <Tag category={category} />
                    })

                }
            </div>

        </div>
    )
}

export default BlogPost