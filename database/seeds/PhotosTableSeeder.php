<?php

use Illuminate\Database\Seeder;
use Symfony\Component\Finder\Finder;
use Faker\Factory as Faker;
use App\Photo;
use App\Services\GalleryService;

class PhotosTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run(GalleryService $galleryService)
    {
        $faker = Faker::create();
        $finder = new Finder();
        $finder->files()->in(storage_path('app/public/gallery/pictures'));

 

        foreach ($finder as $file) {

            $fileStoragePath = storage_path('app/public/gallery/pictures/' . $file->getRelativePathname());
            $imageSize = getimagesize($fileStoragePath);
            
            $widthToHeightRatio = $imageSize[0] / $imageSize[1];
            $thumbnailPaths = $galleryService->makeThumbnail($fileStoragePath, ['widthToHeightRatio' => $widthToHeightRatio]);

            $photo = Photo::create([

            'name' => $faker->realText(20),
            'description' => $faker->realText(40),
            'original' => '/storage/gallery/pictures/' . $file->getRelativePathname(),
            'thumbnail' => $thumbnailPaths['publicPath'],
            'storage_path' => 'public/gallery/pictures/' . $file->getRelativePathname(),
            'thumbnail_storage_path' => $thumbnailPaths['storagePath'],
            'width_to_height_ratio' => $widthToHeightRatio


          ]);

            $photo->galleryAlbum()->associate(rand(1, 5));

            $photo->save();
        }
    }
}
