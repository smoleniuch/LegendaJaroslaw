<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCyclicCalendarEventsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        // Schema::create('cyclic_calendar_events', function (Blueprint $table) {
        //
        //   $table->increments('id');
        //   $table->string('title')->nullable();
        //   $table->string('description')->nullable();
        //   $table->boolean('canceled')->default(false);
        //   $table->integer('delay_seconds')->default(0);
        //   $table->dateTime('start')->nullable();
        //   $table->dateTime('end')->nullable();
        //   $table->dateTime('is_valid_from')->nullable();
        //   $table->dateTime('is_valid_to')->nullable();
        //   $table->string('cycle')->nullable();
        //   $table->timestamps();
        //
        //
        //
        // });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('cyclic_calendar_events');
    }
}
