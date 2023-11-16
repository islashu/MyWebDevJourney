import React from 'react';
import CustomUserNavMenu from '../UserNavMenu/CustomUserNavMenu.tsx';
import {Link} from 'react-router-dom';
import {TbBrandLinkedin} from 'react-icons/tb';
import {TbBrandGithub} from 'react-icons/tb';

const NetworkNavBar = () => {
    return (
        <>
            <nav className="flex justify-center my-auto">
                <span className="flex justify-between gap-4">
                    <a href="https://www.linkedin.com/in/benjamin-choo-15a022203/">
                        <TbBrandLinkedin size={25}></TbBrandLinkedin>
                    </a>
                    <a href="https://github.com/islashu">
                        <TbBrandGithub size={25}></TbBrandGithub>
                    </a>
                </span>
            </nav>
        </>
    );
};

export default NetworkNavBar;
