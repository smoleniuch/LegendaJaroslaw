<?php

namespace App\Services;

use App\MotivationalQuote;
use App\MotivationalQuoteAuthor;
use Illuminate\Support\Facades\Storage;

class MotivationalQuoteService
{
    public function getQuoteOfTheDay()
    {
        $quoteOfADay = MotivationalQuote::where('quote_of_the_day', true)->first();
        if ($quoteOfADay) {
            $quoteOfADay->makeVisible('author');
        }
        

        return $quoteOfADay;
    }

    public function shuffleQuoteOfTheDay()
    {
        $currentQuoteOfADay = $this->getQuoteOfTheDay();

        $randomQuote = MotivationalQuote::where('quote_of_the_day', false)->inRandomOrder()->first();

        if ($currentQuoteOfADay) {
            $currentQuoteOfADay->update(['quote_of_the_day' => false]);
        }

        $randomQuote->update(['quote_of_the_day' => true]);

        return $randomQuote;
    }

    public function saveQuote($data, $quoteId = null)
    {
        $textQuote = data_get($data, 'text');
        $authorData = data_get($data, 'author');
        $authorId = data_get($data, 'author.id');
        $data = [];
        
        if ($authorData) {
            $author = $this->saveAuthor($authorId, $authorData);
        }

        if ($quoteId) {
            $quote = MotivationalQuote::findOrFail($quoteId);
        } else {
            $quote = new MotivationalQuote();
        }

        $quote->text = $textQuote;
        if (isset($author)) {
            $quote->author()->associate($author);
            $data['author'] = $author;
        } else {
            $quote->author()->dissociate();
        }
        
        $quote->save();
        $data['quote'] = $quote;

        return $data;
    }

    public function saveAuthor($authorId, $authorData)
    {
        $authorData = collect($authorData);
        $avatarFile = $authorData->get('avatarFile');
        $motivationalQuoteAuthor;

        if ($authorId) {
            $motivationalQuoteAuthor = MotivationalQuoteAuthor::findOrFail($authorId);
            $motivationalQuoteAuthor->update(['name' => $authorData->get('name', '')]);
        } else {
            $motivationalQuoteAuthor = MotivationalQuoteAuthor::create(['name' => $authorData->get('name')]);
        }
        
        if ($avatarFile) {
            $this->deleteAuthorAvatarFile($motivationalQuoteAuthor);

            $filePath = $avatarFile->store('public/images/avatars');

            $motivationalQuoteAuthor->update([
                'avatar_path_url' => Storage::url($filePath),
                ]);
        }

        return $motivationalQuoteAuthor;
    }

    public function deleteAuthorAvatarFile(MotivationalQuoteAuthor $author)
    {
        $avatarPathUrl = $author->avatar_path_url;
            
        if ($avatarPathUrl) {
            preg_match('/[^\/]+$/', $avatarPathUrl, $match);
            $fileName = $match[0];
            return Storage::delete('public/images/avatars/' . $fileName);
        }

        return false;
    }
}
