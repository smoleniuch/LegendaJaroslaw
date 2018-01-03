<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\CyclicCalendarEvent;
use App\Observers\CyclicCalendarEventObserver;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {

      CyclicCalendarEvent::observe(CyclicCalendarEventObserver::class);

    }

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
    }
}
