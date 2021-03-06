<?php

namespace App\Services;

use App\Services\UserService;
use App\Services\PostService;
use App\Services\MotivationalQuoteService;
use App\Services\GalleryService;
use App\Services\Workout\WorkoutFetchingService;
use App\Workout;
use App\WorkoutTemplate;
use App\ChatMessage;
use Underscore\Types\Arrays;
use Underscore\Types\Parse;

class ReduxService
{
    public function __construct(GalleryService $galleryService)
    {
        $this->userService = new UserService();
        $this->postService = new PostService();
        $this->motivationalQuoteService = new MotivationalQuoteService();
        $this->galleryService = $galleryService;
        $this->workoutFetchingService = new WorkoutFetchingService();
    }

    public function getPreloadedState()
    {
        $preloadedState = json_encode([
        'chat' => $this->getChatBranch(),
        'user' => $this->userService->getCurrentUserData(),
        'post' => [
          'lastPostChunk' => 0,
          'isFetching' => false,
          'posts' => $this->postService->getPostsByChunk(0)

        ],
        'motivationalQuote' => [

          'quoteOfTheDay' => $this->motivationalQuoteService->getQuoteOfTheDay(),
          'motivationalQuotes' => new \stdClass(),
          'quotesFetched' => false,
          'authorsFetched' => false,
          'authors' => new \stdClass(),

        ],
        'gallery' => $this->galleryService->getMainGallery(),
        'workout' => $this->getWorkoutBranch()
      ]);

        return $preloadedState;
    }

    public function getWorkoutBranch()
    {
        $nextWorkout = $this->workoutFetchingService->getNextWorkout();
        return [

      'workouts' => Workout::all()->keyBy('id'),
      'workoutTemplates' => WorkoutTemplate::all()->keyBy('id'),
      'nextWorkoutId' => $nextWorkout?$nextWorkout->id:null
    ];
    }

    public function getChatBranch()
    {
        $messages = ChatMessage::latest()->take(500)->get()->reverse()->values()->all();
        // dd($messages);
        return [
        'initialMessages' => $messages,
        'newMessagesCount' => 0,
      ];
    }
}
