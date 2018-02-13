<?php
namespace App\Services;

class UserService {

  public function getCurrentUserData(){
    $status = auth()->check()?'zalogowany':'niezalogowany';

    $user = auth()->check() === true?auth()->user(): collect([]);

    $user = collect($user->only(['id','name','email','roles']));

    $user->put('isLoggedIn', auth()->check());

    return $user->toArray();

  }

}
