<?php

use Illuminate\Database\Seeder;

class MotivationalQuoteAuthorsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('motivational_quote_authors')->insert([
            ['name' => 'Mike Tyson'],
            ['name' => 'Lou Holtz'],
            ['name' => 'Muhammad Ali'],
            ['name' => 'Platon'],
            ['name' => 'Marszałek Józef Piłsudski'],
            ['name' => 'Robert Collier'],
        ]);
    }
}
