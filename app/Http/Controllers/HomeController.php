<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\ReduxService;

class HomeController extends Controller
{
    public function index(){

      $reduxService = new ReduxService();

      return view('welcome')->with('preloadedState',$reduxService->getPreloadedState());

    }
}
