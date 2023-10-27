import React from 'react';

const CustomButton = ({onClick, buttonName, className}: {onClick: Function; buttonName: string; className?: string}) => {
    const defaultClass: string = 'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded';
    const handleClick = () => {
        onClick();
    };

    return (
        <>
            <button className={className ? className : defaultClass} onClick={() => handleClick()}>
                {buttonName}
            </button>
        </>
    );
};

export default CustomButton;
