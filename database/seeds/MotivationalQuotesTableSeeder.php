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
        $quote = new MotivationalQuote();
        $quote->text = 'Nikt nigdy nie utonął we własnym pocie';
        $quote->author = 'Lou Holtz';

        $quote->save();

        $quote = new MotivationalQuote();
        $quote->text = 'Nienawidziłem każdej minuty treningu, ale powtarzałem sobie ‚Nie poddawaj się. Przecierp teraz i żyj resztę życia jako mistrz.';
        $quote->author = 'Muhammad Ali';
        $quote->quote_of_the_day = true;

        $quote->save();

        $quote = new MotivationalQuote();
        $quote->text = 'Najważniejszym i największym triumfem człowieka jest zwycięstwo nad samym sobą';
        $quote->author = 'Platon';

        $quote->save();

        $quote = new MotivationalQuote();
        $quote->text = 'Być zwyciężonym i nie ulec to zwycięstwo, zwyciężyć i osiąść na laurach to klęska';
        $quote->author = 'Marszałek Józef Piłsudski';

        $quote->save();

        $quote = new MotivationalQuote();
        $quote->text = 'Sukces to suma niewielkiego wysiłku powtarzanego z dnia na dzień.';
        $quote->author = 'Robert Collier';

        $quote->save();
    }
}
