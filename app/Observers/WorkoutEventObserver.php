<?php

namespace App\Observers;

use App\Workout;
use App\Services\CalendarService;

class WorkoutEventObserver
{
    /**
     * Listen to the User created event.
     *
     * @param  \App\User  $user
     * @return void
     */
    public function created(Workout $event)
    {

        // CalendarService::generateEventFromWorkout($event);

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
