import { useState } from 'react';

export const useProfileImage = () => {

    const getImage = () => {
        const image = localStorage.getItem('profile_pic');
        return image ? image : undefined;
    };

    const [image, setImage] = useState(getImage());

    const saveImage = (image: any) => {
        localStorage.setItem('profile_pic', image);
        setImage(image);
    };

    const deleteImage = () => {
        localStorage.removeItem('profile_pic');
        setImage(getImage());
    }

    return {
        setImage: saveImage,
        image,
        deleteImage
    }
}