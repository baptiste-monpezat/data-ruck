import * as React from "react"

import { useState, useEffect } from 'react'
import { Switch } from '@headlessui/react'

function getInitialColorMode() {
    if (typeof window !== 'undefined') {
        const persistedColorPreference = window.localStorage.getItem('color-mode');
        console.log(persistedColorPreference)
        const hasPersistedPreference = typeof persistedColorPreference === 'string';
        // If the user has explicitly chosen light or dark,
        // let's use it. Otherwise, this value will be null.
        if (hasPersistedPreference) {
            return persistedColorPreference;
        }
        // If they haven't been explicit, let's check the media
        // query
        const mql = window.matchMedia('(prefers-color-scheme: dark)');
        const hasMediaQueryPreference = typeof mql.matches === 'boolean';
        if (hasMediaQueryPreference) {
            return mql.matches ? 'dark' : 'light';
        }
        // If they are using a browser/OS that doesn't support
        // color themes, let's default to 'dark'.
        return 'dark';
    } else {
        return 'dark'
    }
}

const Toggle = () => {
    const [enabled, setEnabled] = useState(() => {
        return getInitialColorMode() === "light" ? true : false;
    })

    useEffect(() => {
        console.log(enabled)
        if (enabled) {
            window.localStorage.setItem('color-mode', "light");
        } else {
            window.localStorage.setItem('color-mode', "dark");
        }

        let colorMode = getInitialColorMode()

        if (colorMode === 'dark') {
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