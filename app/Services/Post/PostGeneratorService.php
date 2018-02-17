<?php
namespace App\Services\Post;

use App\Post;
use App\Workout;

class PostCreatorService {

  private const CANCEL_WORKOUT_TYPE = 'cancel_workout';

  public function cancelWorkoutPost(Workout $workout, array $data){

    return $this->createPost($data, self::CANCEL_WORKOUT_TYPE);

  }

  public function createPost(array $data, string $type){

    $post = new Post();
    $post->type = $type;
    $post->fill($data);
    $post->save();

    return $post;

  }

}
