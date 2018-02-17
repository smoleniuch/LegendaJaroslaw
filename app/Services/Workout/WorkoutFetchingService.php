<?php
namespace App\Services\Workout;
use App\Workout;

class WorkoutFetchingService {

  public function getNextWorkout(){

    return Workout::all()->sortBy('start')->first();

  }

}
