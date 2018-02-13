<?php

use Illuminate\Database\Seeder;
use App\WorkoutCycle;
use Carbon\Carbon;

class WorkoutCycleTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $cycle = new WorkoutCycle();
        $currentDate = Carbon::today();

        $cycle->workout_cycle_template_id = 1;
        $cycle->valid_from = $currentDate;
        $cycle->valid_to = $currentDate->copy()->addWeeks(4);

        $cycle->save();
    }
}
