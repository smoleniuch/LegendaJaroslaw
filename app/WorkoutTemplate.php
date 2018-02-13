<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Workout;

class WorkoutTemplate extends Model
{
    public function workouts(){

      return $this->hasMany(Workout::class);

    }
}
