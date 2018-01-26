<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\GalleryAlbum;

class Photo extends Model
{

  protected $fillable = ['name','description'];

  public function galleryAlbums(){

    return $this->belongsToMany(GalleryAlbum::class);

  }
}
