<?php

namespace App;

use App\WorkoutCycleTemplate;
use App\Workout;
use Illuminate\Database\Eloquent\Model;

class WorkoutCycle extends Model
{
    public function workoutCycleTemplate(){

      return $this->belongsTo(WorkoutCycleTemplate::class);

    }

    public function workouts(){

      return $this->hasMany(Workout::class);

    }
}
