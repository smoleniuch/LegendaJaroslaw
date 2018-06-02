<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\MotivationalQuote;
use App\Services\MotivationalQuoteService;

class MotivationalQuotesController extends Controller
{
    public function __construct(MotivationalQuoteService $motivationalQuoteService)
    {
        $this->motivationalQuoteService = $motivationalQuoteService;
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
        return MotivationalQuote::all()->keyBy('id');
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
        $avatarFile = $request->file('avatarFile');
        $serviceData = collect($request->only(['name', 'text']));
        $authorData = collect(json_decode($request->author));
        
        if ($authorData->isNotEmpty()) {
            $authorData = $authorData->merge(['avatarFile' => $avatarFile]);
            $serviceData = $serviceData->merge(['author' => $authorData]);
        }

        $responseData = $this->motivationalQuoteService->saveQuote($serviceData->all());

        return response()->json($responseData);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $quote = $this->motivationalQuoteService->saveQuote($request->all(), $id);
        
        return response()->json($quote);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $quote = MotivationalQuote::findOrFail($id);

        $quote->delete();

        return response(204);
    }
}
