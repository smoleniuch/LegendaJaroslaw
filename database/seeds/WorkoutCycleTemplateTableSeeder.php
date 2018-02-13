<?php

use Illuminate\Database\Seeder;
use App\WorkoutCycleTemplate;

class WorkoutCycleTemplateTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $template = new WorkoutCycleTemplate();

        $template->name = 'Podstawowy Cykl Treningowy';
        $template->description = 'Opis';

        $template->save();

    }
}
