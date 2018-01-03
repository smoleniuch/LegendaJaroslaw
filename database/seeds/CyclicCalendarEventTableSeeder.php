<?php

use Illuminate\Database\Seeder;
use Carbon\Carbon;
use App\CyclicCalendarEvent;

class CyclicCalendarEventTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

      $now = new Carbon();
      $afterYear = Carbon::parse()->addYear();

      $mondayTraining = Carbon::parse('this monday')->addHours(19);
      $wednesdayTraining =Carbon::parse('this wednesday')->addHours(19);
      $fridayTraining = Carbon::parse('this friday')->addHours(19);


      CyclicCalendarEvent::create([

        'title' => 'Trening' ,
        'description' => 'Opis' ,
        'start' =>  $mondayTraining,
        'end' =>  $mondayTraining->copy()->addHours(2),
        'is_valid_from' => $now ,
        'is_valid_to' => $afterYear ,
        'cycle' =>  'weekly'

      ]);


      CyclicCalendarEvent::create([

        'title' => 'Trening' ,
        'description' => 'Opis' ,
        'start' =>  $wednesdayTraining,
        'end' =>  $wednesdayTraining->copy()->addHours(2),
        'is_valid_from' => $now ,
        'is_valid_to' => $afterYear ,
        'cycle' =>  'weekly'

      ]);

      CyclicCalendarEvent::create([

        'title' => 'Trening' ,
        'description' => 'Opis' ,
        'start' =>  $fridayTraining,
        'end' =>  $fridayTraining->copy()->addHours(2),
        'is_valid_from' => $now ,
        'is_valid_to' => $afterYear ,
        'cycle' =>  'weekly'

      ]);

    }
}
