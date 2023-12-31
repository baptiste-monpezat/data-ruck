import * as React from "react"

import { Menu } from '@headlessui/react'
import { Link } from "gatsby"



const DropDown = () => {

    return (
        <div className="md:hidden">
            <Menu as="div">
                <Menu.Button id={"dropdown"}>
                    <div className="block dark:hidden">
                        <svg width="100" height="50" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#7f1d1d"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier">
                                <path d="M4 18L20 18" stroke="#7f1d1d" strokeWidth="2" strokeLinecap="round"></path> <path d="M4 12L20 12" stroke="#7f1d1d" strokeWidth="2" strokeLinecap="round"></path>
                                <path d="M4 6L20 6" stroke="#7f1d1d" strokeWidth="2" strokeLinecap="round"></path> </g></svg>
                    </div>
                    <div className="hidden dark:block">
                        <svg width="100" height="50" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier">
                                <path d="M4 18L20 18" stroke="#ffffff" strokeWidth="2" strokeLinecap="round"></path> <path d="M4 12L20 12" stroke="#ffffff" strokeWidth="2" strokeLinecap="round"></path>
                                <path d="M4 6L20 6" stroke="#ffffff" strokeWidth="2" strokeLinecap="round"></path> </g></svg>
                    </div>
                </Menu.Button>
                <Menu.Items className="absolute right-0 w-56 rounded-md bg-white dark:bg-slate-800 z-10">
                    <div className="px-1 py-1 ">
                        <Menu.Item>
                            {({ active }) => (
                                <Link to="/blog">
                                    <button
                                        className={`font-bold text-red-900 dark:text-white hover:bg-red-50 dark:hover:bg-slate-500 group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                    >
                                        ARTICLES
                                    </button>
                                </Link>
                            )}
                        </Menu.Item>
                        <Menu.Item>
                            {({ active }) => (
                                <Link to="/about">
                                    <button
                                        className={`font-bold text-red-900 dark:text-white hover:bg-red-50 dark:hover:bg-slate-500 group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                    >
                                        ABOUT
                                    </button>
                                </Link>
                            )}
                        </Menu.Item>
                    </div>

                </Menu.Items>
            </Menu>
        </div>
    )


}

export default DropDown

