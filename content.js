document.addEventListener('mouseup', function(e) {
    var selection = window.getSelection();

    if (selection.toString().length > 0) {

        if(!document.getElementById('boldButton')){
            var boldButton = document.createElement('button');

            boldButton.textContent = 'Bold';
            boldButton.id = 'boldButton';
            boldButton.style.position = 'absolute';
            boldButton.style.left = e.clientX + 'px';
            boldButton.style.top = e.clientY + 'px';

            document.body.appendChild(boldButton);

            boldButton.addEventListener('click', function() {
                var range = selection.getRangeAt(0);
                var strongTag = document.createElement('strong');
                range.surroundContents(strongTag);
                // Remove button
                document.body.removeChild(boldButton);
                window.getSelection().removeAllRanges();
            });
        }
    }
});

document.addEventListener('mousedown', function(e) {
    // Remove button
    var boldButton = document.getElementById('boldButton');

    if(boldButton && !boldButton.contains(e.target)){
        document.body.removeChild(boldButton);
        window.getSelection().removeAllRanges();
    }
});
