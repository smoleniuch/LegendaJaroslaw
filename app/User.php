<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;
use App\UserRole;

class User extends Authenticatable
{
    use Notifiable;

    protected $appends = array('roles','test');


    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    public function roles(){

      return $this->belongsToMany(UserRole::class);

    }

    public function hasRole($role){

      return $this->roles->get()->contains('name',$role);

    }

    public function getRolesAttribute(){

      return $this->roles()->get()->pluck('name');

    }

    public function getTestAttribute(){

      return 'testVal';

    }
}
