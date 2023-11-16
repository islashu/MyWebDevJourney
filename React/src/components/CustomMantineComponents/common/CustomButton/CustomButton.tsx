import {Button} from '@mantine/core';
import React, {FC} from 'react';

interface CustomButtonProps {
    name: string;
    onClick?: () => void;
    isDisabled?: boolean;
    className?: string;
    type?: 'button' | 'submit' | 'reset';
    color?: string;
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    variant?: 'default' | 'outline' | 'light' | 'link';
}
const CustomButton: FC<CustomButtonProps> = ({name, onClick, isDisabled, type, className, color, size, variant}) => {
    const handleOnClick = () => {
        onClick();
    };

    return (
        <Button
            className={className}
            disabled={isDisabled}
            size={size}
            variant={variant}
            color={color}
            onClick={onClick ? () => handleOnClick() : null}
            type={type}
        >
            {name}
        </Button>
    );
};

export default CustomButton;
