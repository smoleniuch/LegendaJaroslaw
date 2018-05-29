<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;
use App\UserRole;
use App\UserProfile;
use App\ChatMessage;

class User extends Authenticatable
{
    use Notifiable;

    protected $appends = array('roles');


    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    public function roles()
    {
        return $this->belongsToMany(UserRole::class);
    }

    public function chatMessages()
    {
        return $this->hasMany(ChatMessage::class);
    }

    public function hasRole($role)
    {
        return $this->roles->get()->contains('name', $role);
    }

    public function profile()
    {
        return $this->hasOne(UserProfile::class);
    }

    public function getRolesAttribute()
    {
        return $this->roles()->get()->pluck('name');
    }
}
