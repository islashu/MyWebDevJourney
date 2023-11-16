import {Avatar} from '@mantine/core';
import React, {FC} from 'react';
import {TbBrandTinder} from 'react-icons/tb';

interface CustomAvatarProps {}

const CustomAvatar: FC<CustomAvatarProps> = () => {
    return (
        <div>
            <Avatar size={30} radius={20}>
                <TbBrandTinder size={20} />
            </Avatar>
        </div>
    );
};

export default CustomAvatar;
