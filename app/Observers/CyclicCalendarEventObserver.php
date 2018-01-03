<?php

namespace App\Observers;

use App\CyclicCalendarEvent;
use App\Services\CalendarService;

class CyclicCalendarEventObserver
{
    /**
     * Listen to the User created event.
     *
     * @param  \App\User  $user
     * @return void
     */
    public function created(CyclicCalendarEvent $event)
    {

        CalendarService::generateEventsFromCyclicTemplate($event);
        
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
