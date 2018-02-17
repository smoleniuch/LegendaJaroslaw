<?php
use App\Workout;
use Faker\Generator as Faker;
use Carbon\Carbon;

$factory->define(Workout::class, function (Faker $faker) {

    $start = Carbon::now()->setTime(19,00,00);
    $end = $start->copy()->addHours(2);

    return [
      'workout_template_id' => 1,
      'start' => $start,
      'end' => $end
    ];
});
