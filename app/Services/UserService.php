<?php
namespace App\Services;

class UserService {

  public function getCurrentUserData(){
    $status = auth()->check()?'zalogowany':'niezalogowany';
    // echo($status);
    $user = auth()->check() === true?auth()->user(): collect([]);

    $user = collect($user->only(['id','name','email']));

    $user->put('isLoggedIn', auth()->check());

    return $user->toArray();

  }

}
