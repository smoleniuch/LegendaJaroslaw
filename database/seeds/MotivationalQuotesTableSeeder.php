<?php

use Illuminate\Database\Seeder;
use App\MotivationalQuote;

class MotivationalQuotesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('motivational_quotes')->insert([
            ['text' => 'Każdy ma jakieś plany... dopóki mu ktoś nie przyłoży', 'author_id' => 1, 'quote_of_the_day' => true],
        ]);

        DB::table('motivational_quotes')->insert([
            ['text' => 'Nikt nigdy nie utonął we własnym pocie', 'author_id' => 2],
            ['text' => 'Nienawidziłem każdej minuty treningu, ale powtarzałem sobie ‚Nie poddawaj się. Przecierp teraz i żyj resztę życia jako mistrz.', 'author_id' => 3],
            ['text' => 'Najważniejszym i największym triumfem człowieka jest zwycięstwo nad samym sobą', 'author_id' => 4],
            ['text' => 'Być zwyciężonym i nie ulec to zwycięstwo, zwyciężyć i osiąść na laurach to klęska', 'author_id' => 5],
            ['text' => 'Sukces to suma niewielkiego wysiłku powtarzanego z dnia na dzień.', 'author_id' => 6],
        ]);
    }
}
