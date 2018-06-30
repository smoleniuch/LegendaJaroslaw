<?php
namespace App\Services\Workout;

use App\Workout;
use App\Post;
use Spatie\Activitylog\Models\Activity;
use \Carbon\Carbon;

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

  public function edit(Workout $workout, $data){

    $workout->fill($data);
    $workout->save();

    return $workout;
  }

  public function delete($workoutIds){

    $workoutIds = collect($workoutIds);
    $deleted = collect();
    $notDeleted = collect();
    $data = collect();
    $workoutIds->each(function($workoutId) use ($deleted, $notDeleted){

      if(Workout::destroy($workoutId)){
        $deleted->push($workoutId);
      } else {
        $notDeleted->push($workoutId);
      }
    });

    if($deleted->isNotEmpty()){
      $data->put('success',$deleted);
    } 

    if($notDeleted->isNotEmpty()){
      $data->put('error',$notDeleted);      
    }

    return $data;
  }

  public function bulkEdit($data){

    $workoutIds = collect(data_get($data, 'ids'));
    $edited = collect();
    $notEdited = collect();
    $valuesToUpdate = collect(data_get($data, 'values'));
    $returnData = collect();


    $workoutIds->each(function($workoutId) use ($edited, $notEdited, $valuesToUpdate, $returnData){

      $workout = Workout::find($workoutId);
      $updateData = collect();
      if(!$workout){
        $notEdited->push($workoutId);
        return false;     
      }
      
      $timeSpan = data_get($valuesToUpdate,'timeSpan');
      
      if($timeSpan && $timeSpan['from'] && $timeSpan['to'] ){
       
       $prevStartDate = Carbon::parse($workout->start);
       $prevEndDate = Carbon::parse($workout->end);

       $startTime = $timeSpan['from'];
       $endTime = $timeSpan['to'];
       
        $updateData->put('start', $prevStartDate->setTimeFromTimeString($startTime)->toDateTimeString());
        $updateData->put('end', $prevStartDate->setTimeFromTimeString($endTime)->toDateTimeString());
      }

      if($valuesToUpdate->get('name')){
        $updateData->put('name', $valuesToUpdate->get('name'));        
      }

      if(in_array($valuesToUpdate->get('canceled'),[false, true],true)){
        $updateData->put('canceled', $valuesToUpdate->get('canceled'));
      }

      $workout->update($updateData->toArray());
      $workout->save();

      $edited->push($workout);

    });

    if($edited->isNotEmpty()){
      $returnData->put('success',$edited->keyBy('id'));
    } 

    if($notEdited->isNotEmpty()){
      $returnData->put('error',$notEdited);      
    }

    return $returnData;

  }

}
