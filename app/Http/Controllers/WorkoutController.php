<?php

namespace App\Http\Controllers;

use App\Workout;
use Illuminate\Http\Request;
use App\Services\Workout\WorkoutEditorService;

class WorkoutController extends Controller
{

    public function __construct(){

      $this->workoutEditorService = new WorkoutEditorService();

    }
    public function cancel(Workout $workout, Request $request){
      return $this->workoutEditorService->cancelWorkout($workout, $request->all());
    }

    public function undoCancel(Workout $workout, Request $request){
      return $this->workoutEditorService->undoCancel($workout, $request->all());
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
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
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Workout  $workout
     * @return \Illuminate\Http\Response
     */
    public function show(Workout $workout)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Workout  $workout
     * @return \Illuminate\Http\Response
     */
    public function edit(Request $request, Workout $workout)
    {   
        $workoutData = $request->only(['canceled', 'start', 'end']);
        $workout = $this->workoutEditorService->edit($workout, $workoutData);

        return response()->json($workout);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Workout  $workout
     * @return \Illuminate\Http\Response
     */
    public function destroy(Workout $workout)
    {
        //
    }

}
