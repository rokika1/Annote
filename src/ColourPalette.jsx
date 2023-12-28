import { useState } from "react";

const defaultPalette = ['#ff00ff', '#ffff00', '#00ff00', '#00ffff'];
const pastelPalette = ['#f2c6de', '#faedcb', '#c9e4de', 'c6def1'];

export default function ColourPalette() {
    const [palette, setPalette] = useState(pastelPalette);
    
    // TODO: to be completed when side bar is made.
    const handlePalette = (event, newPalette) => {
        setPalette(newPalette);
    };
    return palette;
}