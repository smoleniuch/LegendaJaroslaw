<?php

use Illuminate\Database\Seeder;

use App\WorkoutWeek;

class WorkoutWeeksTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $week = new WorkoutWeek();

        $week->workout_cycle_template_id = 1;
        $week->index = 1;

        $week->save();
    }
}
