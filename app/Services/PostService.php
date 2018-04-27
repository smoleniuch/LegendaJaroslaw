<?php
namespace App\Services;

use App\Post;

class PostService {

  public function getAllPosts(){

    return Post::all()->sortByDesc('created_at')->keyBy('id');

  }

  public function add($data){

    $post = new Post($data);
    $post->save();

    return $post;

  }

}
