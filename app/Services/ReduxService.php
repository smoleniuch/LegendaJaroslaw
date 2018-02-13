<?php

namespace App\Services;

use App\Services\UserService;
use App\Services\PostService;
use App\Services\MotivationalQuoteService;
use App\Services\GalleryService;
use App\Services\WorkoutService;
use App\Workout;
use App\WorkoutTemplate;
use Underscore\Types\Arrays;
use Underscore\Types\Parse;

class ReduxService {

  public function __construct(){

    $this->userService = new UserService();
    $this->postService = new PostService();
    $this->motivationalQuoteService = new MotivationalQuoteService();
    $this->galleryService = new GalleryService();
    $this->workoutService = new WorkoutService();

  }

  public function getPreloadedState(){

    $preloadedState = json_encode([

      'user' => $this->userService->getCurrentUserData(),
      'post' => [

        'posts' => $this->postService->getAllPosts()

      ],
      'motivationalQuote' => [

        'quoteOfTheDay' => $this->motivationalQuoteService->getQuoteOfTheDay()

      ],
      'gallery' => $this->galleryService->getMainGallery(),
      'workout' => $this->getWorkoutBranch()
    ]);

    return $preloadedState;
  }

  public function getWorkoutBranch(){

    return [

      'workouts' => Workout::all()->keyBy('id'),
      'workoutTemplates' => WorkoutTemplate::all()->keyBy('id'),

    ];

  }


}
