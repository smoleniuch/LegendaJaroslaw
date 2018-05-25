<?php

namespace App\Services;

use App\MotivationalQuote;
use App\MotivationalQuoteAuthor;

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
        $data = [];

        if (isset($authorData['id'])) {
            $author = MotivationalQuoteAuthor::findOrFail($authorData['id']);
        } elseif ($authorData) {
            $author = new MotivationalQuoteAuthor($authorData);
            $author->save();
        }


        if ($quoteId) {
            $quote = MotivationalQuote::findOrFail($quoteId);
        } else {
            $quote = new MotivationalQuote();
        }

        $quote->text = $textQuote;
        if (isset($author)) {
            $quote->author()->associate($author);
        } else {
            $quote->author()->dissociate();
        }
        
        $quote->save();
        $data['quote'] = $quote;
        
        if (isset($author)) {
            $data['author'] = $author;
            $author->save();
        }
        return $data;
    }
}
