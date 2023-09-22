<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Todo;
use Illuminate\Support\Facades\Auth;

class TodoController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        // Retrieve all todos
        $todos = Todo::where('user_id', $user->id)->latest()->get();
        return response()->json($todos);
    }

    public function store(Request $request)
    {
        $user = Auth::user();
        // Create a new todo
        $todo = new Todo();
        $todo->title = $request->input('title');
        $todo->user_id = $user->id;
        $todo->description = $request->input('description');
        $todo->save();

        $data['status'] = 'success';
        $data['messsage'] = 'Todo added successfully';
        $data['todo'] = $todo;

        return response()->json($data, 201); // 201 Created
    }

    public function show($id)
    {
        $user = Auth::user();
        // Get a specific todo
        $todo = Todo::findOrFail($id);
        return response()->json($todo);
    }

    public function update(Request $request, $id)
    {
        $user = Auth::user();
        $todo = Todo::findOrFail($id);
        $todo->title = $request->input('title');
        $todo->description = $request->input('description');

        if($request->input('completed')){
            $todo->completed = $request->completed;
        }

        $todo->save();

        $data['status'] = 'success';
        $data['message'] = 'Todo edited successfully';
        $data['todo'] = $todo;

        return response()->json($data);
    }

    public function destroy($id)
    {
        $user = Auth::user();
        // Delete a specific todo
        $todo = Todo::findOrFail($id);
        $todo->delete();

        return response()->json(['message' => 'Todo deleted']);
    }
}
