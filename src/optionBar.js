const pastelPalette = ['#f2c6de', '#faedcb', '#c9e4de', '#c6def1'];
const normalPalette = ['#ff00ff', '#ffff00', '#00ff00', '#00ffff'];
let colourState = pastelPalette;

// Initialise Option Bar Event Listeners
document.addEventListener('mouseup', function(e) {
    var selection = window.getSelection();
    // var selection = window.getSelection().toString();

    if (selection.length > 0) {
        if (document.getElementById('optionBar')) return;

        // Create Option Bar
        var optionBar = document.createElement('div');
        optionBar.id = 'optionBar';
        optionBar.style.position = 'absolute';
        optionBar.style.left = e.clientX + 'px';
        optionBar.style.top = e.clientY + 'px';

        document.body.appendChild(optionBar);

        // Highlighter
        if (colourState == pastelPalette) {
            highlightElement(optionBar, selection, pastelPalette);
        } else {
            highlightElement(optionBar, selection, normalPalette);
        }
        
        boldElement(optionBar, selection);
        underlineElement(optionBar, selection);
        // removeElement(optionBar, selection);
    }
});

// Highlight Text
function highlightElement(optionBar, selection, palette) {
    for (let i = 0; i < palette.length; i++) {
        var highlighterButton = document.createElement('button');
        highlighterButton.textContent = 'Highlight' + i;
        highlighterButton.id = 'highlighterButton' + i;

        optionBar.appendChild(highlighterButton);

        highlighterButton.addEventListener('click', function() {
            // var range = selection.getRangeAt(0);
            // var tag = document.createElement('mark');
            // tag.style.backgroundColor = palette[i];
            // range.surroundContents(tag);
            tagAllChar(selection, 'mark', palette[i]);
            removeBar(optionBar);
        });
    }
}

// Bold Text
function boldElement(optionBar, selection) {
    var underlineButton = document.createElement('button');
    underlineButton.textContent = 'Underline';
    underlineButton.id = 'underlineButton';

    optionBar.appendChild(underlineButton);

    underlineButton.addEventListener('click', function() {
        var range = selection.getRangeAt(0);
        var tag = document.createElement('u');
        range.surroundContents(tag);
        removeBar(optionBar);
    });
}

// Underline Text
function underlineElement(optionBar, selection) {
    var boldButton = document.createElement('button');
    boldButton.textContent = 'Bold';
    boldButton.id = 'boldButton';

    optionBar.appendChild(boldButton);
    
    boldButton.addEventListener('click', function() {
        var range = selection.getRangeAt(0);
        var tag = document.createElement('b');
        range.surroundContents(tag);
        removeBar(optionBar);
    });
}

// Tag every char in the selected text separately
function tagAllChar(selection, name, colour) {
    var range = selection.getRangeAt(0);
    range.deleteContents();

    let selectionString = selection.toString();
    let start = null;
    let end = null;

    for (const i in selectionString) {
        var text = document.createTextNode(selectionString[i]);  
        var tag = document.createElement(name);
        start = range.startContainer;
        end = range.endContainer;

        // If highlighter tag then apply colour
        if (colour != null) {
            tag.style.backgroundColor = colour;
        }

        tag.appendChild(text);

        // Insert node to end of range
        if (i == 0) {
            range.selectNode(tag);
            start = tag;
            end = tag;
        } else {
            range.setStartAfter(end);
            range.insertNode(tag);
            end = tag;
        }

        end = tag;
        range.setStart(start, 0);
        range.setEnd(end, 0);

    }
    selection.addRange(range);


    // selection.toString().forEach(char => {
    //     var text = document.createTextNode(char);  
    //     var tag = document.createElement(name);

    //     // If highlighter tag then apply colour
    //     if (colour != null) {
    //         tag.style.backgroundColor = colour;
    //     }

    //     const node = tag.appendChild(text);

    //     // Create new range and update position
    //     var newRange = document.createRange();
    //     newRange.selectNode(node);
    //     newRange.setStart(node, start++);
    //     newRange.setEnd(node, end);
    //     selection.addRange(newRange);
    // });
}

// Remove changes to text
// function removeElement(optionBar, selection) {
//     var removeButton = document.createElement('button');
//     removeButton.textContent = 'Remove';
//     removeButton.id = 'removeButton';

//     optionBar.appendChild(removeButton);

//     removeButton.addEventListener('click', function() {
//         var range = selection.getRangeAt(0);
//         var removeTag = selection.toString().replace(/(<([^>]+)>)/ig, '');
//         var tag = document.createElement('u');
//         range.surroundContents(tag);
//         removeBar(optionBar);
//     });
// }

// Remove Option Bar
function removeBar(optionBar) {
    const children = optionBar.children;
    for (const kid of children) {
        optionBar.removeChild(kid);
    }
    document.body.removeChild(optionBar);
    window.getSelection().removeAllRanges();
}

// Popup Disappears
document.addEventListener('mousedown', function(e) {
    var optionBar = document.getElementById('optionBar');
    if (optionBar && !optionBar.contains(e.target)) {
        removeBar(optionBar);
    }
});
