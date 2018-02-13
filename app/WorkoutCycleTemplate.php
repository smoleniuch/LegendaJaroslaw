<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\WorkoutWeek;
class WorkoutCycleTemplate extends Model
{

    public $fillable = ['name', 'description'];

    public function workoutWeeks(){

      return $this->hasMany(WorkoutWeek::class);

    }

}
