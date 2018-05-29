<?php

namespace App\Observers;

use App\ChatMessage;
use App\Events\NewChatMessage;

class ChatMessageObserver
{
    /**
     * Listen to the ChatMessage created event.
     *
     * @param  \App\ChatMessage  $galleryAlbum
     * @return void
     */
    public function created(ChatMessage $chatMessage)
    {
        broadcast(new NewChatMessage($chatMessage))->toOthers();
    }

    /**
     * Listen to the ChatMessage deleting event.
     *
     * @param  \App\ChatMessage  $galleryAlbum
     * @return void
     */
    public function deleting(ChatMessage $chatMessage)
    {
    }
}
