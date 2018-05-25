<?php

namespace App\Observers;

use App\MotivationalQuoteAuthor;

class MotivationalQuoteAuthorObserver
{
    /**
     * Listen to the MotivationalQuoteAuthor created event.
     *
     * @param  \App\MotivationalQuoteAuthor  $galleryAlbum
     * @return void
     */
    public function created(MotivationalQuoteAuthor $galleryAlbum)
    {
    }

    /**
     * Listen to the MotivationalQuoteAuthor deleting event.
     *
     * @param  \App\MotivationalQuoteAuthor  $galleryAlbum
     * @return void
     */
    public function deleting(MotivationalQuoteAuthor $author)
    {
        $author->quotes->each(function ($quote) {
            $quote->delete();
        });
    }
}
