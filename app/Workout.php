<?php

namespace App;

use Spatie\Activitylog\Traits\CausesActivity;
use Illuminate\Database\Eloquent\Model;

use App\WorkoutTemplate;
use App\WorkoutCycle;
use App\Post;

class Workout extends Model
{
    use CausesActivity;

    public $fillable = ['name', 'description', 'start', 'end', 'canceled'];

    public function workoutTemplate(){

      return $this->belongsTo(WorkoutTemplate::class);

    }

    public function workoutCycle(){

      return $this->belongsTo(WorkoutCycle::class);

    }

    public function posts(){

      return $this->belongsToMany(Post::class);

    }

    public function getCanceledAttribute($val){
      return (bool) $val;
    }
}
