import { useState } from "react";
import Highlight from "./Highlight";
import Remove from "./Remove";
import Underline from "./Underline";
import Bold from "./Bold";
import InvertColorsOutlinedIcon from '@mui/icons-material/InvertColorsOutlined';
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import DeleteIcon from "@mui/icons-material/Delete";
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ColourPalette from "../ColourPalette";

const highlight = new Highlight();
const underline = new Underline();
const bold = new Bold();
const remove = new Remove();

// Option bar format (currently only supports the usage of one option at a time)
export default function OptionBar(props) {
    const [formats, setFormats] = useState(null);

    const handleFormat = (event, newFormats) => {
        setFormats(newFormats);
    };

    return (
        <ToggleButtonGroup
            value={formats}
            onChange={handleFormat}
            aria-label="text formatting"
        >
            <ToggleButton value="colour1" aria-label="colour1" onClick={highlight.doAction(props.text, ColourPalette().at(0))}>
                <InvertColorsOutlinedIcon style={{ fill: ColourPalette().at(0)}}/>
            </ToggleButton>
            <ToggleButton value="colour2" aria-label="colour2" onClick={highlight.doAction(props.text, ColourPalette().at(1))}>
                <InvertColorsOutlinedIcon style={{ fill: ColourPalette().at(1)}}/>
            </ToggleButton>
            <ToggleButton value="colour3" aria-label="colour3" onClick={highlight.doAction(props.text, ColourPalette().at(2))}>
                <InvertColorsOutlinedIcon style={{ fill: ColourPalette().at(2)}}/>
            </ToggleButton>
            <ToggleButton value="colour4" aria-label="colour4" onClick={highlight.doAction(props.text, ColourPalette().at(3))}>
                <InvertColorsOutlinedIcon style={{ fill: ColourPalette().at(3)}}/>
            </ToggleButton>
            <ToggleButton value="bold" aria-label="bold" onClick={bold.doAction(props.text)}>
                <FormatBoldIcon />
            </ToggleButton>
            <ToggleButton value="underline" aria-label="underline" onClick={underline.doAction(props.text)}>
                <FormatUnderlinedIcon />
            </ToggleButton>
            <ToggleButton value="remove" aria-label="remove" onClick={remove.doAction(props.text)}>
                <DeleteIcon />
            </ToggleButton>
        </ToggleButtonGroup>
    );
}
