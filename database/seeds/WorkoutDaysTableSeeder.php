<?php

use Illuminate\Database\Seeder;
use App\WorkoutDay;

class WorkoutDaysTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $monday = new WorkoutDay();

        $monday->day_of_week = 'monday';
        $monday->workout_week_id = 1;

        $monday->save();

        $wednesday = new WorkoutDay();

        $wednesday->day_of_week = 'wednesday';
        $wednesday->workout_week_id = 1;

        $wednesday->save();

        $friday = new WorkoutDay();

        $friday->day_of_week = 'friday';
        $friday->workout_week_id = 1;

        $friday->save();
    }
}
