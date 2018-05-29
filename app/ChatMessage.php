<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\User;

class ChatMessage extends Model
{
    protected $fillable = ['user_id', 'content'];
    protected $appends = ['user_name', 'user_avatar_url'];
    protected $hidden = ['user'];

    public function user()
    {
        return $this->belongsTo('App\User')->withDefault(function ($user) {
            $user->name = 'Gość';
            $user->profile = [
                'avatar_url' => config('user.profile.default_avatar_url')
            ];
            return $user;
        });
    }

    public function getUserNameAttribute(){
        
        return $this->user->name;
    }

    public function getUserAvatarUrlAttribute(){
        
        return data_get($this->user->profile,'avatar_url');
    }

}
