import * as types from "./types";

export function toggleGallerySelection({ albumIds = [], photoIds = [] }) {
  return {
    type: types.TOGGLE_SELECTION,
    payload: {
      albumIds: [].concat(albumIds),
      photoIds: [].concat(photoIds)
    }
  };
}

export function clearGallerySelection() {
  return {
    type: types.CLEAR_SELECTION
  };
}

export function addAlbum(data) {
  return {
    type: types.ADD_ALBUM_REQUEST,
    payload: {
      request: {
        method: "post",
        url: "/gallery/albums",
        data
      },
      notify: {
        success: {
          message: "Album został dodany."
        },
        error: {
          message: "Wystąpił błąd podczas dodawania albumu."
        }
      }
    }
  };
}

export function deleteAlbums(albumIds = []) {
  return {
    type: types.DELETE_ALBUMS_REQUEST,
    payload: {
      request: {
        method: "delete",
        url: `/gallery/albums`,
        data: {
          albumIds
        }
      },
      notify: {
        success: {
          message: "Albumy zostały usunięte"
        },
        error: {
          message: "Wystąpił błąd podczas usuwania albumów"
        }
      }
    }
  };
}

export function uploadPhotos(photos, photoFiles, albumId) {
  var data = new FormData();
  data.append("photos", JSON.stringify(photos));
  data.append("albumId", albumId);

  for (var photoId in photoFiles) {
    data.append(`${photoId}`, photoFiles[photoId]);
  }
  return {
    type: types.UPLOAD_PHOTOS_REQUEST,
    payload: {
      request: {
        method: "post",
        url: `/gallery/photos/`,
        data
      },
      notify: {
        success: {
          message: "Zdjęcia zostały dodane."
        },
        error: {
          message: "Wystąpił błąd podczas dodawania zdjęć."
        }
      }
    }
  };
}

export function deletePhotos(photoIds = []) {
  return {
    type: types.DELETE_PHOTOS_REQUEST,
    payload: {
      request: {
        method: "delete",
        url: `/gallery/photos`,
        data: {
          photoIds
        }
      },
      notify: {
        success: {
          message: "Zdjęcia zostały usunięte."
        },
        error: {
          message: "Wystąpił błąd podczas usuwania zdjęć."
        }
      }
    }
  };
}

/**
 *
 * @param {object} data
 */
export function moveGalleryElements(data) {
  return {
    type: types.MOVE_GALLERY_ELEMENTS_REQUEST,
    payload: {
      request: {
        method: "post",
        url: "/gallery/move",
        data
      },
      notify: {
        success: {
          message: "Elementy zostały przeniesione"
        },
        error: {
          message: "Wystąpił błąd podczas przenoszenia elementów"
        }
      }
    }
  };
}

export function deleteGalleryElements(data) {
  return {
    type: types.DELETE_GALLERY_ELEMENTS_REQUEST,
    payload: {
      request: {
        method: "delete",
        url: `/gallery`,
        data
      },
      notify: {
        success: {
          message: "Elementy zostały usunięte."
        },
        error: {
          message: "Wystąpił błąd podczas usuwania elementów."
        }
      }
    }
  };
}
