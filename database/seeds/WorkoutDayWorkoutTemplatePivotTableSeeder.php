<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class WorkoutDayWorkoutTemplatePivotTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('workout_day_workout_template')->insert([

          ['workout_template_id' => 1,'workout_day_id' => 1],
          ['workout_template_id' => 1,'workout_day_id' => 2],
          ['workout_template_id' => 1,'workout_day_id' => 3],

        ]);
    }
}
