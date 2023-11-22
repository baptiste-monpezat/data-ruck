import * as React from "react"

import { useState, useEffect } from 'react'
import { Switch } from '@headlessui/react'

const Toggle = () => {
    const [enabled, setEnabled] = useState(() => {
        if (typeof window !== 'undefined') {
            const initialTheme = localStorage.getItem("theme");
        } else {
            const initialTheme = "dark"
        }

        return initialTheme === "light" ? true : false
    })

    useEffect(() => {
        if (enabled) {
            localStorage.theme = "light"
        } else {
            localStorage.theme = "dark"
        }

        if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }


    }, [enabled])

    return (
        <Switch
            checked={enabled}
            onChange={setEnabled}
            className={`${enabled ? 'bg-red-900' : 'bg-gray-200'
                } relative right-10 hidden md:inline-flex h-7 w-12 items-center rounded-full`}
        >
            <span className="sr-only">Enable notifications</span>
            <span
                className={`${enabled ? 'translate-x-5' : 'translate-x-1'
                    } inline-block h-5 w-5 transform rounded-full bg-white transition`}
            />
        </Switch>
    )
}



export default Toggle