import * as React from "react"

import { useState, useEffect } from 'react'
import { Switch } from '@headlessui/react'

function getInitialColorMode() {
    if (typeof window !== 'undefined') {
        const persistedColorPreference = window.localStorage.getItem('color-mode');
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
        return 'light';
    } else {
        return 'light'
    }
}

const Toggle = () => {
    const [enabled, setEnabled] = useState(getInitialColorMode() === "light")


    useEffect(() => {
        if (enabled) {
            window.localStorage.setItem('color-mode', "light");
            document.documentElement.classList.remove('dark')
        } else {
            window.localStorage.setItem('color-mode', "dark");
            document.documentElement.classList.add('dark')
        }

    }, [enabled])



    return (

        <Switch
            id={'darkModeSwitch'}
            checked={enabled}
            onChange={setEnabled}
            className='bg-red-900 dark:bg-gray-200 hidden md:inline-flex h-7 w-11 items-center rounded-full'
        >
            <span className="sr-only">Enable notifications</span>
            <span
                className='translate-x-5 dark:translate-x-1 inline-block h-5 w-5 transform rounded-full bg-white transition'
            />
        </Switch>
    )

}



export default Toggle