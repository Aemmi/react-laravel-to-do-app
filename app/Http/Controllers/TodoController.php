<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Todo;

class TodoController extends Controller
{
    public function index()
    {
        // Retrieve all todos
        $todos = Todo::all();
        return response()->json($todos);
    }

    public function store(Request $request)
    {
        // Create a new todo
        $todo = new Todo();
        $todo->title = $request->input('title');
        $todo->description = $request->input('description');
        $todo->save();

        return response()->json($todo, 201); // 201 Created
    }

    public function show($id)
    {
        // Get a specific todo
        $todo = Todo::findOrFail($id);
        return response()->json($todo);
    }

    public function update(Request $request, $id)
    {
        // Update a specific todo
        $todo = Todo::findOrFail($id);
        $todo->title = $request->input('title');
        $todo->description = $request->input('description');
        $todo->save();

        return response()->json($todo);
    }

    public function destroy($id)
    {
        // Delete a specific todo
        $todo = Todo::findOrFail($id);
        $todo->delete();

        return response()->json(['message' => 'Todo deleted']);
    }
}
