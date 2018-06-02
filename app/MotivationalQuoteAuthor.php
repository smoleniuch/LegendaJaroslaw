<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\MotivationalQuote;

class MotivationalQuoteAuthor extends Model
{
    protected $fillable = ['name', 'avatar_path_url'];

    public function quotes()
    {
        return $this->hasMany(MotivationalQuote::class, 'author_id');
    }
}
