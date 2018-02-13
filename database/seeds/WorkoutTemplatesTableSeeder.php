<?php

use Illuminate\Database\Seeder;

use App\WorkoutTemplate;

class WorkoutTemplatesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run(){

      $basic = new WorkoutTemplate();

      $basic->name = 'Podstawowy Trening';
      $basic->starts_at = '19:00';
      $basic->ends_at = '21:00';

      $basic->save();
    }
}
