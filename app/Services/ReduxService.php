<?php

namespace App\Services;

use App\Services\UserService;
use App\Services\PostService;
use App\Services\MotivationalQuoteService;


class ReduxService {

  public function __construct(){

    $this->userService = new UserService();
    $this->postService = new PostService();
    $this->motivationalQuoteService = new MotivationalQuoteService();

  }

  public function getPreloadedState(){

    $preloadedState = json_encode([

      'user' => $this->userService->getCurrentUserData(),
      'post' => [

        'posts' => $this->postService->getAllPosts()

      ],
      'motivationalQuote' => [

        'quoteOfTheDay' => $this->motivationalQuoteService->getQuoteOfTheDay()

      ]
      
    ]);




    return $preloadedState;
  }


}
