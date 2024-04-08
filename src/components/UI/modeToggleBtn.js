import React from 'react';
import './modeToggleBtn.css';
import { useTheme } from '../../ThemeContext'; 

function Toggle() {
    const { toggleTheme } = useTheme();

    return (
        <div>
            <input className="toggleBtn" type="checkbox" id="darkmode-toggle" onChange={toggleTheme} />
            <label className="toggleBtn" htmlFor="darkmode-toggle">
                <svg version="1.0" className="sun" xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 64 64" enableBackground="new 0 0 64 64">
                    {/* Sun SVG paths */}
                    <g>
                        <path fillRule="evenodd" clipRule="evenodd" fill="#FFD93D" d="M32,14.002c-9.941,0-18,8.059-18,18s8.059,18,18,18s18-8.059,18-18S41.941,14.002,32,14.002z M32,48.002c-8.837,0-16-7.164-16-16s7.163-16,16-16s16,7.164,16,16S40.837,48.002,32,48.002z" />
                        {/* Other sun paths */}
                    </g>
                </svg>
                <svg className="moon" width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Moon SVG paths */}
                    <path fillRule="evenodd" clipRule="evenodd" d="M18 2.75C17.5858 2.75 17.25 2.41421 17.25 2C17.25 1.58579 17.5858 1.25 18 1.25H22C22.3034 1.25 22.5768 1.43273 22.6929 1.71299C22.809 1.99324 22.7449 2.31583 22.5304 2.53033L19.8107 5.25H22C22.4142 5.25 22.75 5.58579 22.75 6C22.75 6.41421 22.4142 6.75 22 6.75H18ZM13.5 8.75C13.0858 8.75 12.75 8.41421 12.75 8C12.75 7.58579 13.0858 7.25 13.5 7.25H16.5C16.8034 7.25 17.0768 7.43273 17.1929 7.71299C17.309 7.99324 17.2449 8.31583 17.0304 8.53033L15.3107 10.25H16.5C16.9142 10.25 17.25 10.5858 17.25 11C17.25 11.4142 16.9142 11.75 16.5 11.75H13.5C13.1967 11.75 12.9232 11.5673 12.8071 11.287C12.691 11.0068 12.7552 10.6842 12.9697 10.4697L14.6894 8.75H13.5Z" fill="#1C274C" />
                    {/* Other moon paths */}
                </svg>
            </label>
        </div>
    );
}

export default Toggle;
