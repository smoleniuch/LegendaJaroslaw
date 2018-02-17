<?php
namespace App\Services\Workout;

use App\Workout;
use App\Post;
use Spatie\Activitylog\Models\Activity;
class WorkoutEditorService {

  /**
   * Cancecl specific workout
   * You can specify if cancelation will create post based on $data
   * @param  Workout $workout
   * @param  array   $data    [description]
   * @return Workout $workout
   */
  public function cancelWorkout(Workout $workout,array $data = []){

    $workout->canceled = true;
    $workout->save();


    if(array_has($data, 'post')){

      $post = new Post();
      $post->title = array_get($data, 'post.title');
      $post->content = array_get($data, 'post.content');
      $post->save();

      activity()->on($post)->by($workout)->log('workout cancel post');
      $workout->posts()->attach($post);

    }

    return $workout;
  }

  /**
   * Revert changes made by cancelWorkout method
   * @param  Workout $workout
   * @return Workout $workout
   */
  public function undoCancel(Workout $workout){

    $workoutCancelPostActivity = $workout->activity->where('description','workout cancel post')->first();

    if($workoutCancelPostActivity){

      $cancelPost = $workoutCancelPostActivity->subject;
      if( $cancelPost ){

        $cancelPost->delete();

      }

      $workoutCancelPostActivity->delete();
    }

    $workout->canceled = false;
    $workout->save();

    return $workout;

  }

}
