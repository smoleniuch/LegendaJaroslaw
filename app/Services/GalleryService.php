<?php

namespace App\Services;

use App\GalleryAlbum;
use App\Photo;

class GalleryService {

  public function getMainGallery(){

    $gallery = [

      'albums' => GalleryAlbum::all()->keyBy('id'),
      'photos' => Photo::all()->keyBy('id'),

    ];

    return $gallery;

  }

}
