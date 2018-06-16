<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\ReduxService;
use App\Helpers\BrowserAnalyzer;

class HomeController extends Controller
{
    public function index()
    {
        $reduxService = new ReduxService();
        $preloadedState = $reduxService->getPreloadedState();

        $bundlePath = BrowserAnalyzer::supportGzipCompression()?'bundle.js.gz':'bundle.js';

        return view('welcome')->with(compact('preloadedState','bundlePath'));
    }
}
