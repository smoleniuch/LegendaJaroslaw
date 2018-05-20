<?php
namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Photo;
use App\GalleryAlbum;
use App\Services\GalleryService;

class GalleryController extends Controller
{
    public function __construct()
    {
        $this->middleware('role:coach');
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroyPhotos(Request $request)
    {
        collect($request->input('photoIds'))->each(function ($id) {
            Photo::findOrFail($id)->delete();
        });
        return response(200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function storePhotos(Request $request, GalleryService $galleryService)
    {
        $photos = json_decode($request->input('photos'));
        $photoFiles = $request->file();
        $albumId = $request->input('albumId');
        return response()->json($galleryService->addPhotos($photos, $photoFiles, $albumId));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function storeAlbum(Request $request)
    {
        $album = new GalleryAlbum($request->only(['parent_id', 'name']));
        $parentAlbum = GalleryAlbum::findOrFail($request->input('parent_id'));
        $album->parentAlbum()->associate($parentAlbum);
        $album->save();
        
        $parentAlbum->galleryAlbums()->attach($album);
        

        return $album;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\GalleryAlbum  $galleryAlbum
     * @return \Illuminate\Http\Response
     */
    public function destroyAlbum(Request $request)
    {
        collect($request->input('albumIds'))->each(function ($id) {
            GalleryAlbum::findOrFail($id)->delete();
        });
        return response(200);
    }

    public function moveElements(Request $request, GalleryService $galleryService)
    {
        $updatedElements = $galleryService->moveElements($request->only(['photoIds', 'albumIds', 'destinationAlbumId']));

        return response()->json($updatedElements);
    }

    public function deleteElements(Request $request, GalleryService $galleryService)
    {
        $responseData = $galleryService->deleteElements($request->only(['photoIds', 'albumIds']));

        return response()->json($responseData);
    }
}
