<?php

namespace App;
use GrahamCampbell\Markdown\Facades\Markdown;

use Illuminate\Database\Eloquent\Model;
class Post extends Model
{
    protected $fillable = ['title','content'];


    public function getContentAttribute($val){

        // double quotes spoils json parsing in client side,
        // @todo how to escape it with markdown conversion??
        // $val = str_replace('"','\'', $val);
        
        $val = Markdown::convertToHtml($val);

        return $val;

    }
}
