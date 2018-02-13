<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\WorkoutDay;

class WorkoutWeek extends Model
{
    public function workoutDays(){

      return $this->hasMany(WorkoutDay::class);

    }
}
