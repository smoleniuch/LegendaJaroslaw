<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class CyclicCalendarEvent extends Model
{
    protected $hidden = ['calendarEvents'];

    protected $fillable = ['title', 'description', 'start', 'end', 'is_valid_from', 'is_valid_to', 'cycle'];

    public function calendarEvents(){

      return $this->hasMany('App/CalendarEvent');

    }
}
