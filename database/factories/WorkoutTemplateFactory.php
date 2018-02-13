<?php

use Faker\Generator as Faker;

$factory->define(App\WorkoutTemplate::class, function (Faker $faker) {
    return [
        'name' => 'Podstawowy Trening',
        'starts_at' => $faker->time('19:00:00'),
        'ends_at' => $faker->time('21:00:00'),
    ];
});
