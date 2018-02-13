<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\WorkoutTmplate;

class WorkoutDay extends Model
{
    public function workoutTemplates(){

      return $this->belongsToMany(WorkoutTemplate::class);

    }
}
