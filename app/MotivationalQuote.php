<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\MotivationalQuoteAuthor;

class MotivationalQuote extends Model
{
    protected $fillable = ['quote_of_the_day','author_id', 'text'];
    protected $appends = ['author'];
    protected $hidden = ['author'];
    public function author()
    {
        return $this->belongsTo(MotivationalQuoteAuthor::class);
    }

    public function getAuthorAttribute()
    {
        return $this->author()->first();
    }
}
