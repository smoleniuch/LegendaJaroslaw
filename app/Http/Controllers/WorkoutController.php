<?php

namespace App\Http\Controllers;

use App\Workout;
use Illuminate\Http\Request;
use App\Services\Workout\WorkoutEditorService;
use App\Services\Workout\WorkoutGeneratorService;
use App\Http\Requests\AddWorkouts;

class WorkoutController extends Controller
{
    public function __construct()
    {
        $this->workoutEditorService = new WorkoutEditorService();
        $this->workoutGeneratorService = new WorkoutGeneratorService();
        $this->middleware('role:coach');
    }
    public function cancel(Workout $workout, Request $request)
    {
        return $this->workoutEditorService->cancelWorkout($workout, $request->all());
    }

    public function undoCancel(Workout $workout, Request $request)
    {
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
    public function store(AddWorkouts $request)
    {
        $workouts = $this->workoutGeneratorService->generateWorkouts($request->all());

        return response()->json($workouts);
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
    public function update(Request $request, Workout $workout)
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
        return response()->json($workout->delete());
    }

    public function delete(Request $request){

       return response()->json($this->workoutEditorService->delete($request->input('ids'))) ;

    }

    public function bulkEdit(Request $request){

        return response()->json($this->workoutEditorService->bulkEdit($request->all())) ;
 
     }
}
