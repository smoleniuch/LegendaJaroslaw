<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\WorkoutCycle;
use App\WorkoutCycleTemplate;
use App\WorkoutWeek;
use App\WorkoutDay;
use App\WorkoutTemplate;
use App\Services\Workout\WorkoutGeneratorService;
use Carbon\Carbon;

class WorkoutsGenerationFromWorkoutCycleTest extends TestCase
{
    use RefreshDatabase;
    /**
     * A basic test example.
     *
     * @return void
     */
    public function testWorkoutGenerationBasedOnWorkoutCycle()
    {
        $validFrom = new Carbon('this monday');
        $validTo = $validFrom->copy()->addWeeks(2);

        $this->assertAmountOfWorkouts($validFrom,$validTo, 6);

        $validFrom = new Carbon('this wednesday');
        $validTo = $validFrom->copy()->addWeeks(2);

        $this->assertAmountOfWorkouts($validFrom,$validTo, 6);

        $validFrom = new Carbon('this tuesday');
        $validTo = $validFrom->copy()->addWeeks(2);

        $this->assertAmountOfWorkouts($validFrom,$validTo, 6);

        $validFrom = new Carbon('this tuesday');
        $validTo = $validFrom->copy()->addWeeks(100);

        $this->assertAmountOfWorkouts($validFrom,$validTo, 300);

    }


    public function assertAmountOfWorkouts(Carbon $validFrom, Carbon $validTo, $workoutsAmount){

      $workoutCycle = $this->mockWorkoutCycle($validFrom, $validTo);

      $this->assertDatabaseHas('workout_cycles', ["id" => $workoutCycle->id]);

      $this->assertDatabaseHas('workouts', ["workout_cycle_id" => $workoutCycle->id]);

      $this->assertCount($workoutsAmount, $workoutCycle->workouts->toArray());

    }
    /**
     * This generates basic workout cycle
     * This workout cycle is based on template which has single week.
     * The week has three workout days, monday, wednesday, friday.
     * Each workout day is assocaited with basic workout template which duration is between 19:00 - 21:00
     * God, have mercy for my soul,forgive me for this spaghetti.
     * @param  Carbon $validFrom [description]
     * @param  Carbon $validTo   [description]
     * @return [type]            [description]
     */
    public function mockWorkoutCycle(Carbon $validFrom, Carbon $validTo){

      $workoutCycleTemplate = factory(WorkoutCycleTemplate::class)->create([
        'name' => 'NameWorkoutCycleTemplateTest',
        'description' => 'DescriptionWorkoutCycleTemplateTest'
      ]);

      $workoutWeek = factory(WorkoutWeek::class)->create([
        'index' => '1',
        'workout_cycle_template_id' =>   $workoutCycleTemplate->id

      ]);

      $workoutTemplate = factory(WorkoutTemplate::class)->create();

      $workoutDays = $this->createWorkoutDays($workoutWeek->id);

      $workoutDays->each(function($workoutDay) use($workoutTemplate){
        $workoutDay->workoutTemplates()->attach($workoutTemplate->id);
      });

      $workoutCycle = factory(WorkoutCycle::class)->create([
        'workout_cycle_template_id' => $workoutCycleTemplate->id,
        'valid_from' => $validFrom->toDateTimeString(),
        'valid_to' => $validTo->toDateTimeString()
      ]);

      return $workoutCycle;

    }

    public function createWorkoutDays(int $workoutWeekId){

      $daysOfWeek = collect(['monday','tuesday','wednesday']);

      return $daysOfWeek->map(function($dayOfWeek) use ($workoutWeekId){
        return factory(WorkoutDay::class)->create([
                  'day_of_week' => $dayOfWeek,
                  'workout_week_id' => $workoutWeekId
        ]);
      });

    }
}
