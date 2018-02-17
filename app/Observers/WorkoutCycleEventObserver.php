<?php

namespace App\Observers;

use App\WorkoutCycle;
use App\Services\CalendarService;
use App\Services\Workout\WorkoutGeneratorService;

class WorkoutCycleEventObserver
{
    public function __construct(){

      $this->workoutService = new WorkoutGeneratorService();

    }
    /**
     * Listen to the WorkoutCycle created event.
     *
     * @param  \App\WorkoutCycle  $workoutCycle
     * @return void
     */
    public function created(WorkoutCycle $event)
    {

        $this->workoutService->generateWorkoutsFromWorkoutCycle($event);

    }

    /**
     * Listen to the User deleting event.
     *
     * @param  \App\User  $user
     * @return void
     */
    public function deleting(CylicCalendarEvent $user)
    {
        //
    }
}
