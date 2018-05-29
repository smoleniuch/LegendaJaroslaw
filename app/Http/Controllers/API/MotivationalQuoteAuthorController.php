<?php

namespace App\Http\Controllers\API;

use App\MotivationalQuoteAuthor;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class MotivationalQuoteAuthorController extends Controller
{
    public function __construct()
    {
        $this->middleware('role:coach')->only([
            'store',
            'update',
            'destroy',
        ]);
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return MotivationalQuoteAuthor::all()->keyBy('id');
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $author = MotivationalQuoteAuthor::create($request->only(['name']));
        
        return response()->json($author);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\MotivationalQuoteAuthor  $motivationalQuoteAuthor
     * @return \Illuminate\Http\Response
     */
    public function show(MotivationalQuoteAuthor $motivationalQuoteAuthor)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\MotivationalQuoteAuthor  $motivationalQuoteAuthor
     * @return \Illuminate\Http\Response
     */
    public function edit(MotivationalQuoteAuthor $motivationalQuoteAuthor)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\MotivationalQuoteAuthor  $motivationalQuoteAuthor
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, MotivationalQuoteAuthor $motivationalQuoteAuthor)
    {
        $motivationalQuoteAuthor->update($request->only(['name']));
        return response()->json($motivationalQuoteAuthor);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\MotivationalQuoteAuthor  $motivationalQuoteAuthor
     * @return \Illuminate\Http\Response
     */
    public function destroy(MotivationalQuoteAuthor $motivationalQuoteAuthor)
    {
        $motivationalQuoteAuthor->delete();

        return response(204);
    }
}
