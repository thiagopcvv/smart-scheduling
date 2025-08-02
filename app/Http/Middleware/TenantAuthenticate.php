<?php
// app/Http/Middleware/TenantAuthenticate.php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Auth\Middleware\Authenticate as Middleware;
use Illuminate\Http\Request;

class TenantAuthenticate extends Middleware
{
    protected function authenticate($request, array $guards)
    {
        if (empty($guards)) {
            $guards = ['tenant'];
        }

        foreach ($guards as $guard) {
            if ($this->auth->guard($guard)->check()) {
                return $this->auth->shouldUse($guard);
            }
        }

        $this->unauthenticated($request, $guards);
    }

    protected function redirectTo(Request $request)
    {
        if (!$request->expectsJson()) {
            return route('tenant-login'); // ou a rota de login do tenant
        }
    }
}
