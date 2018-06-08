<?php
namespace App\Services\Workout;

use App\Workout;
use Carbon;

class WorkoutFetchingService
{
    public function getNextWorkout()
    {
        return Workout::whereDate('start', '>=', date('Y-m-d'))->get()->sortBy('start')->first();
    }
}
