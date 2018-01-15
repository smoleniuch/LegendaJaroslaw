<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Validator;
class ValidatorController extends Controller
{
    public function validateRegisterCredentials(Request $request){

      $request->validate([

        'email' => 'unique:users',
        'name' => 'unique:users'

      ]);

      return response('ok');

    }
}
