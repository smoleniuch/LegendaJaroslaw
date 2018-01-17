<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\UserService;

class UserController extends Controller
{
  public function __construct(){

    $this->userService = new UserService();

  }
  public function getCurrentUserData(){

    return response()->json($this->userService->getCurrentUserData());

  }
}
