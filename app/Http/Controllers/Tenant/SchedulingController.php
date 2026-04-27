<?php

namespace App\Http\Controllers\Tenant;

use App\Http\Controllers\Controller;
use App\Models\Tenant\Scheduling;
use App\Services\Tenant\SchedulingService;
use Illuminate\Http\Request;

class SchedulingController extends Controller
{
    public function __construct(private SchedulingService $service) {}

    public function index()
    {
        $schedulings = $this->service->getAll();
        return view('tenant.scheduling.index', ['schedulings' => $schedulings]);
    }

    public function create()
    {
        return view('tenant.scheduling.create');
    }

    public function store(Request $request)
    {
        $this->service->create($request->validated());
        return redirect()->route('tenant-offerings')->with('success', 'Serviço cadastrado com sucesso!');
    }

    public function edit(Scheduling $scheduling)
    {
        return view('tenant.scheduling.edit', compact('scheduling'));
    }

    public function update(Request $request, Scheduling $scheduling)
    {
        $scheduling->update($request->all());
        return redirect()->route('tenant.scheduling.index');
    }

    public function destroy(Scheduling $scheduling)
    {
        $scheduling->delete();
        return redirect()->route('tenant.scheduling.index');
    }
}
