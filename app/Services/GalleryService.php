<?php

namespace App\Services;

use App\GalleryAlbum;
use App\Photo;
use Illuminate\Http\File;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\ImageManager;

class GalleryService
{

    public function __construct(ImageManager $imageManager){
        $this->imageManager = $imageManager;

    }

    public function getMainGallery()
    {
        $gallery = [
      'mainAlbumId' => 1,
      'albums' => GalleryAlbum::all()->keyBy('id'),
      'photos' => Photo::all()->keyBy('id'),
      'selectedPhotoIds' => new \stdClass(),
      'selectedAlbumIds' => new \stdClass(),
      

    ];

        return $gallery;
    }

    /**
     * Save photo files inside file system.
     * Saves file data in the database
     *
     * @param array $photosData
     * It must include photosData and albumId
     * @return void
     */
    public function addPhotos($photos, $photoFiles, $albumId)
    {
        $photosData = collect($photos);

        $galleryAlbum = GalleryAlbum::findOrFail($albumId);

        return $photosData->map(function ($photoData) use ($galleryAlbum, $photoFiles) {
            $photoData = collect($photoData);
            $photoFile = $photoFiles[$photoData->get('imageFileId')];

            $photoPublicFilePath = Storage::url($photoFile->store('public/gallery/pictures'));
            preg_match('/[^\/]+$/', $photoPublicFilePath, $match);
            $fileName = $match[0];
            
            $storageFilePath = storage_path('app/public/gallery/pictures/' . $fileName);
            $imageSize = getimagesize($storageFilePath);

            $widthToHeightRatio = $imageSize[0] / $imageSize[1];

            $thumbnailPaths = $this->makeThumbnail($storageFilePath, ["widthToHeightRatio" => $widthToHeightRatio]);

            
            $photo = new Photo($photoData->only(['name','description'])->toArray());
            $photo->original =  $photoPublicFilePath;
            $photo->thumbnail =  $thumbnailPaths['publicPath'];
            $photo->width_to_height_ratio = $widthToHeightRatio;
            $photo->storage_path =  $storageFilePath;
            $photo->thumbnail_storage_path =  $thumbnailPaths['storagePath'];
            
            $photo->galleryAlbum()->associate($galleryAlbum);
            $photo->save();

            return $photo;
        })->keyBy('id');
    }

    public function deleteElements($data)
    {
        $deletedPhotoIds = collect([]);
        $deletedAlbumIds = collect([]);
        $updatedAlbums = collect([]);

        collect($data['photoIds'])->each(function ($id) use ($updatedAlbums, $deletedPhotoIds) {
            $photo = Photo::findOrFail($id);

            $currentParentAlbum = $photo->galleryAlbum;

            $photo->delete();

            $updatedAlbums->put($currentParentAlbum->id, $currentParentAlbum);
            $deletedPhotoIds->push($id);
        });

        collect($data['albumIds'])->each(function ($id) use ($updatedAlbums, $deletedAlbumIds) {
            $album = GalleryAlbum::findOrFail($id);

            $currentParentAlbum =  $album->parentAlbum;

            $album->delete();

            $updatedAlbums->put($currentParentAlbum->id, $currentParentAlbum);
            $deletedAlbumIds->push($id);
        });


        return [

            'deleted' => [
                'albumIds' => $deletedAlbumIds,
                'photoIds' => $deletedPhotoIds,
            ],
            'updated' => [
                'albums' => $updatedAlbums
            ]

        ];
    }

    public function moveElements($data)
    {
        $destinationAlbum = GalleryAlbum::findOrFail($data['destinationAlbumId']);
        $updatedPhotos = collect([]);
        $updatedAlbums = collect([]);

        collect($data['photoIds'])->each(function ($id) use ($updatedPhotos, $updatedAlbums, $destinationAlbum) {
            $photo = Photo::findOrFail($id);

            $currentParentAlbum = $photo->galleryAlbum;

            $photo->galleryAlbum()->associate($destinationAlbum);
            $photo->save();

            $updatedAlbums->put($currentParentAlbum->id, $currentParentAlbum);
            $updatedPhotos->put($photo->id, $photo);
        });

        collect($data['albumIds'])->each(function ($id) use ($updatedAlbums, $destinationAlbum) {
            $album = GalleryAlbum::findOrFail($id);

            $currentParentAlbum = $album->parentAlbum;

            $album->parentAlbum()->associate($destinationAlbum);
            $album->save();
            $destinationAlbum->galleryAlbums()->attach($album);
            $currentParentAlbum->galleryAlbums()->detach($album);
            $updatedAlbums->put($album->id, $album);
            $updatedAlbums->put($currentParentAlbum->id, $currentParentAlbum);
        });

        $destinationAlbum->save();
        $updatedAlbums->put($destinationAlbum->id, $destinationAlbum);

        return [

            'updated' => [
                'albums' => $updatedAlbums,
                'photos' => $updatedPhotos,
            ]

        ];
    }

    public function makeThumbnail($filePath, array $config = []){

        $baseConfig = [
            "widthToHeightRatio" => 1,
            "width" => 200,
            "fileOutputFolder" => storage_path('app/public/gallery/pictures/'),
            "publicFolderPath" => Storage::url('gallery/pictures/')
        ];

        $config = array_merge($baseConfig, $config);
        
        $fileName = explode('/', $filePath);
        $fileName = array_pop($fileName);

        $thumbnailFileName = 'thumbnail-' . $fileName;
        $fileOutputPath = $config['fileOutputFolder'] . $thumbnailFileName;

        $thumbnail = $this->imageManager->make($filePath)
                          ->resize($config['width'], $config['width'] / $config['widthToHeightRatio'])
                          ->save($fileOutputPath);

        return [
            "publicPath" => $config["publicFolderPath"] . $thumbnailFileName,
            "storagePath" => $fileOutputPath,
        ];
    }

}
