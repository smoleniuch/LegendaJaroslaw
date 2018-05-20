<?php

namespace App;
use GrahamCampbell\Markdown\Facades\Markdown;

use Illuminate\Database\Eloquent\Model;
class Post extends Model
{
    protected $fillable = ['title','content'];


    public function getContentAttribute($val){

        return $val === null?'':$val;

    }

    public function getTitleAttribute($val){

        return $val === null?'':$val;

    }
}
