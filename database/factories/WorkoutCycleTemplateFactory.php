<?php

use Faker\Generator as Faker;

$factory->define(App\WorkoutCycleTemplate::class, function (Faker $faker) {
    return [
      'name' => 'TestWorkoutCycleTemplate',
      'description' => 'TestWorkoutCycleTemplate',
    ];
});
