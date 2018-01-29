<?php

use Illuminate\Database\Seeder;
use Faker\Factory as Faker;
use App\Photo;

class PhotosTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Faker::create();

        for($i = 0;$i < 100;$i++){

          $photo = Photo::create([

            'name' => $faker->realText(20),
            'description' => $faker->realText(40),
            'original' => $faker->imageUrl($width = 1024, $height = 768),
            'thumbnail' => $faker->imageUrl($width = 250, $height = 150),


          ]);

          $photo->galleryAlbums()->attach(rand(1,5));
        }
    }
}
