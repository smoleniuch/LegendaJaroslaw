<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\MotivationalQuote;

class MotivationalQuoteAuthor extends Model
{
    protected $fillable = ['name'];

    public function quotes()
    {
        return $this->hasMany(MotivationalQuote::class, 'author_id');
    }
}
