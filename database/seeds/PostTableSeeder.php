<?php

use Illuminate\Database\Seeder;
use App\Post;

class PostTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
      $faker = Faker\Factory::create();


        for($i = 0; $i <= 20; $i++){

          $post = new Post();

          $post->fill([

            'content' => $faker->realText(800, 2),
            'title' => $faker->realText(50, 2)

          ]);

          $post->save();
        }
    }
}
