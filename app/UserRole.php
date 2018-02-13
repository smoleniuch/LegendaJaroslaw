<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\User;

class UserRole extends Model
{
    public $fillable = ['name'];
    
    public function users(){

      return $this->belongsToMany(User::class);

    }
}
