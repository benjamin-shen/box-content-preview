import React from 'react';
import IconEdit24 from '../icons/IconEdit24';
import './EditControl.scss';

export type Props = {
    onEditImageClick: () => void;
};

export default function EditControl({ onEditImageClick }: Props): JSX.Element {
    return (
        <button className="bp-EditControl" onClick={onEditImageClick} title={__('edit_image')} type="button">
            <IconEdit24 />
        </button>
    );
}
