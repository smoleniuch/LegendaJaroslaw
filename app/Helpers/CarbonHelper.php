<?php

namespace App\Helpers;
use Carbon\Carbon;

class CarbonHelper {

  public static function getConstant($constant){

    return collect([
      'monday' => Carbon::MONDAY,
      'tuesday' => Carbon::TUESDAY,
      'wednesday' => Carbon::WEDNESDAY,
      'thursday' => Carbon::THURSDAY,
      'friday' => Carbon::FRIDAY,
      'saturday' => Carbon::SATURDAY,
      'sunday' => Carbon::SUNDAY
    ])->get($constant);

  }

}
