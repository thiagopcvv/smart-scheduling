<?php

namespace App\Exceptions;

use Illuminate\Database\QueryException;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Throwable;

class Handler extends ExceptionHandler
{
    /**
     * A list of the exception types that are not reported.
     *
     * @var string[]
     */
    protected $dontReport = [
        //
    ];

    /**
     * A list of the inputs that are never flashed for validation exceptions.
     *
     * @var string[]
     */
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    /**
     * Register the exception handling callbacks for the application.
     *
     * @return void
     */
    public function register()
    {
        $this->reportable(function (Throwable $e) {

        });
    }

    public function render($request, Throwable $e)
    {
        if ($request->header('X-Inertia')) {

            if ($e instanceof QueryException) {
                return redirect()->back()->with([
                    'error' => 'Erro interno do sistema.'
                ]);
            }

            return redirect()->back()->with([
                'error' => 'Erro inesperado.'
            ]);
        }

        return back()->with('error', 'Erro inesperado. Tente novamente.');
    }
}
