<?php

namespace App\Http\Middleware;

use Closure;

class CheckRole
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next, ...$roles)
    {
        $passesTest = false;
        if (auth()->check()) {
            $currentUserRoles = collect(auth()->user()->roles);
            $passesTest = collect($roles)->contains(function ($role) use ($currentUserRoles) {
                return $currentUserRoles->contains($role);
            });
        }
        
        
        if ($passesTest) {
            return $next($request);
        }

        return response(null, 403);
    }
}
