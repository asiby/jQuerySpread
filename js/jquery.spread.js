/**
 * Created by asiby on 2016-07-11.
 */

(function ($) {

    function isOverflown(el) {
        return (el.scrollHeight > $(el).innerHeight());
    }

    $.fn.spread = function (options ) {

        // Split the content word by word.
        var words = null,
            wordCount = 0,
            wordIndex = 0,

            // Extending default options.
            settings = $.extend({
                // These are the defaults.
                contentSelector: "#chained-box-content",
                // If the content property is set, then the contentID will
                // not be used for content source.
                content: null
            }, options );

        if (settings.content) {
            words = settings.content.split(' ');
        } else {
            words = $(settings.contentSelector).html().split(' ');
        }
        wordCount = words.length;

        function refresh() {
            //alert("123");
        }

        return this.each(function(idx, el) {
            var firstWord = true;
            $(el).empty();

            // console.log($(el).attr('id'));

            // For each container, a the content one word at a time until all the words are added or the container is overflown.
            while (!isOverflown(el) && (wordIndex < wordCount)) {
                $(el).append((!firstWord ? ' ' : '') + words[wordIndex]);

                if (firstWord) {
                    firstWord = false;
                }

                if (!isOverflown(el)) {
                    wordIndex++
                } else {
                    // Remove the last word
                    var boxContent = $(el).html();
                    $(el).html(boxContent.substring(0, boxContent.lastIndexOf(" ")));
                    break;
                }
            }
        });
    }
})( jQuery );