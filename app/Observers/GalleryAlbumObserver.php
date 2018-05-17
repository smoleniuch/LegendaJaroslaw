<?php

namespace App\Observers;

use App\GalleryAlbum;

class GalleryAlbumObserver
{
    /**
     * Listen to the GalleryAlbum created event.
     *
     * @param  \App\GalleryAlbum  $galleryAlbum
     * @return void
     */
    public function created(GalleryAlbum $galleryAlbum)
    {
    }

    /**
     * Listen to the GalleryAlbum deleting event.
     *
     * @param  \App\GalleryAlbum  $galleryAlbum
     * @return void
     */
    public function deleting(GalleryAlbum $galleryAlbum)
    {
        $galleryAlbum->photos->each(function ($photo) {
            $photo->delete();
        });

        $galleryAlbum->galleryAlbums->each(function ($album) {
            $album->delete();
        });
    }
}
