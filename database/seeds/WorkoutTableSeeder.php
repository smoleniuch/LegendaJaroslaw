<?php

use Illuminate\Database\Seeder;
use App\Workout;
use App\Services\Workout\WorkoutGeneratorService;
use Carbon\Carbon;

class WorkoutTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $generator = new WorkoutGeneratorService();

        $now = Carbon::now();

        $data = [
            'dateSpan' => [
                'from' => $now->toDateString(),
                'to' => $now->copy()->addMonths(3)->toDateString(),
            ],
            'timeSpan' => [
                'from' => '19:00',
                'to' => '21:00',
            ],
            'dayOfWeeks' => [1, 3, 5],
            'name' => 'Trening'
        ];

      $generator->generateWorkouts($data);
    }
}
