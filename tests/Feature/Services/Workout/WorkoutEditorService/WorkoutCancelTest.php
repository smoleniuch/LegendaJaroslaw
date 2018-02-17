<?php

namespace Tests\Feature\Services\Workout\WorkoutEditorService;
use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

use App\Workout;
use App\Services\Workout\WorkoutEditorService;

class WorkoutCancelTest extends TestCase
{
    use RefreshDatabase;

    public function __construct() {
        parent::__construct();

        $this->workoutEditorService = new WorkoutEditorService();

    }
    /**
     * A basic test example.
     *
     * @return void
     */
    public function testCancelWorkoutWithPostWithUndo()
    {
        $workout = factory(Workout::class)->make();
        $workoutEditorService = new WorkoutEditorService();
        $data = [
          'post' => [
            'title' => 'PostCancelTitleTest',
            'content' => 'PostCancelContentTest'
          ]
        ];

        $workoutEditorService->cancelWorkout($workout, $data);
        $this->assertTrue($workout->canceled);

        $this->assertDatabaseHas('posts', $data['post']);

        $workoutEditorService->undoCancel($workout);
        $this->assertFalse($workout->canceled);

        $this->assertDatabaseMissing('posts', $data['post']);

    }

    public function testCancelWorkout(){

      $workout = factory(Workout::class)->make();
      $workoutEditorService = new WorkoutEditorService();

      $workoutEditorService->cancelWorkout($workout);

      $this->assertTrue($workout->canceled);
    }



}
