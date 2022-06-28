import React from 'react';
import IconRotate24 from '../icons/IconRotate24';
import './EditControl.scss';

export type Props = {
    onEditImageClick: () => void;
};

export default function EditControl({ onEditImageClick }: Props): JSX.Element {
    return (
        <button className="bp-EditControl" onClick={onEditImageClick} title={__('edit_image')} type="button">
            <IconRotate24 />
        </button>
    );
}
