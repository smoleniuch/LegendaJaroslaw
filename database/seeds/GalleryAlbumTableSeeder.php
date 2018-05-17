<?php

use Illuminate\Database\Seeder;
use App\GalleryAlbum;
use Faker\Factory as Faker;

class GalleryAlbumTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Faker::create();

        $main = GalleryAlbum::create([

          'name' => 'Główny',
          'description' => '',
          'description_picture_url' => $faker->imageUrl($width = 640, $height = 480),

        ]);

        GalleryAlbum::create([

          'name' => 'Walki',
          'parent_id' => 1,
          'description' => 'Zdjęcia z walk',
          'description_picture_url' => $faker->imageUrl($width = 640, $height = 480),

        ]);

        GalleryAlbum::create([

          'name' => 'Zawody',
          'parent_id' => 1,
          'description' => 'Zdjęcia z zawodow',
          'description_picture_url' => $faker->imageUrl($width = 640, $height = 480),

        ]);

        GalleryAlbum::create([

          'name' => 'Treningi',
          'description' => 'Zdjęcia z treningow',
          'parent_id' => 1,
          'description_picture_url' => $faker->imageUrl($width = 640, $height = 480),

        ]);

        GalleryAlbum::create([

          'name' => 'Różne',
          'description' => 'Różne zdjęcia',
          'parent_id' => 1,
          'description_picture_url' => $faker->imageUrl($width = 640, $height = 480),

        ]);

        $main->galleryAlbums()->attach([2,3,4,5,6]);
    }
}
