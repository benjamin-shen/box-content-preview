import React from 'react';
import AnnotationsControls, { Props as AnnotationsControlsProps } from '../controls/annotations';
import ControlsBar, { ControlsBarGroup } from '../controls/controls-bar';
import ExperiencesProvider, { Props as ExperiencesProviderProps } from '../controls/experiences';
import FullscreenToggle, { Props as FullscreenToggleProps } from '../controls/fullscreen';
import EditControl, { Props as EditControlProps } from '../controls/edit';
import ZoomControls, { Props as ZoomControlsProps } from '../controls/zoom';

export type Props = AnnotationsControlsProps &
    EditControlProps &
    ExperiencesProviderProps &
    FullscreenToggleProps &
    ZoomControlsProps;

export default function ImageControls({
    annotationColor,
    annotationMode,
    experiences,
    hasDrawing,
    hasHighlight,
    hasRegion,
    onAnnotationModeClick,
    onAnnotationModeEscape,
    onEditImageClick,
    onFullscreenToggle,
    onZoomIn,
    onZoomOut,
    scale,
}: Props): JSX.Element {
    return (
        <ExperiencesProvider experiences={experiences}>
            <ControlsBar>
                <ControlsBarGroup isDistinct>
                    <ZoomControls onZoomIn={onZoomIn} onZoomOut={onZoomOut} scale={scale} />
                </ControlsBarGroup>
                <ControlsBarGroup>
                    <FullscreenToggle onFullscreenToggle={onFullscreenToggle} />
                    <AnnotationsControls
                        annotationColor={annotationColor}
                        annotationMode={annotationMode}
                        hasDrawing={hasDrawing}
                        hasHighlight={hasHighlight}
                        hasRegion={hasRegion}
                        onAnnotationModeClick={onAnnotationModeClick}
                        onAnnotationModeEscape={onAnnotationModeEscape}
                    />
                    <EditControl onEditImageClick={onEditImageClick} />
                </ControlsBarGroup>
            </ControlsBar>
        </ExperiencesProvider>
    );
}
