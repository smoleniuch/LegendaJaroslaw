<?php
namespace App\Services;

use App\Post;

class PostService
{
    public function getAllPosts()
    {
        return Post::all()->sortByDesc('created_at')->keyBy('id');
    }

    public function getPostsByChunk($chunk = 1)
    {
        $posts = Post::all()->sortByDesc('created_at')->chunk(10)->get($chunk);
      
        return $posts?$posts:new \stdClass();
    }

    public function add($data)
    {
        $post = new Post($data);
        $post->save();

        return $post;
    }
}
