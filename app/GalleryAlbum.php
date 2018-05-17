<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Photo;

class GalleryAlbum extends Model
{
    protected $fillable = ['name','parent_id', 'description','description_picture_url'];
    protected $appends = array('photo_ids','album_ids', 'ancestors_album_ids');

    public function photos()
    {
        return $this->hasMany(Photo::class);
    }
    
    public function parentAlbum()
    {
        return $this->belongsTo($this, 'parent_id', 'id');
    }

    public function galleryAlbums()
    {
        return $this->belongsToMany($this, 'gallery_album_gallery_album', 'parent_gallery_album_id', 'child_gallery_album_id');
    }

    public function getAlbumIdsAttribute($v)
    {
        return $this->galleryAlbums()->get()->pluck('id');
    }

    public function getPhotoIdsAttribute($v)
    {
        return $this->photos()->get()->pluck('id');
    }

    public function getAncestorsAlbumIdsAttribute()
    {
        $ancestorsIds = collect();
        $currentAlbum = $this;
        $currentParent = $currentAlbum->parentAlbum;
        while ($currentParent) {
            $ancestorsIds->prepend($currentParent->id);
            $currentAlbum = $currentParent;
            $currentParent = $currentAlbum->parentAlbum;
        }
        return $ancestorsIds;
    }
}
