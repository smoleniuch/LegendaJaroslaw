<?php

namespace App\Services;
use App\MotivationalQuote;

class MotivationalQuoteService {

  public function getQuoteOfTheDay(){

    return MotivationalQuote::where('quote_of_the_day', true)->first();

  }

  public function shuffleQuoteOfTheDay(){

    $currentQuoteOfADay = $this->getQuoteOfTheDay();

    $randomQuote = MotivationalQuote::where('quote_of_the_day',false)->inRandomOrder()->first();

    $currentQuoteOfADay->update(['quote_of_the_day' => false]);

    $randomQuote->update(['quote_of_the_day' => true]);

    return $randomQuote;

  }

}
