<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\ReduxService;
use App\Helpers\BrowserAnalyzer;

class HomeController extends Controller
{
    public function index(ReduxService $reduxService)
    {

        $preloadedState = $reduxService->getPreloadedState();

        $bundlePath = BrowserAnalyzer::supportGzipCompression()?asset('bundle.js.gz'):asset('bundle.js');

        return view('welcome')->with(compact('preloadedState','bundlePath'));
    }
}
