<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\WorkoutTemplate;
use App\WorkoutCycle;

class Workout extends Model
{

    public $fillable = ['begin_date','end_date'];

    public function workoutTemplate(){

      return $this->belongsTo(WorkoutTemplate::class);

    }

    public function workoutCycle(){

      return $this->belongsTo(WorkoutCycle::class);

    }
}
