import * as types from "Actions/galleryActions/types";
const initialState = {
  selectedAlbumIds:{},
  selectedPhotoIds:{},
  mainAlbumId:1,
  albums: {},
  photos: {}
};

export default function galleryReducer(state = initialState, action) {
  switch (action.type) {
    case types.DELETE_PHOTOS_REQUEST_SUCCESS:
      var photos = { ...state.photos };
      var deletedPhotoIds = action.meta.previousAction.payload.request.data
        .photoIds;

      for (var id of deletedPhotoIds) {
        delete photos[id];
      }

      return {
        ...state,
        photos
      };

    case types.UPLOAD_PHOTOS_REQUEST_SUCCESS:
      var newPhotos = action.payload.data;
      var albumId = action.meta.previousAction.payload.request.data.get(
        "albumId"
      );

      var albumToUpdate = { ...state.albums[albumId] };

      albumToUpdate.photo_ids = albumToUpdate.photo_ids.concat(
        Object.keys(newPhotos).map(v => +v)
      );

      return {
        ...state,
        albums: {
          ...state.albums,
          [albumToUpdate.id]: albumToUpdate
        },
        photos: {
          ...state.photos,
          ...newPhotos
        }
      };

    case types.ADD_ALBUM_REQUEST_SUCCESS:
      var albums = { ...state.albums };
      var newAlbum = action.payload.data;
      var parentAlbum =
        albums[action.meta.previousAction.payload.request.data.parent_id];

      albums[parentAlbum.id] = {
        ...parentAlbum,
        album_ids: parentAlbum.album_ids.concat(newAlbum.id)
      };
      albums[newAlbum.id] = newAlbum;
      return {
        ...state,
        albums
      };

    case types.DELETE_ALBUMS_REQUEST_SUCCESS:
      var albums = { ...state.albums };
      var deletedAlbumIds = action.meta.previousAction.payload.request.data
        .albumIds;

      for (var id of deletedAlbumIds) {
        delete albums[id];
      }

      return {
        ...state,
        albums
      };

    case types.CLEAR_SELECTION:{
      return {
        ...state,
        selectedAlbumIds:{},
        selectedPhotoIds:{},
      }
    }
    case types.TOGGLE_SELECTION: {

      var selectedAlbumIds = {...state.selectedAlbumIds}
      var selectedPhotoIds = {...state.selectedPhotoIds}

      for(var albumId of action.payload.albumIds){
        var isSelected = selectedAlbumIds[albumId] !== undefined
        if(isSelected){delete selectedAlbumIds[albumId]}
        else {
          selectedAlbumIds[albumId] = true;
        }
      }

      for(var photoId of action.payload.photoIds){
        var isSelected = selectedPhotoIds[photoId] !== undefined
        if(isSelected){delete selectedPhotoIds[photoId]}
        else {
          selectedPhotoIds[photoId] = true;
        }
      }

      return {
        ...state,
        selectedAlbumIds,
        selectedPhotoIds
      }

    }

    case types.MOVE_GALLERY_ELEMENTS_REQUEST_SUCCESS:

      var {albums, photos} = action.payload.data.updated

      return {
        ...state,
        albums:{
          ...state.albums,
          ...albums,
        },
        photos:{
          ...state.photos,
          ...photos,
        }
      }

      case types.DELETE_GALLERY_ELEMENTS_REQUEST_SUCCESS:
      var albums = {...state.albums}
      var photos = {...state.photos}
      var selectedAlbumIds = {...state.selectedAlbumIds}
      var selectedPhotoIds = {...state.selectedPhotoIds}

      var {deleted:{albumIds, photoIds}, updated:{albums:updatedAlbums}} = action.payload.data

      for(var albumId of albumIds){
        delete albums[albumIds]
        delete selectedAlbumIds[albumId]
      }

      for(var photoId of photoIds){

        delete photos[photoId]
        delete selectedPhotoIds[photoId]
        
      }

      return {
        ...state,
        albums:{
        ...albums,
        ...updatedAlbums,
        },
        photos,
        selectedAlbumIds,
        selectedPhotoIds
      }
  }

  return state;
}
