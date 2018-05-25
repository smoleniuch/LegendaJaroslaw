<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\GalleryAlbum;

class Photo extends Model
{
    protected $fillable = ['name','description'];
    // protected $hidden = ['gallery_album'];


    public function galleryAlbum()
    {
        return $this->belongsTo(GalleryAlbum::class);
    }

    public function getGalleryAlbumIdAttribute($v)
    {
        return $v;
    }
}
