import React from 'react';
import {Link} from 'react-router-dom';
import {Divider} from '@mantine/core';

const Footer = () => {
    return (
        <>
            <Divider className="w-full p-2" />
            <footer className=" w-full flex justify-center py-4">
                <div className="w-full bottom-0 left-0 right-0 flex justify-center gap-20 text-slate-600">
                    <div className="flex flex-col">
                        <header className="font-bold sd relative text-base w-fit block after:block after:content-[''] after:absolute after:h-[3px] after:bg-black after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-center">
                            {' '}
                            Home
                        </header>
                        <Link
                            to="/"
                            className="text-sm relative w-fit block after:block after:content-[''] after:absolute after:h-[3px] after:bg-black after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-center"
                        >
                            Home
                        </Link>
                    </div>
                    <div className="flex flex-col">
                        <header className="font-bold sd relative text-base w-fit block after:block after:content-[''] after:absolute after:h-[3px] after:bg-black after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-center">
                            Reference
                        </header>
                        <Link
                            to="/reference"
                            className="text-sm relative w-fit block after:block after:content-[''] after:absolute after:h-[3px] after:bg-black after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-center"
                        >
                            Reference
                        </Link>
                    </div>
                </div>
            </footer>
        </>
    );
};

export default Footer;
