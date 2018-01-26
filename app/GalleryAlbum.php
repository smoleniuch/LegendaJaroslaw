<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Photo;

class GalleryAlbum extends Model
{
    protected $fillable = ['name','description','description_picture_url'];
    protected $appends = array('photo_ids','album_ids','ancestors_album_ids');

    public function photos(){

      return $this->belongsToMany(Photo::class);

    }

    public function galleryAlbums(){

      return $this->belongsToMany($this, 'gallery_album_gallery_album','parent_gallery_album_id','child_gallery_album_id');

    }

    public function getParentAlbum(){

      return $this->belongsToMany($this, 'gallery_album_gallery_album','child_gallery_album_id', 'parent_gallery_album_id');

    }

    // public function getParentAlbumIdAttribute(){
    //
    //   return $this->getParentAlbum()->get()->pluck('id')->first();
    //
    // }

    public function getAncestorsAlbumIdsAttribute(){

      $ancestorsIds = collect();

      $currentAlbum = $this;
      $currentParentId = $currentAlbum->getParentAlbum()->get()->pluck('id')->first();
      while ($currentParentId !== null){

        $ancestorsIds->prepend($currentParentId);

        $currentAlbum = GalleryAlbum::find($currentParentId)->first();
        $currentParentId = $currentAlbum->getParentAlbum()->get()->pluck('id')->first();

      }

      return $ancestorsIds;

    }

    public function getAlbumIdsAttribute($v){

      return $this->galleryAlbums()->get()->pluck('id');

    }

    public function getPhotoIdsAttribute($v){

      return $this->photos()->get()->pluck('id');

    }

}
