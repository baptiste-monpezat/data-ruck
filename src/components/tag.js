import * as React from "react"


const Tag = ({ category }) => {

    return (
        <div className="flex w-fit rounded-xl bg-red-900 dark:bg-white px-2">
            <p className="font-semibold text-base text-white dark:text-slate-800 ">{category}</p>
        </div>
    )

}

export default Tag