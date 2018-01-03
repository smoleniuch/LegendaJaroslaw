<?php

namespace App\Services;

use App\CalendarEvent;
use App\CyclicCalendarEvent;
use Carbon\Carbon;
use Exception;

class CalendarService {

  public function getAllEvents(){

    return CalendarEvent::all()->get();

  }

  public static function generateEventsFromCyclicTemplate(CyclicCalendarEvent $cyclicCalendarEvent){

    $cyclicCalendarEvent = collect($cyclicCalendarEvent->toArray());

    $validFrom = Carbon::parse($cyclicCalendarEvent->get('is_valid_from'));
    $validTo = Carbon::parse($cyclicCalendarEvent->get('is_valid_to'));
    $cycle = $cyclicCalendarEvent->get('cycle');
    $eventStarts = Carbon::parse($cyclicCalendarEvent->get('start'));
    $eventEnds = Carbon::parse($cyclicCalendarEvent->get('end'));


    $currentStartingDate = $eventStarts->copy();
    $currentEndingDate = $eventEnds->copy();

    while($currentStartingDate->between($validFrom, $validTo)){

      $calendarEventData = $cyclicCalendarEvent->only(['title','description'])
                                               ->merge(['start' => $currentStartingDate, 'end' => $currentEndingDate]);

      CalendarEvent::create($calendarEventData->toArray());


      $currentStartingDate = self::getNextDateBasedOnCycle($currentStartingDate, $cycle);
      $currentEndingDate = self::getNextDateBasedOnCycle($currentEndingDate, $cycle);

    }

  }

  public static function getNextDateBasedOnCycle(Carbon $date, string $cycle){

    $supportedCycles = collect(['weekly']);



    if($cycle === 'weekly'){

      return $date->copy()->addWeek();

    }

    else {

      {throw new Exception($cycle . ' is not supported cycle type, it must be one of type ' . $supportedCycles->toJson(), 500);}

    }

  }



}
