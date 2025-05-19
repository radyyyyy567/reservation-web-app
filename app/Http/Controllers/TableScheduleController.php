<?php

namespace App\Http\Controllers;

use App\Models\TableSchedule;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Http\Resources\TableScheduleResource;

class TableScheduleController extends Controller
{
    public function index()
    {
        return TableScheduleResource::collection(TableSchedule::latest()->get());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'no_table'      => 'required|string|max:255',
            'slot_08_10'    => 'required|boolean',
            'slot_10_12'    => 'required|boolean',
            'slot_12_14'    => 'required|boolean',
            'slot_14_16'    => 'required|boolean',
            'slot_16_18'    => 'required|boolean',
        ]);

        $schedule = TableSchedule::create($validated);

        return new TableScheduleResource($schedule);
    }

    public function show(TableSchedule $tableSchedule)
    {
        return new TableScheduleResource($tableSchedule);
    }

    public function update(Request $request, TableSchedule $tableSchedule)
    {
        $validated = $request->validate([
            'no_table'      => 'required|string|max:255',
            'slot_08_10'    => 'required|boolean',
            'slot_10_12'    => 'required|boolean',
            'slot_12_14'    => 'required|boolean',
            'slot_14_16'    => 'required|boolean',
            'slot_16_18'    => 'required|boolean',
        ]);

        $tableSchedule->update($validated);

        return new TableScheduleResource($tableSchedule);
    }

    public function destroy(TableSchedule $tableSchedule)
    {
        $tableSchedule->delete();

        return response()->json(['message' => 'Schedule deleted successfully.']);
    }
}
