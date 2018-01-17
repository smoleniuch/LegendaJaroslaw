<?php

namespace App\Services;

use App\Services\UserService;


class ReduxService {

  public function __construct(){

    $this->userService = new UserService();

  }

  public function getPreloadedState(){


    return json_encode([

      'user' => $this->userService->getCurrentUserData()

    ]);

  }

}
