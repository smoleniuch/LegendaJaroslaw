<?php

namespace App\Services;

use App\GalleryAlbum;
use App\Photo;
use Illuminate\Http\File;
use Illuminate\Support\Facades\Storage;

class GalleryService
{
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
            // dd($photoFile);
            $photoFilePath = $photoFile->store('public/gallery/pictures');
            preg_match('/[^\/]+$/', $photoFilePath, $match);
            $fileName = $match[0];
            
            $imageSize = getimagesize(storage_path('app/public/gallery/pictures/' . $fileName));

            $widthToHeightRatio = $imageSize[0] / $imageSize[1];
            $photoFileURL = Storage::url($photoFilePath);
            $photo = new Photo($photoData->only(['name','description'])->toArray());
            $photo->original =  $photoFileURL;
            $photo->thumbnail =  $photoFileURL;
            $photo->width_to_height_ratio = $widthToHeightRatio;
            $photo->storage_path =  $photoFilePath;
            
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
}
