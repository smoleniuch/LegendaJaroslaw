<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class CalendarEvent extends Model
{
    protected $hidden = ['cyclicCalendarEvent'];

    protected $fillable = ['start','title','description','end'];

    public function cyclicCalendarEvent(){

      return $this->belongsTo('App/CyclicCalendarEvent');

    }
}
