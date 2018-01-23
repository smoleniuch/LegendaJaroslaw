<?php

use Illuminate\Database\Seeder;
use App\Workout;

class WorkoutTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $workout = new Workout();

        $workout->name = 'Trening';
        $workout->description = 'Opis';

        $workout->save();
    }
}
