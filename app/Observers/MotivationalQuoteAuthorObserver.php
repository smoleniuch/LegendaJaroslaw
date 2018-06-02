<?php

namespace App\Observers;

use App\MotivationalQuoteAuthor;
use App\Services\MotivationalQuoteService;

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
        $service = new MotivationalQuoteService();
        
        $author->quotes->each(function ($quote) {
            $quote->delete();
        });

        $service->deleteAuthorAvatarFile($author);
    }
}
