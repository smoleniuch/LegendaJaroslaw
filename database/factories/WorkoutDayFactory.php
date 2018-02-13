<?php

use Faker\Generator as Faker;

$factory->define(App\WorkoutDay::class, function (Faker $faker) {
    return [
        'day_of_week' => strtolower($faker->dayOfWeek())
    ];
});
